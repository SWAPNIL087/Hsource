import React, { useEffect, useState } from 'react'
import Foot from './Foot';
import $ from 'jquery'
import { useLocation } from "react-router-dom";
import axios from 'axios'
import ClipLoader from "react-spinners/ClipLoader";

const BookSlot = ()=>{
    const location = useLocation();
    const [loading,setloading] = useState(true)
    const [opening,setopening] = useState('initial')
    const [closing,setclosing] = useState('initial')
    const [slotsize,setslotsize] = useState()
    const [BookedSlots,setBookedSlots] = useState([])
    const [slide,setslide] = useState(1)
    const [startime,setstarttime] = useState()
    const [endtime,setendtime] = useState()
    const [Selected_date,setdate] = useState(date)
    const [slotno,setslotno] = useState()
    const [slot_id,setSlot_id] = useState()
    const [patient,setpatient] = useState()
    const [email,setemail] = useState()
    const [contact,setcontact] = useState()
    const [msg,setmsg] = useState()

    useEffect(async()=>{
        var container={
            id:location.state.id
        }
        setloading(false)

        const res = await axios.post('/users/clinic_details',{
            Headers:{'content-Type':'application/json'},
            json:true,
            body:container
        })
        var tem = []
        for(var i=0;i<res.data[0].Booking.length;i++){
            var tem_id =  res.data[0].Booking[i].slotID
            tem.push(tem_id)
        }
        setBookedSlots(tem)
        setopening(res.data[0].opening)
        setclosing(res.data[0].closing)
        var slot = parseInt((res.data[0].slot[0] + res.data[0].slot[1])/2)
        setslotsize(slot)
        var currdate = (Date().toLocaleString())
        var store = currdate.split(' ')
        var time = store[4]
        var date = store[2]+'.'+store[1]+'.'+store[3]
        setdate(date)
        setloading(true)
    },[])

    var currdate = (Date().toLocaleString())
        var store = currdate.split(' ')
        var time = store[4]
        var date = store[2]+'.'+store[1]+'.'+store[3]
        
    const convertTime12to24 = (time12h) => {
        const [time, modifier] = time12h.split(' ');
      
        let [hours, minutes] = time.split(':');
      
        if (hours === '12') {
          hours = '00';
        }
      
        if (modifier === 'PM') {
          hours = parseInt(hours, 10) + 12;
        }
      
        return `${hours}:${minutes}`;
      }

    const convertintomins = (time)=>{
        let [hrs,mins] = time.split(':')
        var tem = parseInt(hrs*60) + parseInt(mins)
        return tem
    }
    

    const convertminTohrs = (time,k)=>{
        time = time +k
        var H = parseInt(time/60)
        var M = time%60
        // console.log(H,M)
        if(String(M).length==1){
            M = '0'+M
        }
        // console.log('-debug----',M)
        return (H+':'+M)
    }

    const calculateSlots = (x,y,k)=>{
        
        return parseInt((y-x)/k)
    }

    const convertintominssecs = (time)=>{
        const[hrs,mins,sec] = time.split(':')
        var tem = parseInt(hrs)*60 + parseInt(mins) + parseInt(parseInt(sec)/60)
        return tem
    }

    

    var open =  convertTime12to24(opening)
    var minutes =  convertintomins(open)
    var close = convertTime12to24(closing)
    var minutes2 = convertintomins(close)
    const totalslots = calculateSlots(minutes,minutes2,slotsize)
    //console.log(totalslots)

    

    const selectSlot = (a,b,id)=>{
        console.log(id,'===================================================')
        if(a==1){
        setSlot_id(id)
        //console.log(b.props.children)
        var slot_no = b.props.children[1].props.children[1]

        var store = b.props.children[2].props.children

        // console.log(startime,endtime,slot_no)
        setstarttime(store[0])
        setslotno(slot_no)
        setendtime(store[3])
        $('.launchbtn').click()
        }
    }

    const options =[];
    for(var i=0;i<totalslots;i++){
        if(i==0){
            var start = open
            var tem = convertintomins(start)
            var end = convertminTohrs(tem,slotsize)
        }
        else{
            var start = end
            var tem = convertintomins(start)
            var end = convertminTohrs(tem,slotsize)
        }
        var tem2 = convertintominssecs(time)
        if(tem<tem2 || BookedSlots.includes(Selected_date+(i+1))){
            //not allowed to book slot
            options.push([0,
                    <div className='cell2 p-1' id={Selected_date+(i+1)}>
                    <p className='position-absolute mark2'></p>
                    <h5 className='mt-3'>Slot-{i+1}</h5>
                    <small>{start}-<strong>to-</strong>{end}</small>
                    </div>]
                )
        }
        else{
            //available slot
            options.push([1,
                    <div className='cell p-1' id={Selected_date+(i+1)}>
                    {/* <strong className='d-none'>{Selected_date}</strong> */}
                    <p className='position-absolute mark'></p>
                    <h5 className='mt-3'>Slot-{i+1}</h5>
                    <small>{start}-<strong>to-</strong>{end}</small>
                    </div>]
                )
        }
        
    }
    

    const finalbooking = async(e)=>{
        e.preventDefault();
        if(startime=='' || endtime=='' || Selected_date=='' || patient=='' || email=='' || contact==''){
            alert('please fill in all the details!')
        }
        else{

        //making final Booking 
        var container={
            startime:startime,
            endtime:endtime,
            date:Selected_date,
            patient:patient,
            email:email,
            contact:contact,
            slot_id:slot_id,
            slot_no:slotno,
            id:location.state.id,
            disease:location.state.disease
        }

        const res = await axios.post('/users/Book_a_slot',{
            Headers:{'content-Type':'application/json'},
            json:true,
            body:container
        })

        $('.main_modal_body').addClass('d-none')
        $('.msg').removeClass('d-none')
        $('.bookBTN').addClass('d-none')
        setmsg(res.data)
        if(res.data=='Slot booked you will shortly recieve a confirmation email.'){
        setTimeout(() => {
            window.location.reload() 
        }, 2000);}
        }
    }

    

    const moveDateBack = ()=>{
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
        }
    }
    return(
        <>
        {
            loading ?
            <div>
        <div className='position-absolute position-fixed mt-2 ml-2'>
                    <div className='d-flex'>
                    <p className='mark mt-1 mr-2'></p>
                    <small className='text-success'>available</small>
                    </div>
                    <div className='d-flex'>
                    <p className='mark2 mt-1 mr-2'></p>
                    <small className='text-danger'>Booked</small>
                    </div>
                    <strong>{Selected_date}</strong>
                </div>
        <div className='container'>
        
            <div className='row'>

            <button type="button" onClick={()=>{
                $('.main_modal_body').removeClass('d-none')
                $('.msg').addClass('d-none')
                $('.bookBTN').removeClass('d-none')
            }} className="btn btn-primary d-none launchbtn" data-toggle="modal" data-target="#exampleModal4">
            Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal4" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">book appointment</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className='main_modal_body'>
                    <strong>{startime} to {endtime}</strong><br/>
                    <strong>{Selected_date}</strong>
                    <form className='text-left mt-3'>
                        <label for='name'>Name : </label>
                        <input onChange={(e)=>{setpatient(e.target.value)}} className='float-right mr-5' id='name' placeholder="enter name" name='name' type='text'></input><br/>
                        <label for='email'>Email: </label>
                        <input onChange={(e)=>{setemail(e.target.value)}} className='float-right mr-5' id='email' placeholder="enter email" name='email' type='email'></input><br/>
                        <label for='telephone'>Contact Number : </label>
                        <input onChange={(e)=>{setcontact(e.target.value)}} className='float-right mr-5' type="tel" name="telphone" placeholder="888 888 8888" pattern="[0-9]{3} [0-9]{3} [0-9]{4}" maxlength="12"  title="Ten digits code" required/><br/>
                    </form>
                    </div>
                    <div className='msg'>
                    <p className='text-danger'>{msg}</p>
                    </div>
                </div>
                
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button onClick={finalbooking} type="button" className="btn btn-primary bookBTN">Book</button>
                </div>
                </div>
            </div>
            </div>


                <div className='row m-auto'>
                    <div className='col-12'>
                        <h4>Book a slot</h4>
                    </div>
                    <div className='col-lg-6 col-md-12 col-12'>
                        <p>Opening Time: <strong>{opening}</strong></p>
                    </div>
                    <div className='col-lg-6 col-md-12 col-12'>
                        <p>Closing Time: <strong>{closing}</strong></p>
                     </div>
                </div>
                


                <div id="carouselExampleControls" className="carousel slide" data-interval="false" data-wrap="false">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className='calender border container m-auto w-75'>
                                <div className='row m-auto w-100'>
                                {options.map((i,idx)=>{
                                    return(
                                        <div key={Selected_date+(idx+1)} onClick={()=>selectSlot(i[0],i[1],Selected_date+(idx+1))} className='mb-3 mt-3 col-lg-3 col-md-6 col-12'>
                                            {i[1]}
                                        </div>
                                    )
                                })}
                                </div>
                            </div>

                        </div>
                        <div className="carousel-item">
                            <div className='calender border container m-auto w-75'>
                                <div className='row m-auto w-100'>
                                {options.map((i,idx)=>{
                                    return(
                                        <div key={Selected_date+(idx+1)} onClick={()=>selectSlot(i[0],i[1],Selected_date+(idx+1))} className='mb-3 mt-3 col-lg-3 col-md-6 col-12'>
                                            {i[1]}
                                        </div>
                                    )
                                })}
                                </div>
                            </div>

                        </div>
                        <div className="carousel-item">
                            <div className='calender border container m-auto w-75'>
                                <div className='row m-auto w-100'>
                                {options.map((i,idx)=>{
                                    return(
                                        <div key={Selected_date+(idx+1)} onClick={()=>selectSlot(i[0],i[1],Selected_date+(idx+1))} className='mb-3 mt-3 col-lg-3 col-md-6 col-12'>
                                            {i[1]}
                                        </div>
                                    )
                                })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                    <a className='float-left carousel_left'>
                        <span onClick={moveDateBack} className="carousel-control-prev text-danger" href="#carouselExampleControls" role="button" data-slide="prev" style={{backgroundColor:'black',borderRadius:'50%'}} className="carousel-control-prev-icon text-danger" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    </div>
                    <div>
                    <a className='float-right carousel_right'>
                        <span onClick={moveDateAhead} className="carousel-control-next text-danger" href="#carouselExampleControls" role="button" data-slide="next" style={{backgroundColor:'black',borderRadius:'50%'}} className="carousel-control-next-icon text-danger" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                    </div>
                </div>
            </div>
            
        </div>
        <div className='footer position-relative fixed-bottom'>
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

export default BookSlot