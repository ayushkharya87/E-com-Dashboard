import React, { useState } from 'react'

const AddProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);


    const addProduct = async () => {

      if(!name || !price || !category || !company) {
        setError(true);
        return false;
      };

        const userId = JSON.parse(localStorage.getItem("user"))._id;
        let result = await fetch("http://localhost:8080/add-product", {
            method: "post",
            body: JSON.stringify({name, price, category, company, userId}),
            headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
          }
        });
         result = await result.json();
    };

  return (
    <div>
        <h1>Add New Product</h1>

        <div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Product Name' />
            { error && !name && <span>Enter valid name</span>}

            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Enter Product Price' />
            { error && !price && <span>Enter valid price</span>}

            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Enter Product Category' />
            { error && !category && <span>Enter valid category</span>}

            <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder='Enter Product Company' />
            { error && !company && <span>Enter valid company</span>}

            <button onClick={addProduct}>Add Product</button>
        </div>
    </div>
  )
}

export default AddProduct;