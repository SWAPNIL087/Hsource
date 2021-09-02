import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import axios from 'axios';
import {$} from 'jquery'
const Navbar = ()=>{
    const history = useHistory()
    const [email,setemail] = useState()
    const [password,setpassword] = useState()
    
    const register=()=>{
     console.log('register')
     history.push('/register')
    }
    const login=async(e)=>{
        e.preventDefault();
        if(email==''){
            alert('email required')
        }
        else if(password==''){
            alert('password required')
        }
        else{
            console.log('login')
            console.log(email,password)
            const res = await axios.post('/users/login',{
                Headers:{'content-Type':'application/json'},
                json:true,
                body:{email:email,password:password}
            })
        
            console.log(res.data)

        }
        
    }
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
            <NavLink className="navbar-brand m-2 font-weight-bold" to="/">H<span className='source_text'>source</span></NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/">About</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/appointment">Appointment</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/symptoms">Symptoms</NavLink>
                </li>
                <li className="nav-">
                    <p data-toggle="modal" data-target="#exampleModal" className="nav-link login">Login</p>
                </li>
                </ul>
            </div>
        </nav>

        <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <div className='w-100'>
                <h5 className="modal-title float-left" id="exampleModalLabel">Login to your <span className='source_text'>clinic</span></h5>
                
                <p className='float-right'>New user ? <span data-dismiss="modal" onClick={register} className='text-danger register_link'>Register</span></p>
                </div>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
            <form className='login_card'>
                <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" autoComplete='off' onChange={(e)=>setemail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" onChange={(e)=>setpassword(e.target.value)}  id="exampleInputPassword1" placeholder="Password"/>
                </div>
                <button onClick={login} className="btn btn-primary">Login</button>
                
            </form>
            </div>
            </div>
        </div>
        </div>
        </>
    )
}

export default Navbar