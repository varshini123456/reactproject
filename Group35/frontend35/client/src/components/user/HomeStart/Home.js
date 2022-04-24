import React from 'react'
import Navbar from './Navbar';
import "./CSS/Home.css"
import ShoppingSVG from './Images/OnlineShopping.jpg'
import { NavLink } from 'react-router-dom';

function Home(){
    return (
        <div>
            {/* importing navbar from Navbar.js */}
            <Navbar /> 
            {/* home page  */}
            <section id="header" className="">
                <div className="container-fluid nav_bg">
                    <div className="row">
                        <div className="col-10 mx-auto">
                            <div className="row">
                            <div className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1">
                                <h2 className='heading'> Grow your business and <br />buy products with <br /><strong className='brand-name'>Dream Basket</strong></h2>
                                <h6 className='my-3 text-muted sub-heading'>
                                    We are a team of talented developers making websites
                                </h6>
                                <div className="row">
                                    <div className="col-8 col-sm-6">
                                       <div className="type-header">
                                            <h3 className="type">For Sellers</h3>
                                       </div>
                                       <h6 className='my-3 text'>
                                            We are the market-leading e-commerce platform and market people will get more profit 
                                        </h6>
                                        {/* opens sellers sign up page */}
                                        <div className='mt-3'>
                                            <NavLink to="/seller/login" className='btn btn-outline-primary'>Start Selling</NavLink>
                                        </div>
                                    </div>
                                    <div className="col-4 col-sm-6">
                                        <div className="type-header">
                                            <h3 className="type">For Buyers</h3>
                                        </div>

                                        <div>
                                            <h6 className='my-3 text'>You will get expected quality products and you can choose the products with low price</h6>
                                        </div>
                                        {/* opens buyers signup page */}
                                        <div className='mt-3'>
                                            <NavLink to="/user/signin" className='btn btn-outline-primary'>Start Buying</NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='col-lg-6 order-1 order-lg-2 header-img'>
                                <img src={ShoppingSVG} className="img-fluid animated" alt="home img"></img>
                            </div>

                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;