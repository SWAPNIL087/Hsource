import React, {useState } from 'react';
import Foot from './Foot';
import {AiFillCheckCircle} from 'react-icons/ai';
import $ from 'jquery';
import validator from 'validator';
import {Items2} from '../Utils/data';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    root: {
      width: 300,
    },
  });

function valuetext(value) {
    return `${value}°C`;
  }

const Register = (props)=>{
    let history = useHistory()
    const classes = useStyles();

    const [value, setValue] = React.useState([20, 37]);
    const[openingTime,setOtime] = useState()
    const[closingTime,setCtime] = useState()
    const[email,setemail] = useState()
    const[password,setpassword] = useState()
    const[cpassword,setcpassword] = useState()
    const[State,setState] = useState()
    const[city,setcity] = useState()
    const[street,setstreet] = useState()
    const[selected_Feat,set_Feat] =useState([])
    const[docName,setdocName] = useState()
    const[description,setdiscription] =useState()
    const[image,setimage] = useState()
    const[profileURL,setprofileURL] = useState()
    const[previewProfile,setpreviewProfile] = useState()
    const[Clinicimage,setClinicimage] = useState()
    const[previewClinic,setpreviewClinic] = useState()
    const[clinicURL,setclinicURL] = useState()


    const register_clinic = async(e)=>{
        e.preventDefault();

        var store = [];
        for(var i=0;i<selected_Feat.length;i++){
            store.push(selected_Feat[i].name)
        }

        var container={
            email:email,
            password:password,
            State:State,
            city:city,
            street:street,
            docName:docName,
            profileURL:profileURL,
            description:description,
            clinicURL:clinicURL,
            features:store,
            slot:value,
            opening:openingTime,
            closing:closingTime
        }
        
        const res = await axios.post('/users/register',{
            Headers:{'content-Type':'application/json'},
            json:true,
            body:container
        })
        
        console.log(res)
        if(res.data=='failure'){
            $('.failure_msg').removeClass('d-none')
            $('.step1').addClass('d-none')
            $('.step2').addClass('d-none')
            $('.step3').addClass('d-none')
            $('.bullet3').addClass('d-none')
            $('.circle3').removeClass('d-none')}
        
        else{
        $('.success_msg').removeClass('d-none')
        $('.step1').addClass('d-none')
        $('.step2').addClass('d-none')
        $('.step3').addClass('d-none')
        $('.bullet3').addClass('d-none')
        $('.circle3').removeClass('d-none')}
        
    }

    const UploadImg = (e)=>{
        e.preventDefault();
        if(Clinicimage!=undefined){
        const data = new FormData()
        data.append("file",Clinicimage)
        data.append("upload_preset","Clinic-profile")
        data.append("cloud_name","swapimgcloud")
        fetch("https://api.cloudinary.com/v1_1/swapimgcloud/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            setprofileURL(data.url)
            console.log('the tick show be visible now')
            $('.tick2').removeClass('d-none')
        })
        .catch(err=>{
            console.log(err)
        })}
        else{
            alert('please select an image to upload')
        }
    }

    

    

    const UploadImg2 = (e)=>{
        e.preventDefault();
        if(image!=undefined){
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","Clinic-profile")
        data.append("cloud_name","swapimgcloud")
        fetch("https://api.cloudinary.com/v1_1/swapimgcloud/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            console.log('the tick should be visible now')
            $('.tick1').removeClass('d-none')
            setclinicURL(data.url)
            
        })
        .catch(err=>{
            console.log(err)
        })}
        else{
            alert('please select an image to upload')
        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    const deleteSym = (id,name)=>{
        $(`.disease_id${id}`).removeClass('d-none')
        for(var i=0;i<selected_Feat.length;i++){
            if(selected_Feat[i].id==id){
                selected_Feat.splice(i,1)
            }
        }
        set_Feat(selected_Feat=>[...selected_Feat,])
    }

    const handleOnSearch = (string, results) => {
        //console.log(string, results)
    }
    
    const handleOnSelect = (item) => {
        $(`.disease_id${item.id}`).addClass('d-none')
        set_Feat(selected_Feat => [...selected_Feat,item])
    }
    
    const handleOnFocus = () => {
    //console.log('Focused')
    }
    
    const formatResult = (item) => {
        return (<p className='Typeahead' dangerouslySetInnerHTML={{__html: '<strong>'+item+'</strong>'}}></p>);
    }
    
    const checkEmail = (e)=>{
        var tememail = e.target.value
        if (validator.isEmail(tememail)){
            console.log('asdcascdasdcasdcascdasc')
            $('.emailWarning').addClass('d-none')
            setemail(tememail)
        }
        else{
            $('.emailWarning').removeClass('d-none')
        }
    }

    const fun_step1 = (e)=>{
        e.preventDefault();
        $('.bullet1').removeClass('d-none')
        $('.bullet2').removeClass('d-none')
        $('.bullet3').removeClass('d-none')

        $('.circle1').addClass('d-none')
        $('.circle2').addClass('d-none')
        $('.circle3').addClass('d-none')

        $('.step1').removeClass('d-none')
        $('.step2').addClass('d-none')
        $('.step3').addClass('d-none')
    }
    
    const showoption1 = ()=>{
        $('.option1').removeClass('d-none')
    }

    const showoption2 = ()=>{
        $('.option2').removeClass('d-none')
    }

    const fun_step2 = (e)=>{
        e.preventDefault();
        console.log(email,password)
        if(email==undefined){
            alert('enter email');
        }
        else if(password==undefined){
            alert('enter password')
        }
        else if(cpassword==undefined){
            alert('confirm password')
        }
        else if(State==undefined || city==undefined || street==undefined){
            alert('comlete address')
        }
        else{
            $('.bullet1').addClass('d-none')
            $('.bullet2').removeClass('d-none')
            $('.bullet3').removeClass('d-none')

            $('.circle1').removeClass('d-none')
            $('.circle2').addClass('d-none')
            $('.circle3').addClass('d-none')

            $('.step1').addClass('d-none')
            $('.step2').removeClass('d-none')
            $('.step3').addClass('d-none')
        }
        
    }

    const fun_step3=(e)=>{
        e.preventDefault();
        $('.bullet2').addClass('d-none')
        $('.circle2').removeClass('d-none')
        $('.step2').addClass('d-none')
        $('.step3').removeClass('d-none')
    }

    const confirmpass = (e)=>{
        var cpass = (e.target.value)
        if(cpass!=password){
            $('.missmatch').removeClass('d-none')
        }
        else{
            $('.missmatch').addClass('d-none')
            setcpassword(cpass)
        }
    }

    const FL_Item = (id,name)=>{
        $(`.disease_id${id}`).addClass('d-none')
        set_Feat(selected_Feat => [...selected_Feat,{id:id,name:name}])
    }

    return (
        <>
        <div className='row m-0'>
            <div className='col-10 m-auto'>
             <h3 className='mt-3'>Registration</h3>
             
             <div className='reg_box mt-5'>
                <div className='row m-0'>
                    <div className='col-4 mb-2'>
                        <div className='bullet bullet1'><span>1</span></div>
                        <h2 className='circle1 steps-completed d-none'><AiFillCheckCircle/></h2>
                        <hr className='step-line m-auto'/>
                    </div>
                    <div className='col-4 mb-2'>
                    <div className='bullet bullet2'><span>2</span></div>
                        <h2 className='circle2 steps-completed d-none'><AiFillCheckCircle/></h2>
                        <hr className='step-line m-auto'/>
                    </div>
                    <div className='col-4 mb-2'>
                        <div className='bullet bullet3'><span>3</span></div>
                        <h2 className='circle3 steps-completed d-none'><AiFillCheckCircle/></h2>
                    </div>
                </div>
                <form className='registerBox row m-0'>
                    <div className='row m-0 w-100 step1'>
                    <div className=' col-lg-6 col-md-6 col-12'>
                        <div className="form-group ">
                            <h5 className='mt-2'>Email :</h5>
                            <small className='text-danger emailWarning d-none'>Invalid Email</small>
                            <input type="email" onChange={checkEmail} className="form-control text-center m-auto" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                        </div>
                        <div className="form-group ">
                            <h5 className='mt-2'>Create-Password :</h5>
                            <input type="password" onChange={(e)=>setpassword(e.target.value)} className="form-control text-center m-auto" id="exampleInputPassword1" placeholder="Password"/>
                        </div>
                        <div className="form-group ">
                        <small className='text-danger missmatch d-none'>password donot match</small>
                        <h5 className='mt-2'>Confirm-Password :</h5>
                            <input type="password" onChange={confirmpass} className="form-control text-center m-auto" id="exampleInputPassword2" placeholder="Confirm Password"/>
                        </div>
                    </div>
                    <div className='maps col-lg-6 col-md-6 col-12'>
                        <div className="form-group ">
                        <h5 className='mt-2'>Clinic Address :</h5>
                            <div className='mt-0'>
                            <input type="text" onChange={(e)=>setState(e.target.value)} className="form-control text-center m-auto" id="address" placeholder="Enter Your State"/>
                            </div>
                            <div className='mt-5'>
                            <input type="text" onChange={(e)=>setcity(e.target.value)} className="form-control text-center m-auto" id="address" placeholder="Enter Your City"/>
                            </div>
                            <div className='mt-5'>
                            <input type="text" onChange={(e)=>setstreet(e.target.value)} className="form-control text-center m-auto" id="address" placeholder="Enter Your Street/Landmark"/>
                            </div>
                        </div>
                    </div>
                    <div className='col-12'>
                    <button type="submit" onClick={fun_step2} className="btn btn-primary m-auto">Continue</button>
                    </div>
                    </div>
                    
                    {/*---------------------------------------------------------------------------------- */}
                    
                    <div className='row m-0 w-100 step2 d-none'>
                    <div className=' col-lg-6 col-md-6 col-12'>
                        <div className="form-group ">
                            <h5 className='mt-2'>Doctor's Fullname :</h5>
                            <input onChange={(e)=>setdocName(e.target.value)} type="Doctor's Fullname" className="form-control text-center m-auto"  aria-describedby="emailHelp" placeholder="Enter Name"/>
                        </div>
                        <div className="form-group ">
                            <h5 className='mt-2'>Description :</h5>
                            <textarea onChange={(e)=>setdiscription(e.target.value)} type="text" className="form-control text-center m-auto description_box" id="exampleInputPassword1" placeholder="Write a brief description about your clinic"/>
                        </div>
                    </div>

                    <div className=' col-lg-6 col-md-6 col-12'>
                        <div className="form-group ">

                        <label for="appt"><span className='font-weight-bold'>Opening time:</span></label>
                        <input onChange={(e)=>{setOtime(e.target.value)}} type="time" id="appt" name="appt"/>
                        <label className='ml-5' for="appt"><span className='font-weight-bold'>Closing time:</span></label>
                        <input onChange={(e)=>{setCtime(e.target.value)}} type="time" id="appt" name="appt"/>
                            <h5 className='mt-2 text-left ml-5'>Slots Duration : <small>(mins)</small> </h5>
                            <div className='ml-5'>
                            <div className={classes.root}>
                                <Typography id="range-slider" gutterBottom>
                                </Typography>
                                <Slider
                                    value={value}
                                    onChange={handleChange}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    getAriaValueText={valuetext}
                                />
                                </div>
                            </div>
                        </div>
                        <div className="form-group ">
                            <h5 className='mt-2 text-left ml-5'>Upload profile Image :</h5>
                            <input type='file' accept="image/*" onChange={e=>{
                                if(e.target.files[0]!=undefined){
                                setClinicimage(e.target.files[0])
                                setpreviewClinic(URL.createObjectURL(e.target.files[0]))
                                showoption1()
                                    }
                                else{
                                    setClinicimage('')
                                    $('.option1').addClass('d-none')
                                    setpreviewClinic('')
                                }
                                }
                            }></input>
                            <img className='profilepic' height='100px' width='100px' src={previewClinic} alt='preview'></img><br/>
                            <div>
                                <span onClick={(e)=>UploadImg2(e)} className='confirmtick option1 d-none'>confirm <AiFillCheckCircle className='tick1 d-none' /></span>
                                
                            </div>
                        </div>
                        <div className="form-group ">
                            <h5 className='mt-2 text-left ml-5'>Upload clinic Image :</h5>
                            <input type='file' accept="image/*" onChange={e=>{
                                if(e.target.files[0]!=undefined){
                                setimage(e.target.files[0])

                                setpreviewProfile(URL.createObjectURL(e.target.files[0]))
                                showoption2()
                                    }
                                else{
                                    setimage('')
                                    $('.option2').addClass('d-none')
                                    setpreviewProfile('')
                                }
                                }
                            }></input>
                            <img className='profilepic' height='100px' width='100px' src={previewProfile} alt='preview'></img><br/>
                            <div>
                                <span onClick={(e)=>UploadImg(e)} className='confirmtick option2 d-none'>confirm <AiFillCheckCircle className='tick2 d-none'/></span>
                                
                            </div>
                        </div>
                    </div>
                    <div className='col-12 p-3'>
                    <button onClick={fun_step1} type="submit" className="btn btn-light m-2">Previous</button>
                    <button onClick={fun_step3} type="submit" className="btn btn-primary m-2">Continue</button>
                    </div>
                    </div>
                    
                    {/* -------------------------------------------------------------------------------- */}
                    
                    <div className='row m-0 w-100 step3 d-none'>
                        <div className='col-lg-8 col-12 features_box2 m-auto'>
                        <div className='col-12 m-auto TypeHead'>
                            <ReactSearchAutocomplete
                                items={Items2}
                                onSearch={handleOnSearch}
                                onSelect={handleOnSelect}
                                onFocus={handleOnFocus}
                                autoFocus
                                formatResult={formatResult}
                                placeholder='Search Features'
                            />
                        </div>
                        <div className='col-12 mt-4 lists'>
                            <h5>Selected Features</h5>
                            {selected_Feat.map((i)=>{return(
                            <div className='m-auto col-lg-6 col-10 float-left'> 
                                <p className='suggestion_name3'>
                                {i.name}<p className='delete2 float-right mr-3' onClick={()=>{deleteSym(i.id,i.name)}}> X</p>
                                </p>
                            </div>)})}

                        </div>
                        </div>
                        <div className='col-lg-4 col-12 features_box m-auto'>
                            <h5 className='mt-2 mb-4 font-weight-bold'>Features Selection : </h5>
                            <div className='row m-0'>
                                <div className='col-12 m-auto lists'>
                                    {Items2.map((i)=>{return(
                                    <div className='m-auto col-lg-12 col-md-6 col-12 float-left'> 
                                        <p onClick={()=>{FL_Item(i.id,i.name)}} className={'suggestion_name2 ' + 'disease_id'+(i.id)}>
                                        {i.name}
                                        </p>
                                    </div>)})}

                                </div>
                            
                            </div>
                        </div>

                        <div className='col-12 p-3'>
                            <button onClick={fun_step2} type="submit" className="btn btn-light m-2">Previous</button>
                            <button onClick={register_clinic} type="submit" className="btn btn-success m-2">Register</button>
                        </div>
                    </div>
                    <div className='success_msg d-none'>
                    <p className='text-danger'><strong>User Registered!.</strong> <span className='text-success'>Login to continue</span></p>
                    </div>
                    <div className='failure_msg d-none'>
                    <p className='text-danger'><strong>User already registered!.</strong> <span className='text-success'>Use different email continue</span></p>
                    </div>
                </form>

             </div>
            </div>
        </div>
        <div className='footer fixed'>
            <Foot/>
        </div>
        </>
    )
}

export default Register;