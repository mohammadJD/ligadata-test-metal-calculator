import React, {useEffect, useState} from 'react';
// import { Link } from 'react-router-dom';
import {config} from "../../_helpers";
import {alertActions, timeSeriesActions} from '../../_actions';
import {metalService} from '../../_services/index';
import {useDispatch, useSelector} from "react-redux";
import {ResponsiveBar} from "@nivo/bar";
import "./historical.css";

import DateRangePicker from 'react-bootstrap-daterangepicker';
// you will need the css that comes with bootstrap@3. if you are using
// a tool like webpack, you can do the following:
// import 'bootstrap/dist/css/bootstrap.css';
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css';

function HistoricalPage() {
    const [fromDate,setFromDate] = useState(getFullDate(new Date()));
    const [toDate,setToDate] = useState(getFullDate(new Date()));
    // const [fromDateValid,setFromDateValid] = useState(true);
    // const [toDateValid,setToDateValid] = useState(true);
    const [dateValid,setDateValid] = useState(true);
    const [symbols,setSymbols] = useState('XAU');

    const [submitted, setSubmitted] = useState(false);
    const currency = useSelector(state => state.currency.currency);
    const dispatch = useDispatch();
    const metals = config.metals;
    const items = useSelector(state => state.timeSeries);
    const loading = useSelector(state => state.timeSeries.loading);
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
        console.log(value);
    }
    // function handleFromDateChange(e) {
    //     const { name, value } = e.target;
    //     setFromDate(value);
    //     setFromDateValid((new Date(value) >= new Date('01-01-2010'))&&(new Date(value)<=new Date()));
    // }

    // function handleToDateChange(e) {
    //     const { name, value } = e.target;
    //     setToDate(value);
    //     let Difference_In_Time = toDate.getTime() - fromDate.getTime();
    //     let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    //     let calcPeriod = (Difference_In_Days>1 && Difference_In_Days <=20);
    //     setToDateValid((new Date(value) >= new Date('01-01-2010'))&&(new Date(value)<=new Date()) &&(calcPeriod));
    //     console.log("period : "+Difference_In_Days);
    //     console.log((new Date(value)-new Date(fromDate)));
    // }

    function getFullDate(date){
        let newDate = new Date(date);
        let day = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let separator = '-';

        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${day}`;
    }

    // 2021-02-06: {XAG: 22.32779921433107}
    // XAG: 22.32779921433107
    // 2021-02-07: {XAG: 22.599422874534802}
    // 2021-02-08: {XAG: 22.600905407100477}
    // 2021-02-09: {XAG: 22.45667480541133}
    // 2021-02-10: {XAG: 22.279104897457895}
    // start_date: "2021-02-06"

    function handleSubmit() {

        setSubmitted(true);
        // let tmpData = [
        //     {
        //         "date":"2021-02-06",
        //         "Silver XAG":1
        //     },
        //     {
        //         "date":"2021-02-07",
        //         "Silver XAG":2
        //     },
        //     {
        //         "date":"2021-02-08",
        //         "Silver XAG":3
        //     }
        // ];
        // setKeys(["Silver XAG"]);
        // setRates([keys]);

            // return;
        if (fromDate &&toDate&& dateValid) {

            dispatch(timeSeriesActions.getTimeSeriesRequest());

            metalService.getTimeSeries(currency,fromDate,toDate,symbols)
                .then(
                    items => {
                        if(!items.success){
                            dispatch(timeSeriesActions.getTimeSeriesFailure(items.error.info.toString()));
                            dispatch(alertActions.error(items.error.info.toString()));
                            return;
                        }
                        dispatch(timeSeriesActions.getTimeSeriesSuccess(items));
                        dispatch(alertActions.success('Data fetched successfully'));

                        // return;
                        let tmpKeysArr = [];
                        let tmpData = [];
                        let rates = items.rates;
                        for (const [key, value] of Object.entries(rates)) {
                            let tmpObj = {"date":key};
                            for (const [secKey, secValue] of Object.entries(value)){
                                let item = metals.find((item => item.value === secKey));
                                if(item!==undefined){
                                    tmpObj[item.name + ' ' + item.value] = secValue;
                                    tmpData.push(tmpObj);
                                }
                            }
                            tmpKeysArr.push(key);
                        }
                        console.log("symbols");
                        console.log(symbols);
                        let item = metals.find((item => item.value === symbols));
                        if(item!==undefined){
                            setKeys([item.name + ' ' + item.value]);
                        }
                        // console.log(("tmpData"));
                        // console.log(tmpData);
                        setRates(tmpKeysArr);
                        setData(tmpData);

                    },
                    error => {
                        dispatch(timeSeriesActions.getTimeSeriesFailure(error.toString()));
                        dispatch(alertActions.error(error.toString()));
                    }
                );
        }
    }

    function handlePickerCallback(start, end, label) {
        let fromDate = getFullDate(start._d);
        let toDate = getFullDate(end._d);

        let Difference_In_Time = new Date(toDate).getTime() - new Date(fromDate).getTime();
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        let calcPeriod = (Difference_In_Days>=0 && Difference_In_Days <=20);
        setDateValid((new Date(fromDate) >= new Date('01-01-2010'))&&(new Date(toDate)<=new Date()) &&(calcPeriod));
        // console.log("Difference_In_Days");
        // console.log(Difference_In_Days);
        // console.log("is valid");
        // console.log((new Date(fromDate) >= new Date('01-01-2010'))&&(new Date(toDate)<=new Date()) &&(calcPeriod));
        // console.log("dateValid");
        // console.log(dateValid);
        // console.log("fromDate");
        // console.log(fromDate);
        // console.log("toDate");
        // console.log(toDate);
        setFromDate(fromDate);
        setToDate(toDate);
    }

    return (
        <div className="historical-page">
            <h1 className="page-title">Historical Page</h1>
            <div className="card">
                <div className="row">
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect2">Select at least one Metal</label>
                        <select id="exampleFormControlSelect2"
                                className={'form-control'}
                                onChange={handleSymbolsChange}>
                            {
                                metals.map((item,index)=>
                                    <option key={index} value={item.value}>{item.name}</option>
                                )
                            }

                        </select>
                        {/*{submitted && symbols.length===0 &&*/}
                        {/*<div className="invalid-feedback">This field is required</div>*/}
                        {/*}*/}
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="form-group">
                        <label>Pick Interval Date</label>
                        <DateRangePicker onCallback={handlePickerCallback}
                        >
                            {/*<button className="btn btn-primary">Click Me To Open Picker!</button>*/}
                            <input type="text" className={'form-control' + ((submitted&&!dateValid) ? ' is-invalid' : '')}/>
                        </DateRangePicker>
                        {submitted && !dateValid &&
                        <div className="invalid-feedback">- Please select date from 01-01-2010 until today<br/>
                           - The period between start and end date must be minus or equal to 20
                        </div>
                        }
                    </div>

                    {/*<div className="form-group">*/}
                    {/*    <label htmlFor="exampleFormControlSelect1">From Date</label>*/}
                    {/*    <input type="date" id="datepicker" value={fromDate}*/}
                    {/*           className={'form-control' + ((submitted && !fromDate)||(submitted&&!fromDateValid) ? ' is-invalid' : '')}*/}
                    {/*           onChange={handleFromDateChange}/>*/}
                    {/*    {submitted && !fromDate &&*/}
                    {/*    <div className="invalid-feedback">This field is required</div>*/}
                    {/*    }*/}
                    {/*    {submitted && !fromDateValid &&*/}
                    {/*    <div className="invalid-feedback">Please select date from 01-01-2010 until today</div>*/}
                    {/*    }*/}
                    {/*</div>*/}
                </div>

                    {/*<div className="col-md-4">*/}
                    {/*    <div className="form-group">*/}
                    {/*        <label htmlFor="exampleFormControlSelect1">To Date</label>*/}
                    {/*        <input type="date" id="datepicker" value={toDate}*/}
                    {/*               className={'form-control' + ((submitted && !toDate)||(submitted&&!toDateValid) ? ' is-invalid' : '')}*/}
                    {/*               onChange={handleToDateChange}/>*/}
                    {/*        {submitted && !toDate &&*/}
                    {/*        <div className="invalid-feedback">This field is required</div>*/}
                    {/*        }*/}
                    {/*        {submitted && !toDateValid &&*/}
                    {/*        <div className="invalid-feedback">Please select date from 01-01-2010 until today</div>*/}
                    {/*        }*/}
                    {/*    </div>*/}
                    {/*</div>*/}

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

export { HistoricalPage };
