import React, { useEffect, useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import {Items} from '../Utils/data';
import axios from 'axios';
import Foot from './Foot';
import { NavLink, useHistory } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import $ from 'jquery'

const Symptoms = ()=>{
    let history = useHistory()
    const [symp,setsymp] = useState([])
    const [count,setcount] = useState(0)
    const [loading,setloading] = useState(true)
    const[city,setcity] = useState()
    const[Items2,setItems2] = useState([])

    useEffect(async()=>{
        const res = await axios.get('/users/List_of_Clinics',{
            Headers:{'content-Type':'application/json'},
        })
        var arr = []
        for (var i =0;i<res.data.length;i++){
            arr.push({"id":i,"name":res.data[i].city})
        }
        setItems2(arr)
        $('.modal_click').click()
    },[])

    const deleteSym = (id,name)=>{
        for(var i=0;i<symp.length;i++){
            if(symp[i].id==id){
                symp.splice(i,1)
            }
        }
        setsymp(symp=>[...symp,])
        setcount(count-1)
    }

    const addSymSugg = (id,name)=>{
        setsymp(symp => [...symp,{id:id,name:name}])
        setcount(count+1)
    }
    const handleOnSearch = (string, results) => {
    //console.log(string, results)
    }

    const handleOnSelect = (item) => {
    setsymp(symp => [...symp,item])
    setcount(count+1)
    }
    const handleOnSearch2 = (string, results) => {
        //console.log(string, results)
        }
    
    const handleOnSelect2 = (item) => {
        setcity(item.name)
        console.log(item)
        }

    const handleOnFocus = () => {
    //console.log('Focused')
    }

    const formatResult = (item) => {
    return (<p className='Typeahead' dangerouslySetInnerHTML={{__html: '<strong>'+item+'</strong>'}}></p>);
    }

    const SearchDisease = async()=>{
    console.log(symp);
    if(symp.length<3){
        alert('enter atleast 3 symptoms!')
    }
    else if(city==undefined){
        alert('please select city!')
    }
    else{
        setloading(false)
        
        const res = await axios.post('/api/wml/score',{
        Headers:{'content-Type':'application/json'},
        json:true,
        body:symp
    })

    
    console.log(res.data,'>>>>>>>>>')

    history.push({
        pathname: '/Clinic_Recommends',
        state: {disease:res.data,city:city},
      });
    }}

    return(
        <>
            
                {
                    loading ? 
            <div className='mt-0'>
            <div className='float-left'>
            <p class="modal_click ml-5 text-danger modal_filter_disease" data-toggle="modal" data-target="#exampleModal3">
            Select city
            </p>
            </div>
            <div class="modal fade" id="exampleModal3" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Filter with disease</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body disease_modal">
                    <form className='col-lg-6 col-md-8 m-auto TypeHead'>
                        <ReactSearchAutocomplete
                            items={Items2}
                            onSearch={handleOnSearch2}
                            onSelect={handleOnSelect2}
                            onFocus={handleOnFocus}
                            autoFocus
                            formatResult={formatResult}
                            placeholder='Search City'
                        />
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Done</button>
                </div>
                </div>
            </div>
            </div>

            
            <div className='row mt-5 m-0'>
            
            <form className='col-lg-6 col-md-8 m-auto TypeHead'>
                <ReactSearchAutocomplete
                    items={Items}
                    onSearch={handleOnSearch}
                    onSelect={handleOnSelect}
                    onFocus={handleOnFocus}
                    autoFocus
                    formatResult={formatResult}
                    placeholder='Search Symptoms'
                />
            </form>
            </div>
   
            
            <p>Your entered symptoms: <strong className='text-danger'>{count}</strong> </p>
            <div className='row col-10 m-auto listSugg'>
                
                {symp.map((i)=>{return(
                    <div className='m-auto col-lg-3 col-sm-6 col-xs-10 float-left'> 
                        <p className='symptoms_name'>
                        {i.name}<p className='delete float-right mr-3' onClick={()=>{deleteSym(i.id,i.name)}}> X</p> 
                        </p>
                    </div>)})}
                    
            </div>
            <button className='btn btn-primary' onClick={SearchDisease}>Proceed</button>
            <div className='row m-0'>
                <div className='col-10 m-auto'>
                    <h4 className='mt-4 common_sym mb-4'>Some common symptoms :</h4>
                    {Items.slice(0,20).map((i)=>{return(
                    <div className='m-auto col-lg-3 col-sm-6 col-xs-10 float-left'> 
                        <p className='suggestion_name'>
                        {i.name}<p className='delete float-right mr-3' onClick={()=>{addSymSugg(i.id,i.name)}}> <span className='add_btn'>add</span></p> 
                        </p>
                    </div>)})}
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

export default Symptoms