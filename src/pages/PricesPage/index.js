import React, {useEffect, useState} from 'react';
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
import {config} from "../../_helpers";
import {alertActions, historicalActions, timeSeriesActions} from '../../_actions';
import {metalService} from '../../_services/index';
import {useDispatch, useSelector} from "react-redux";
import {ResponsiveBar} from "@nivo/bar";
import "./prices.css";

function PricesPage() {
    // const users = useSelector(state => state.users);
    // const user = useSelector(state => state.authentication.user);
    const [date,setDate] = useState('');
    const [dateValid,setDateValid] = useState(true);
    const [symbols,setSymbols] = useState([]);
    // let symbols = [];
    const [submitted, setSubmitted] = useState(false);
    const currency = useSelector(state => state.currency.currency);
    const dispatch = useDispatch();
    const metals = config.metals;
    const items = useSelector(state => state.historical);
    const loading = useSelector(state => state.historical.loading);
    let [rates,setRates] = useState([]);

    let [data,setData] = useState([]);

    let [keys,setKeys] = useState([]);
    useEffect(() => {
        dispatch(alertActions.clear());
    }, []);

    function handleSymbolsChange (e) {
        let value = Array.from(e.target.selectedOptions, option => option.value);
        let text = Array.from(e.target.selectedOptions, option => option.text);
        setSymbols(value);

    }
    function handleDateChange(e) {
        const { name, value } = e.target;
        setDate(value);
        setDateValid((new Date(value) >= new Date('01-01-2010'))&&(new Date(value)<=new Date()));
    }

    function getCurrentDate(){
        let newDate = new Date();
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let separator = '-';

        let fullDate = `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`;
        setDateValid(new Date(fullDate) >= new Date('01-01-2010'));
        setDate(fullDate);
    }

    function handleSubmit() {

        setSubmitted(true);

        if (date && symbols.length>0&&dateValid) {

            dispatch(historicalActions.getHistoricalRequest());

            metalService.getHistorical(currency,date,symbols)
                .then(
                    items => {
                        if(!items.success){
                            dispatch(timeSeriesActions.getTimeSeriesFailure(items.error.info.toString()));
                            dispatch(alertActions.error(items.error.info.toString()));
                            return;
                        }
                        dispatch(historicalActions.getHistoricalSuccess(items));
                        dispatch(alertActions.success('Data fetched successfully'));
                        // setKeys([]);
                        let tmpKeysArr = [];


                        let tmpData = [{
                            "date":date,
                        }];

                        let rates = items.rates;
                        if(rates!==undefined && rates !== null){
                            for (const [key, value] of Object.entries(rates)) {
                                let item = metals.find((item => item.value === key));
                                tmpData[0][item.name + ' ' + item.value] = value;
                                tmpKeysArr.push(item.name + ' ' + item.value);
                                setRates([key]);
                            }

                            setKeys(tmpKeysArr);
                            setData(tmpData);
                        }

                    },
                    error => {
                        dispatch(historicalActions.getHistoricalFailure(error.toString()));
                        dispatch(alertActions.error(error.toString()));
                    }
                );
        }
    }

    return (
        <div className="prices-page">
            <h1 className="page-title">Prices Page</h1>
            <div className="card">
                <div className="row">
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect2">Select at least one Metal</label>
                        <select id="exampleFormControlSelect2" multiple
                                className={'form-control' + (submitted && symbols.length===0 ? ' is-invalid' : '')}
                                onChange={handleSymbolsChange}>
                            {
                                metals.map((item,index)=>
                                    <option key={index} value={item.value}>{item.name}</option>
                                )
                            }

                        </select>
                        {submitted && symbols.length===0 &&
                        <div className="invalid-feedback">This field is required</div>
                        }
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">Select Date</label>
                        <input type="date" id="datepicker" value={date}
                               className={'form-control' + ((submitted && !date)||(submitted&&!dateValid) ? ' is-invalid' : '')}
                               onChange={handleDateChange}/>
                        {submitted && !date &&
                        <div className="invalid-feedback">This field is required</div>
                        }
                        {submitted && !dateValid &&
                        <div className="invalid-feedback">Please select date from 01-01-2010 until today</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" onClick={getCurrentDate}>Today</button>
                    </div>

                </div>

                <div className="col-4">
                    <div className="form-group">
                        <button className="submit-btn btn btn-primary" onClick={handleSubmit}>
                            {loading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Submit</button>
                    </div>
                </div>
            </div>
            </div>
            {rates.length>0&&
            <div className='chart'>
                <ResponsiveBar
                    data={data}
                    updateDate={data}
                    keys={keys}
                    indexBy="date"
                    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                    padding={0.3}
                    groupMode="grouped"
                    valueScale={{ type: 'linear' }}
                    indexScale={{ type: 'band', round: true }}
                    colors={{ scheme: 'nivo' }}
                    defs={[
                        {
                            id: 'dots',
                            type: 'patternDots',
                            background: 'inherit',
                            color: '#38bcb2',
                            size: 4,
                            padding: 1,
                            stagger: true
                        },
                        {
                            id: 'lines',
                            type: 'patternLines',
                            background: 'inherit',
                            color: '#eed312',
                            rotation: -45,
                            lineWidth: 6,
                            spacing: 10
                        }
                    ]}
                    fill={[
                        {
                            match: {
                                id: 'fries'
                            },
                            id: 'dots'
                        },
                        {
                            match: {
                                id: 'sandwich'
                            },
                            id: 'lines'
                        }
                    ]}
                    borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Date',
                        legendPosition: 'middle',
                        legendOffset: 32
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Price',
                        legendPosition: 'middle',
                        legendOffset: -40
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                    legends={[
                        {
                            dataFrom: 'keys',
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 120,
                            translateY: 0,
                            itemsSpacing: 2,
                            itemWidth: 100,
                            itemHeight: 20,
                            itemDirection: 'left-to-right',
                            itemOpacity: 0.85,
                            symbolSize: 20,
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                />
            </div>
            }
        </div>
    );
}

export { PricesPage };
