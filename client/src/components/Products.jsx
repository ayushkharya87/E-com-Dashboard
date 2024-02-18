import React, { useEffect, useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { Link } from 'react-router-dom';

const Products = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch("http://localhost:8080/products", {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        result = await result.json();
        setProducts(result);
    };

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:8080/product/${id}`, {
            method: "Delete",
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        result = await result.json();
        if(result) {
            getProducts() ;
        }
    };

    const searchHandle = async (e) => {
        let key = e.target.value;
        if(key) {
             let result = await fetch(`http://localhost:8080/search/${key}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
             });
         result = await result.json();
         if(result){
            setProducts(result);
         }
        } else {
            getProducts();
        }   
    };


  return (
    <div>
        <h1>Products List</h1>
        <input type="text" placeholder='Search Product...' onChange={searchHandle} />

        <div>
            <h3>S.No.</h3>
            <h3>Company</h3>
            <h3>Name</h3>
            <h3>Price</h3>
            <h3>Category</h3>
            <h3>Operations</h3>
        </div>

        {
            products.length > 0 ? products.map((item, index) => (
                <div key={item._id}> 

                 <h4>{index + 1}</h4>
                 <h4>{item.company}</h4>
                 <h4>{item.name}</h4>
                 <h4>{item.price}</h4>
                 <h4>{item.category}</h4>
                 <h4>
                    <p onClick={() => deleteProduct(item._id)}><MdDeleteForever  /></p>
                    <Link to={"/update/"+item._id}><GrUpdate /></Link>
                </h4>
                 
                </div>
            )) : <h2>No Result Found</h2>
        }
    </div>
  )
}

export default Products