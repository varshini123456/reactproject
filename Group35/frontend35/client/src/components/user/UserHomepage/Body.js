import React from 'react'
import {NavLink} from 'react-router-dom'
import Mobile from "./Images/mobile.jpg"
import Laptop from "./Images/laptop.jpg"
import Headphones from "./Images/headphones.jpg"
import "./CSS/Body.css"
import Slider from './Slider'
import axios from "axios";
import {useState, useEffect} from 'react'


function Body(){
    const [categoryinfo,setCategoryinfo] = useState({
        categories: []
    })

// fetching categories 
    const fetchdata = ()=>{
        return fetch("http://localhost:5000/categories").then((response)=>
         response.json()).then((data)=>{
             console.log(data)
             setCategoryinfo({
             categories: data
         })
        
         
     })
     }


    useEffect(() => {
        fetchdata()
        
    },[])
    const {categories} = categoryinfo

    return (
        <>

        {/* displaying categories with some design included */}
            <div className="slide">
                <Slider />
            </div>
            <div className="my-5">
                <br></br>
                <h1 className="text-center">Categories</h1>
            <div/>
            <div className="container-fluid mb-5">
                <div className="row">
                    <div className="col-10 mx-auto">
                        <div className="row gy-4">

                            {categories.map((c) =>{
                                return (
                                    <div className="col-md-4 col-10 mx-auto">
                                        <NavLink to={`/user/products/${ c.id }`} className="link-cards">
                                            <div className="card link-card" >
                                                <img src="https://tse3.mm.bing.net/th?id=OIP._0Cu63U3TlJCoJ3kZcgNoAHaEz&pid=Api&P=0&w=259&h=168" className="card-img-top images" alt="headphones" style={{width: "305.587px !important"}} />
                                                    <div className="card-body">
                                                        <h5 className="card-title category">{c.Name}</h5>
                                                        <p className="card-text">{c.desc}</p>
                                                    </div>
                                            </div>
                                        </NavLink>


                                    </div> 
                                )
                            })}
            

                        </div>

                    </div>

                </div>

            </div>

        </div>
        </>
    );
}

export default Body;