import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {config} from "../_helpers";
import {currencyActions} from "../_actions";

function Header() {
    const currency = useSelector(state => state.currency.currency);
    const currencies = config.currencies;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(currencyActions.getCurrency());

    }, []);

    function changeCurr(event) {
        dispatch(currencyActions.setCurrency(event.target.value));
    }

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
                        <span className="nav-link"><Link to="/historical">Historical</Link></span>
                    </li>

                    <li className="nav-item currency-nav-item">
                        <select className="form-control" id="exampleFormControlSelect1" onChange={changeCurr}
                                value={currency}>
                            {
                                currencies.map((item, index) =>
                                    <option value={item} key={index}>{item}</option>
                                )
                            }
                        </select>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export { Header }
