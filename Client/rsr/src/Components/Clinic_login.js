import React, { useEffect,useState } from 'react'
import { useHistory } from 'react-router'
import ClipLoader from "react-spinners/ClipLoader";
import {AiFillCaretDown, AiTwotoneFolderAdd} from 'react-icons/ai'
import $ from 'jquery';
import axios from 'axios'
import Foot from './Foot'

const Clinic_login = ()=>{
    const history = useHistory()
    const [loading,setloading] = useState(true)
    const [info,setinfo] = useState([])
    const [clinic,setclinic] = useState()
    const [curr_date,setdate] = useState()
    const[state,setstate] = useState()
    const [city,setcity] = useState()
    const [status,setstatus] = useState('check')
    const [clinicID,setClinciID] = useState()
    const [slide,setslide] = useState(1)
    const [Booking_Data,setBooking_Data] = useState()
    const customLoad = async()=>{
        setloading(false)
        try{

            const res = await fetch('/users/Clinic_login',{
                method:'GET',
                headers:{
                    Accept: "application/json",
                    "Content-Type":"application/json"
                },
                json:true,
                credentials:"include"
            })

            const data = await res.json()
            if (!res.status===200 || !data){
                const error = new Error(res.error);
                history.push('/')
                throw error;
            } 
            setloading(true)
            setClinciID(data._id)
            setcity(data.city)
            setstate(data.State)
            setclinic(data.docName)
            
            console.log(data.Booking)
            setBooking_Data(data.Booking)
            var currdate = (Date().toLocaleString())
            var store = currdate.split(' ')
            var date = store[2]+'.'+store[1]+'.'+store[3]
            setdate(date)
            let arr=[]
            for(var i=0;i<data.Booking.length;i++){
                var x = data.Booking[i].date 
                if (x==date){
                    arr.push(data.Booking[i])
                }
            }
            console.log(arr)
            setinfo(arr)

        }
        catch(err){
            console.log('invalid user')
            history.push('/')
        }
    }

    useEffect(async()=>{
        customLoad();
    },[])

    const patient_Details = (id)=>{
        console.log(id)
        var tem = '#'+id
        console.log(tem)
        $(tem).removeClass('d-none')
        $(tem).toggle();
    }

    const attended = async(id) =>{
        console.log(id,'attended')
        var container={
            C_id:clinicID,
            B_id:id,
            status:'yes'
        }
        const res = await axios.post('/users/booking_status',{
            Headers:{'content-Type':'application/json'},
            json:true,
            body:container
        })
        
        setstatus('Attended')
        console.log(res.data)
        customLoad();
    }

    const skip = async(id)=>{
        console.log(id,'skipped');
        var container={
            C_id:clinicID,
            B_id:id,
            status:'no'
        }
        const res = await axios.post('/users/booking_status',{
            Headers:{'content-Type':'application/json'},
            json:true,
            body:container
        })
        var tem = '#'+id
        var tem2 = tem + '1'
        var tem3 = tem2 + '1'
        setstatus('Skipped')
        console.log(res.data)
        customLoad();
    }

    const moveDateBack = async()=>{
        if(slide==1){
            console.log("first slide")
        }
        if(slide==2){
            console.log("first slide")
            var currdate = (Date().toLocaleString())
            var store = currdate.split(' ')
            var time = store[4]
            var date = store[2]+'.'+store[1]+'.'+store[3]
            setdate(date)
            setslide(slide-1)
            let arr=[]
            for(var i=0;i<Booking_Data.length;i++){
                var x = Booking_Data[i].date 
                if (x==date){
                    arr.push(Booking_Data[i])
                }
            }
            console.log(arr)
            setinfo(arr)
            
        }
        if(slide==3){
            console.log("going a day back")
            var myDate = new Date()
            //add a day to the date
            myDate.setDate(myDate.getDate() + (1));
            var store = myDate.toDateString().split(' ')
            console.log(store)
            var time = store[4]
            var date = store[2]+'.'+store[1]+'.'+store[3]
            setdate(date)
            setslide(slide-1)
            let arr=[]
            for(var i=0;i<Booking_Data.length;i++){
                var x = Booking_Data[i].date 
                if (x==date){
                    arr.push(Booking_Data[i])
                }
            }
            console.log(arr)
            setinfo(arr)
        }
        
    }

    const moveDateAhead = async()=>{
        if(slide==3){
            console.log("last slide")
        }

        else{
            // change the setdate to one day ahead
            console.log('increase the date')
            var myDate = new Date()
            //add a day to the date
            myDate.setDate(myDate.getDate() + (slide));
            var store = myDate.toDateString().split(' ')
            console.log(store)
            var time = store[4]
            var date = store[2]+'.'+store[1]+'.'+store[3]
            setdate(date)
            setslide(slide+1)
            let arr=[]
            for(var i=0;i<Booking_Data.length;i++){
                var x = Booking_Data[i].date 
                if (x==date){
                    arr.push(Booking_Data[i])
                }
            }
            console.log(arr)
            setinfo(arr)
            
        }
        // curr_date is to be used
        
    }

    return(
        <>
        {
            loading ? 
            <div>
                <div>
                    <h4 className='text-info'>{clinic}'s Clinic</h4>
                    <div  className='float-right mr-5 font-weight-bold'>Date : <span className='text-danger'>{curr_date}</span></div>
                </div>
                <hr/>
                <div className='min-vh-100'>
                <div className='container col-12 w-100 m-auto'>
                    <div className='row col-lg-8 col-md-10 col-12 m-auto p-3'>
                        <div className='mt-1 col-1'>
                            <h6 className='font-weight-bold'>S.no</h6>
                        </div>
                        <div className='mt-1 col-2'>
                            <h6 className='font-weight-bold'>Name</h6>
                        </div>
                        <div className='mt-1 col-2'>
                            <h6 className='font-weight-bold'>Slot</h6>
                        </div>
                        <div className='mt-1 col-2'>
                            <h6 className='font-weight-bold'>details</h6>
                        </div>
                        <div className='col-2'>
                            <h6 className='font-weight-bold'>Status Attended</h6>
                        </div>
                    </div>
                    <hr className='h_line'/>
                </div>

                {/* -----------------------apply slides effect here--------------------------- */}

                <div id="carouselExampleControls" className="carousel slide" data-interval="false" data-wrap="false">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                        {info.map((i,idx)=>{return(
                    <div key={i._id} className='container col-12 w-100 m-auto'>
                        <div className='row col-lg-8 col-md-10 col-12 m-auto p-3 booking-box'>
                            <div className='mt-1 col-1'>
                                <p>{idx+1}</p>
                            </div>
                            <div className='mt-1 col-2'>
                                <p>{i.name}</p>
                            </div>
                            <div className='mt-1 col-2'>
                                <p>{i.slotOpen}</p>
                            </div>
                            <div className='mt-1 col-2'>
                                <p className='text-danger'><span onClick={()=>patient_Details(i._id+'1')} className='patient_details'>details<AiFillCaretDown/></span></p>
                            </div>
                            <div className='col-2' id={i._id+'3'}>
                                <p className='font-weight-bold text-danger'>{i.attented}</p>
                            </div>
                            <div className='col-3'>
                                <button onClick={()=>attended(i._id)} id={i._id+'attend'} className='btn b1 btn-success'>attended</button>
                                <button onClick={()=>skip(i._id)} id={i._id+'skip'} className='btn b1 btn-danger'>skip</button>
                                <p className='font-weight-bold text-success d-none' id={i._id+'mark'}>Marked</p>
                            </div>
                            
                            <div id={i._id+'1'} className='col-12 row mt-2 d-none'>
                                <div className='col-lg-3 col-md-6 col-sm-6'>
                                    <p><span className='font-weight-bold text-warning'>Email</span> : {i.email}</p>
                                </div>
                                <div className='col-lg-3 col-md-2 col-sm-6'>
                                    <p><span className='font-weight-bold text-warning'>Date</span> : {i.date}</p>
                                </div> 
                                <div className='col-lg-3 col-md-2 col-sm-6'>
                                    <p><span className='font-weight-bold text-warning'>Contact</span> : {i.contact}</p>
                                </div> 
                                <div className='col-lg-3 col-md-2 col-sm-6'>
                                    <p><span className='font-weight-bold text-warning'>Problem</span> : {i.disease}</p>
                                </div>
                            </div>
                        </div>
                        <hr className='h_line'/>
                    </div>
                    )}
                    )
                    }
                        </div>
                        <div className="carousel-item">
                        {info.map((i,idx)=>{return(
                    <div key={i._id} className='container col-12 w-100 m-auto'>
                        <div className='row col-lg-8 col-md-10 col-12 m-auto p-3 booking-box'>
                            <div className='mt-1 col-1'>
                                <p>{idx+1}</p>
                            </div>
                            <div className='mt-1 col-2'>
                                <p>{i.name}</p>
                            </div>
                            <div className='mt-1 col-2'>
                                <p>{i.slotOpen}</p>
                            </div>
                            <div className='mt-1 col-2'>
                                <p className='text-danger'><span onClick={()=>patient_Details(i._id+'2')} className='patient_details'>details<AiFillCaretDown/></span></p>
                            </div>
                            <div className='col-2' id={i._id+'3'}>
                                <p className='font-weight-bold text-danger'>{i.attented}</p>
                            </div>
                            <div className='col-3' >
                                <button onClick={()=>attended(i._id)} id={i._id+'attend'} className='btn b1 btn-success'>attended</button>
                                <button onClick={()=>skip(i._id)} id={i._id+'skip'} className='btn b1 btn-danger'>skip</button>
                                <p className='font-weight-bold text-success d-none' id={i._id+'mark'}>Marked</p>
                            </div>
                            
                            <div id={i._id+'2'} className='col-12 row mt-2 d-none'>
                                <div className='col-lg-3 col-md-6 col-sm-6'>
                                    <p><span className='font-weight-bold text-warning'>Email</span> : {i.email}</p>
                                </div>
                                <div className='col-lg-3 col-md-2 col-sm-6'>
                                    <p><span className='font-weight-bold text-warning'>Date</span> : {i.date}</p>
                                </div> 
                                <div className='col-lg-3 col-md-2 col-sm-6'>
                                    <p><span className='font-weight-bold text-warning'>Contact</span> : {i.contact}</p>
                                </div> 
                                <div className='col-lg-3 col-md-2 col-sm-6'>
                                    <p><span className='font-weight-bold text-warning'>Problem</span> : {i.disease}</p>
                                </div>
                            </div>
                        </div>
                        <hr className='h_line'/>
                    </div>
                    )}
                    )
                    }
                        </div>
                        <div className="carousel-item">
                        {info.map((i,idx)=>{return(
                    <div key={i._id} className='container col-12 w-100 m-auto'>
                        <div className='row col-lg-8 col-md-10 col-12 m-auto p-3 booking-box'>
                            <div className='mt-1 col-1'>
                                <p>{idx+1}</p>
                            </div>
                            <div className='mt-1 col-2'>
                                <p>{i.name}</p>
                            </div>
                            <div className='mt-1 col-2'>
                                <p>{i.slotOpen}</p>
                            </div>
                            <div className='mt-1 col-2'>
                                <p className='text-danger'><span onClick={()=>patient_Details(i._id+'3')} className='patient_details'>details<AiFillCaretDown/></span></p>
                            </div>
                            <div className='col-2' id={i._id+'3'}>
                                <p className='font-weight-bold text-danger'>{i.attented}</p>
                            </div>
                            <div className='col-3'>
                                <button onClick={()=>attended(i._id)} id={i._id+'attend'} className='btn b1 btn-success'>attended</button>
                                <button onClick={()=>skip(i._id)} id={i._id+'skip'} className='btn b1 btn-danger'>skip</button>
                                <p className='font-weight-bold text-success d-none' id={i._id+'mark'}>Marked</p>
                            </div>
                            
                            <div id={i._id+'3'} className='col-12 row mt-2 d-none'>
                                <div className='col-lg-3 col-md-6 col-sm-6'>
                                    <p><span className='font-weight-bold text-warning'>Email</span> : {i.email}</p>
                                </div>
                                <div className='col-lg-3 col-md-2 col-sm-6'>
                                    <p><span className='font-weight-bold text-warning'>Date</span> : {i.date}</p>
                                </div> 
                                <div className='col-lg-3 col-md-2 col-sm-6'>
                                    <p><span className='font-weight-bold text-warning'>Contact</span> : {i.contact}</p>
                                </div> 
                                <div className='col-lg-3 col-md-2 col-sm-6'>
                                    <p><span className='font-weight-bold text-warning'>Problem</span> : {i.disease}</p>
                                </div>
                            </div>
                        </div>
                        <hr className='h_line'/>
                    </div>
                    )}
                    )
                    }
                        </div>
                    </div>
                    <div>
                    <a className='float-left carousel_left prev'>
                        <span onClick={moveDateBack} className="carousel-control-prev text-danger" href="#carouselExampleControls" role="button" data-slide="prev" style={{backgroundColor:'black',borderRadius:'50%'}} className="carousel-control-prev-icon text-danger" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    </div>
                    <div>
                    <a className='float-right carousel_right next'>
                        <span onClick={moveDateAhead} className="carousel-control-next text-danger" href="#carouselExampleControls" role="button" data-slide="next" style={{backgroundColor:'black',borderRadius:'50%'}} className="carousel-control-next-icon text-danger" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                    </div>
                </div>
                </div>
                <div className='footer fixed'>
                    <Foot/>
                </div>
            </div>
            
            :
            <div  className='Loader'>
                <ClipLoader color={'#16f1cd'} loading={true} size={50}/>
                <p>Loading</p>
            </div>
        }
            
        </>
    )
}

export default Clinic_login;