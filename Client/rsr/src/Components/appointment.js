import React, {useEffect, useState } from 'react'
import axios from 'axios'
import Foot from './Foot'
import ClipLoader from "react-spinners/ClipLoader";
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { Items2 } from '../Utils/data';
import $ from 'jquery'
import { useHistory } from "react-router-dom";

const Appointment = (props)=>{

    let history = useHistory()

    const[data,setdata] = useState([])
    const [loading,setloading] = useState(true)
    const [Items,setItems] = useState([])
    const [cities,setcities] = useState([])
    const [clinic_city,setcity] = useState('')
    const [disease,setdisease] = useState()

    useEffect(async()=>{
        setloading(false)
        const res = await axios.get('/users/List_of_Clinics',{
            Headers:{'content-Type':'application/json'},
        })
        
        var arr = []
        
        for (var i=0;i<res.data.length;i++){
            arr.push({'id':i,'name':res.data[i].docName})
            console.log(res.data[i].docName)
        }
        
        setItems(arr)
        setloading(true)
        console.log(res.data)
        if(res.data.length ==0){
            $('.info').removeClass('d-none')
        }
        setdata(res.data)
    },[])

    const AllCities_filter = async()=>{
        setloading(false)
        setdisease('')
        const res = await axios.get('/users/List_of_Clinics',{
            Headers:{'content-Type':'application/json'},
        })
        
        var arr = []
        for (var i=0;i<res.data.length;i++){
            arr.push({'id':i,'name':res.data[i].docName})
            console.log(res.data[i].docName)
        }
        
        setItems(arr)
        setloading(true)
        console.log(res.data)
        if(res.data.length ==0){
            $('.info').removeClass('d-none')
        }
        setdata(res.data)
        setcity('All ')

    }

    const city_filter_search = async()=>{
        
        const res = await axios.get('/users/List_of_Clinics',{
            Headers:{'content-Type':'application/json'},
        })
        
        var arr = []
        for (var i=0;i<data.length;i++){
            arr.push({'id':i,'name':data[i].city})
        }
        
        setcities(arr)
    }

    const handleOnSearch = (string, results) => {
        //console.log(string, results)
    }
    
    const handleOnSelect = (item) => {
    // setsymp(symp => [...symp,item])
    // setcount(count+1)
    }

    const handleOnSearch2 = (string, results) => {
        //console.log(string, results)
    }
    
    const handleOnSelect2 = async(item) => {
        console.log(item)

        const res = await axios.get('/users/List_of_Clinics',{
            Headers:{'content-Type':'application/json'},
        })

        var arr = []
        for (var i=0;i<res.data.length;i++){
            if(res.data[i].city==item.name){
            arr.push(res.data[i])}
        }
        if(res.data.length ==0){
            $('.info').removeClass('d-none')
        }
        setdata(arr)
        setcity(item.name)


    }

    const handleOnSelect3 = async(item) => {
        console.log(item)
        var s='for '+item.name
        setdisease(s)
        var container={
            disease:item.name,
            city:clinic_city
        }
        const res = await axios.post('/users/Clinic_with_diseasename',{
            Headers:{'content-Type':'application/json'},
            json:true,
            body:container
        })
        if(res.data.length ==0){
            $('.info').removeClass('d-none')
        }
        setdata(res.data)

    }

    const handleOnFocus = () => {
    //console.log('Focused')
    }

    const formatResult = (item) => {
    return (<p className='Typeahead' dangerouslySetInnerHTML={{__html: '<strong>'+item+'</strong>'}}></p>);
    }
    
    const openclinic = (id,name)=>{
        console.log('clinic clicked',id)
        history.push({
            pathname: '/BookSlot',
            state: {id:id,name:name},
    })
    }   

    return(<>
    {
            loading ?
        <div>

        <div className='row mt-1 m-0'>
            
            <form className='col-lg-6 col-6 m-auto TypeHead'>
                <ReactSearchAutocomplete
                    items={Items}
                    onSearch={handleOnSearch}
                    onSelect={handleOnSelect}
                    onFocus={handleOnFocus}
                    autoFocus
                    formatResult={formatResult}
                    placeholder='Search Clinic'
                />
            </form>
            <div className="dropdown position-absolute ml-5 mt-2">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Sort
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a onClick={AllCities_filter} className="dropdown-item sort">All</a>
                    <a data-toggle="modal" data-target="#exampleModal2" className="dropdown-item sort" className="dropdown-item sort">Disease</a>
                    <a onClick={city_filter_search}  data-toggle="modal" data-target="#exampleModal1" className="dropdown-item sort">City</a>
                    
                </div>
            </div>
            <div className="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Filter with Disease name</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body" style={{minHeight:'75vh'}}>
                    <div className='row m-0'>
                        <form className='col-lg-6 col-md-8 m-auto TypeHead'>
                            <ReactSearchAutocomplete
                                items={Items2}
                                onSearch={handleOnSearch2}
                                onSelect={handleOnSelect3}
                                onFocus={handleOnFocus}
                                autoFocus
                                formatResult={formatResult}
                                placeholder='search disease here'
                            />
                        </form>
                    </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Apply</button>
                    </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Filter with city</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body" style={{minHeight:'50vh'}}>
                    <div className='row m-0'>
                        <form className='col-lg-6 col-md-8 m-auto TypeHead'>
                            <ReactSearchAutocomplete
                                items={cities}
                                onSearch={handleOnSearch2}
                                onSelect={handleOnSelect2}
                                onFocus={handleOnFocus}
                                autoFocus
                                formatResult={formatResult}
                                placeholder='Enter City'
                            />
                        </form>
                    </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Apply</button>
                    </div>
                    </div>
                </div>
            </div>
            </div>

        {/* <h5 className='mt-4'>Recommended clinics for<span className='text-danger'> {disease}</span></h5> */}
        <h5 className='mt-4'><span className='text-danger'>{clinic_city}</span> Clinics <span className='text-danger'>{disease}</span></h5>
        
        <div className='container'>
            <div className='row'>
                    {data.map((i)=>{return(
                    <div key={i._id} onClick={()=>openclinic(i._id,i.docName)} className='col-lg-4 col-md-6 col-12 mt-4 text-left position-relative store'>
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
                    <div className='m-auto d-none info'>
                        <h5>No results found for above filter!</h5>
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

export default Appointment