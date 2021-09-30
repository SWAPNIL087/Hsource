import React, { useEffect,useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import {UserContext} from "../App"

const Logout = ()=>{
    const history = useHistory()

    const {state,dispatch} = useContext(UserContext);

    useEffect(()=>{
        fetch('/users/logout',{
            method:'GET',
            headers:{
                Accept:'application/json',
                "Content-Type":'application/json'
            },
            credentials:"include"
        }).then((res)=>{
            dispatch({type:'USER',payload:false})
            localStorage.removeItem('isLoggedin')
            localStorage.setItem('isLoggedin',false)
            history.push('/',{replace:true})
        }).catch((err)=>{
            console.log(err)
        })
    })

    return(
        <>
        </>
    )
}
export default Logout;