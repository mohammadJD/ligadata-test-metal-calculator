import React from 'react';
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux";

function Header() {
    // const user = useSelector(state => state.authentication.user);
    return(
        <div>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">

                <a className="navbar-brand" href="#">
                    Metals Calculator
                </a>


                <ul className="navbar-nav">
                    <li className="nav-item">
                        <span className="nav-link"><Link to="/">Prices</Link></span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link"><Link to="/articles">Articles</Link></span>
                    </li>

                    <li className="nav-item">
                        <span className="nav-link"><Link to="/login">Logout</Link></span>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export { Header }
