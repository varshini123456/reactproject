import React from 'react'
import { NavLink } from 'react-router-dom';
import "./CSS/Navbar.css"

function Navbar(){
    return (
        <>

            {/* Navigation bar for home page for both users and sellers */}

            <div className="container-fluid nav_bg">
                <div className="row">
                    <div className="col-10 mx-auto">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <NavLink className="navbar-brand mt-3" exact to="/">Dream Basket</NavLink>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                                <li className="nav-item ">
                                    <NavLink exact className="nav-link mt-3" to="/">Home </NavLink>
                                </li>
                                
                                </ul>
                                
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;