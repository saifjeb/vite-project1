import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const[products, setProducts] = useState([
        { id: 1, code: "P001", name: "Product A", price: 100 },
        { id: 2, code: "P002", name: "Product B", price: 150 },
        { id: 3, code: "P003", name: "Product C", price: 200 },
        { id: 4, code: "P004", name: "Product D", price: 250 },
    ]);
    const[showForm, setShowForm] = useState(false);
    const navigate= useNavigate();

    const [newProduct, setNewProduct] = useState({
        id: products.length + 1,
        code: "",
        name: "",
        price: "",
    });

    const[deleteProductId, setDeleteProductId] = useState({
        id: ""
    });
    const[editedProduct, setEditedProduct] = useState({
        //to store details of product being edited
        id: 0,
        code: "",
        name: "",
        price: "",
    });

    const[editedProductId, setEditedProductId] = useState(null);//to store id of product being edited

    

    //new = {...newProduct} //shadow copy
    //to get value from input: e.target.value


     const handleAddProduct = (e) => {
        e.preventDefault();
        try {
            if ( !newProduct.code || !newProduct.name || !newProduct.price) {
                toast.error("All fields are required");
                return;
            }
            setProducts([...products,newProduct]);
            toast.success("Product added successfully");
        } catch (err) {
            console.log(err);
        }
    };
    const handleDelete = (productId) => {
        const filteredProducts = products.filter(
            (product) => product.id !== productId
        );
        setProducts(()=>filteredProducts);
        toast.success("Product deleted successfully");
    };
    const handleEdit = (product) => {
        try {
            setEditedProductId(product.id);
            setEditedProduct({

                code: product.code,
                name: product.name,
                price: product.price,
            });
        } catch (err) {
            console.log(err);
        }
    };
        const handleCancel = () => {
        setEditedProductId(null);
        setEditedProduct({
            id: 0,
            code: "",
            name: "",
            price: "",
        });
    };

    const handleSave = (productId) => {
        if (!editedProduct.code || !editedProduct.name || !editedProduct.price) {
            toast.error("All fields are required");
            return;
        }
        setProducts((prev) => prev.map((product) => 
            product.id === productId ? { ...product, ...editedProduct } : product
        )
    );
    toast.success("Product updated successfully");
    setEditedProductId(null);
    };
            
return (
    <>
      <h1>Product Dashboard</h1>
      <button onClick={(prev)=> setShowForm(!showForm)}>

        {showForm ? "Cancel" : "Add New Product"}

      </button>

      <br/>
      <br/>
      <br/>
      <button onClick={()=> navigate("/form")}>go to form</button>
      <br/>

      {showForm &&(

        <form onSubmit={handleAddProduct}>
        <input 
        type="text" 
        placeholder="Product Code"
        onChange={(e)=> setNewProduct({ ...newProduct,code: e.target.value})}
        />

        <input 
        type="text" 
        placeholder="Product Name"
        onChange={(e)=> setNewProduct({ ...newProduct,name: e.target.value})}
        />

        <input 
        type="number" 
        placeholder="Product Price"
        onChange={(e)=> setNewProduct({ ...newProduct,price: e.target.value})}
        />
        <button type="submit">Add Product</button>
      </form>
      )}
      <br/>
      <br/>
      <br/>
      <br/>

      <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Code</th>
                <th>Name</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
            {products.map((product, index) => {
                const isEdited = editedProductId === product.id;
                return (
                    <tr key={product.id}>
                        <td>{index+ 1}</td>
                        <td>
                        {isEdited ? (
                            <input
                             type="text"
                             value={editedProduct.code}
                             onChange={(e) =>
                                 setEditedProduct({...editedProduct, code: e.target.value})
                                } 
                                /> 
                            ):(
                                product.code
                            )}
                            </td> 
                        
                         <td>
                        {isEdited ? (
                            <input
                             type="text"
                             value={editedProduct.name}
                             onChange={(e) =>
                                 setEditedProduct({...editedProduct, name: e.target.value})
                                } 
                                /> 
                            ):(
                                product.name
                            )}
                            </td> 

                         <td>
                        {isEdited ? (
                            <input
                             type="number"
                             value={editedProduct.price}
                             onChange={(e) =>
                                 setEditedProduct({...editedProduct, price: e.target.value})
                                } 
                                /> 
                            ):(
                                product.price
                            )}
                            </td> 
                        <td>
                            {isEdited ? (
                                <>
                                <button onClick={() => handleSave(product.id)}>Save</button>
                                <button onClick={() => handleCancel}>Cancel</button>
                                </>
                            ):(
                                <>  
                                 <button onClick={() => handleDelete(product.id)}>
                                    Delete
                                    </button>
                                 <button onClick={() => handleEdit(product)}>
                                    Update
                                    </button>
                                </>
                            )}
                        </td>
                    </tr>
                );
            })}     
            </tbody>
      </table>
    </>
  );
}
export default Dashboard;



