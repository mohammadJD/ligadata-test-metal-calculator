import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {config} from "../_helpers";
import {currencyActions} from "../_actions";

function Header() {
    const currency = useSelector(state => state.currency.currency);
    const currencies = config.currencies;
    const dispatch = useDispatch();
    let [currentDate,setCurrentDate] = useState(getFullDate(new Date()));

    useEffect(() => {
        dispatch(currencyActions.getCurrency());

    }, []);

    function getFullDate(date){
        let newDate = new Date(date);
        let day = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let separator = '-';

        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${day}`;
    }

    function changeCurr(event) {
        dispatch(currencyActions.setCurrency(event.target.value));
    }

    return(
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark">

                <a className="navbar-brand" href="#">
                    Metals Calculator
                </a>


                <ul className="navbar-nav">
                    <li className="nav-item">
                        <span className="nav-link"><Link to="/">Prices</Link></span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link"><Link id="go-historical" to="/historical">Historical</Link></span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link"><Link id="go-calculator" to="/calculator">Calculator</Link></span>
                    </li>
                    <li className="nav-item date-nav-item">
                        <span className="nav-link"><a>{currentDate}</a></span>
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
