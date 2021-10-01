import React, { useEffect,useState } from 'react';
import { useHistory } from 'react-router';
import ClipLoader from "react-spinners/ClipLoader";
import {Line,Pie} from 'react-chartjs-2';
import Foot from './Foot';
import { chartColors } from "./Colors";

const Analysis = ()=>{
    // provide route protection..
    const history = useHistory()
    const [loading,setloading] = useState(true)
    const [Graphdata,setGdata] = useState()
    const [pieData,setPdata] = useState()

    const customLoad = async()=>{
        setloading(false)
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
        const Bookings = data.Booking 
        var dic = {}
        var pie_dic={}
        for (var i=0;i<Bookings.length;i++){
            var tem = Bookings[i]
            if(tem.date in dic){
                var x = tem.attented
                if(x=='yes'){
                    dic[tem.date][0] +=1
                }
                else{
                    dic[tem.date][1]+=1
                }
            }
            else{
                var x = tem.attented
                if(x == 'yes'){
                    dic[tem.date] = [1,0]  //attended,skipped
                }
                else{
                    dic[tem.date] = [0,1]
                }
            }
            var y = tem.Disease;

            if (y in pie_dic){
                pie_dic[y]+=1
            }
            else{
                pie_dic[y]=1
            }
            
        }

        var p_label = []
        var p_val = []

        for(var i in pie_dic){
            if(i!='undefined'){
            p_label.push(i);
            p_val.push(pie_dic[i])}
        }

        var container2 = {
            responsive: true,
            labels: p_label,
            datasets: [
                {
                data: p_val,
                backgroundColor: chartColors,
                hoverBackgroundColor: chartColors
                }
            ]
            };



        var label_ = [];
        var data1 = [];
        var data2 = [];
        for(var i in dic){
            label_.push(i)
            data1.push(dic[i][0])
            data2.push(dic[i][1])
        }
        var n = label_.length;
        if(label_.length>30){
            var x = n-30;
            label_.splice(0,x)
        }
        var container={
            labels:label_,
            datasets:[{
                label:"Attended",
                backgroundColor:"blue",
                data:data1
            },
            {
                label:"Skipped",
                backgroundColor:"red",
                data:data2
            }]
        }

        

        setGdata(container)
        setPdata(container2)
        console.log(data)
        setloading(true)
    }
    useEffect(async()=>{
        customLoad();
    },[])
    
    return(
        <>
        <div>
        {loading ?
        <div>
            <strong>Attended VS Skipped</strong>
            <div className='w-75 m-auto'>
                <Line
                    options={{
                        responsive:true,
                    }}
                    data={Graphdata}
                />
            </div>
            
            <div className='col-lg-4 col-md-6 col-8 m-auto PIE'>
            <strong className='m-auto'> Disease with Patients count</strong>
                <Pie
                    options={{
                        responsive:true,
                    }}
                    data={pieData}
                />
            </div>
            <div className='footer fixed'>
                <Foot/>
            </div>
        </div>
        :
        <div  className='Loader'>
            <ClipLoader color={'#16f1cd'} loading={true} size={50}/>
            <p>Loading</p>
        </div>}
        </div>   
        </>
    )
}

export default Analysis