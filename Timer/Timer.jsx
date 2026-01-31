import { useEffect} from "react";
import { useState} from "react";

function Timer(){
    const [seconds, setSeconds] = useState(0);
    const [running, setRunning] = useState(false);
    
  useEffect(() => {
    let id;
    function tick(){
        setSeconds((s) => s + 1);
        id = setTimeout(tick, 1000);
        }

    if (running)id = setTimeout(tick, 1000);
    return () => clearTimeout(id);
    }, [running]);

  return (
    <>
      <p>Timer: {seconds}</p>
      <button onClick={() => setRunning(true)} disabled={running}>Start</button>
      <button onClick={() => {setRunning(false); setSeconds(0); }}>Reset</button>
      <button onClick={() => setRunning(false)} disabled={!running}>Stop</button>
    </>
  );
}
export default Timer;