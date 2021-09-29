import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import HomeCard1 from './HomeCard1';
const Home = ()=>{
    return(
        <>
        <div className='row m-0 p-0 home'>
            <div id='pointer'></div>
            <div className='col-lg-10 col-md-10 col-11 m-auto p-0'>
                <h2 className='text-light ml2'>Easy appointments and </h2>
                <h2 className='text-light ml2'>reminders.</h2>
                <small className='text-light'>
                <br/>
                Predict accurate disease according to symptoms and get recommendation accordingly*. Hsource makes<br/>
                clinical appointments way more efficient and easy to manage( approx +65%).
                </small>
            </div>
            <div className='col-6 m-auto'>
                <NavLink className='btn btn-primary float-right mb-5 mt-4' to='/appointment'>Book Appointment</NavLink>
            </div>
            <div className='col-6 m-auto'>
                <NavLink className='btn btn-light float-left mb-5 mt-4' to='/symptoms'>Check symptom</NavLink>
            </div>
        </div>
        <HomeCard1/>
        </>
    )
}

export default Home;