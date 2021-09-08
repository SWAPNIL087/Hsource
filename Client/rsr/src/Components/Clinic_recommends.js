import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import { NavLink, useHistory } from 'react-router-dom';
import axios from 'axios'
import $ from 'jquery';

const Clinic_Recommends = ()=>{
    let history = useHistory()
    const [data,setdata] = useState([])
    useEffect(async()=>{
        var container ={
            disease:location.state.disease,
            city:location.state.city
        }
        const res = await axios.post('/users/suggested_clinics',{
            Headers:{'content-Type':'application/json'},
            json:true,
            body:container
        })
        console.log(res.data.length)
        if(res.data.length==0){
            $('.noClinicInfo').removeClass('d-none')
        }
        setdata(res.data)
    },[])

    const openclinic = (id)=>{
        console.log('clinic clicked',id)
        history.push({
            pathname: '/BookSlot',
            state: {id:id},
    })
    } 

    const location = useLocation();
    return(
        <div className='container'>
            <div className='row'></div>
            <h5>Clinics recommended for <span className='text-danger'>{location.state.disease}</span> in <span className='text-danger'>{location.state.city} </span></h5>
            <NavLink className='text-danger float-right' to='/appointment'>Show all</NavLink>
            <div className='container'>
            <div className='row'>
                    {data.map((i)=>{return(
                    <div  onClick={()=>openclinic(i._id)} key={i._id} className='col-lg-4 col-md-6 col-12 mt-4 text-left position-relative store'>
                        <div className='p-2 cards'> 
                            <div className='d-flex'>
                                <img  height='60px' width='60px' className="img-fluid profile_image mt-auto ml-3" src={i.profileURL}></img>
                                <h5 className='text-uppercase mb-3 ml-5 mt-auto'>{i.docName}</h5>
                            </div>
                            <hr className='lowerline'/>
                            <div className='row'>
                                <div className='col-6'>
                                    <img  height='150px' width='150px' className="img-fluid clinic_image" src={i.clinicURL}></img>
                                </div>
                                <div className='col-6'>
                                    <strong>Adress:</strong>
                                    <p>{i.street}, {i.city}</p>
                                    <p>{i.State}</p>
                                </div>
                                <div className='col-12 mt-4 text-secondary'>
                                <p><strong>About: </strong>{i.description}</p>
                                </div>
                            </div>
                            
                            
                        </div>
                    </div>
                    )}
                    )
                    }
                    <div className='m-auto noClinicInfo d-none'> 
                        <p className='mt-5 text-info'>There is <strong className='text-danger'>no registered clinic</strong> in {location.state.city} for treatment of {location.state.disease}</p>
                        <p className='text-info'>Click on show all and apply filter to search in other places</p>
                    </div>
            </div>
        </div>
        
        </div>
    )
}

export default Clinic_Recommends