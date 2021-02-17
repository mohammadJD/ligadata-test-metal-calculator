import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';

import { historicalActions } from '../../_actions';
import {metalService} from '../../_services/index'
import {useDispatch} from "react-redux";

function PricesPage() {
    // const users = useSelector(state => state.users);
    // const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(historicalActions.getHistorical('2021-02-17'));

        // metalService.getHistorical('2021-02-17')
        //     .then(
        //         item => {
        //             // dispatch(articleActions.getByIdRequest(item));
        //             console.log(item);
        //             // setItem(item);
        //         },
        //         // error => dispatch(articleActions.getByIdFailure(error.toString()))
        //     );

    }, []);

    function handleDeleteUser(id) {
        // dispatch(userActions.delete(id));
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h1>Hi from PricesPage!</h1>

        </div>
    );
}

export { PricesPage };
