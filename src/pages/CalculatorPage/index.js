import React, {useEffect, useState} from 'react';
import {config} from "../../_helpers";
import {alertActions, converterActions} from '../../_actions';
import {metalService} from '../../_services/index';
import {useDispatch, useSelector} from "react-redux";
import "./calculator.css";

function CalculatorPage() {

    const [submitted, setSubmitted] = useState(false);
    const currency = useSelector(state => state.currency.currency);
    const dispatch = useDispatch();
    const currencies = config.currencies;
    const loading = useSelector(state => state.converter.loading);
    let [amount,setAmount] = useState('');
    let [toCurrency,setToCurrency] = useState('USD');
    let [result,setResult] = useState('');

    useEffect(() => {
        dispatch(alertActions.clear());
    }, []);

    function handleToCurrencyChange (e) {
        let value = Array.from(e.target.selectedOptions, option => option.value);
        let text = Array.from(e.target.selectedOptions, option => option.text);
        setToCurrency(value);

    }

    function handleChangeAmount(e) {
        const { name, value } = e.target;
        setAmount(value);
    }

    function handleSubmit() {

        setSubmitted(true);

        if (toCurrency && amount) {

            dispatch(converterActions.getConverterRequest());

            metalService.convert(currency,toCurrency,amount)
                .then(
                    items => {
                        if(!items.success){
                            dispatch(converterActions.getConverterFailure(items.error.info.toString()));
                            dispatch(alertActions.error(items.error.info.toString()));
                            return;
                        }
                        dispatch(converterActions.getConverterSuccess(items));
                        dispatch(alertActions.success('Currency Converted successfully'));

                        setResult(items.result);

                    },
                    error => {
                        dispatch(converterActions.getConverterFailure(error.toString()));
                        dispatch(alertActions.error(error.toString()));
                    }
                );
        }
    }

    return (
        <div className="calculator-page">
            <h1 className="page-title">Calculator Page</h1>
            <div className="card">
                <div className="row">
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect2">Convert to</label>
                        <select id="exampleFormControlSelect2" name="currencies"
                                className={'form-control' + (submitted && toCurrency.length===0 ? ' is-invalid' : '')}
                                onChange={handleToCurrencyChange}>
                            {
                                currencies.map((item,index)=>
                                    <option key={index} value={item}>{item}</option>
                                )
                            }

                        </select>
                        {submitted && toCurrency.length===0 &&
                        <div className="invalid-feedback">This field is required</div>
                        }
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">Amount</label>
                        <input type="number" name="amount" value={amount} onChange={handleChangeAmount}
                               className={'form-control' + ((submitted && !amount) ? ' is-invalid' : '')}/>
                        {submitted && !amount &&
                        <div className="invalid-feedback">This field is required</div>
                        }
                    </div>
                </div>

                <div className="col-4">
                    <div className="form-group">
                        <button id="submit-btn" className="submit-btn btn btn-primary" onClick={handleSubmit}>
                            {loading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Submit</button>
                    </div>
                </div>
            </div>
                {
                    result&&
                    <div className="result-sec">
                        <div className="row">
                            <div className="col-12">
                                <p className="result">{result} 12 {toCurrency}</p>
                            </div>
                        </div>
                    </div>
                }


            </div>
        </div>
    );
}

export { CalculatorPage };
