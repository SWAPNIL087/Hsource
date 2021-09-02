import React, { useEffect } from 'react'
import Parallax1 from './Parallax1'
import stetescope from '../Utils/Stetescope.png'
import p from '../Utils/letterP.png';
import c from '../Utils/letterC.png';
import Graphs from '../Utils/Graphs.png'
import SvgLogo from './svgLogo';
import Foot from './Foot';

const HomeCard1 = ()=>{
    return(
        <>
        <div className='row m-0 mt-3'>
        <div data-aos='zoom-in' className='card1 col-12 m-auto'>
            <div className='col-lg-6 col-12 mt-5'>
                <h5 className='float-left ml-4 mt-4'>Features.</h5><br/>
                <h4 className='mt-5'>Recommends doctors/clinic based on symptoms.</h4>
            </div>
            <div className='row m-0'>
                <div  className='col-lg-6 col-md-6 col-12 bulb'>
                    <div><img data-aos='zoom-in' data-aos-delay="500" src={stetescope} height='400px' width='450px'></img></div>
                </div>
                <div className='parallax col-lg-6 col-md-6 col-12 mt-5'>
                    <Parallax1 
                    desc1='Predicts disease according to the symptoms entered with accuracy of more than 90%.recommends nearby clinic accordingly !'
                    desc2='User friendly design to allow users enter symptoms and quickly predicts accurate disease using machine 
                        learning algorithm trained on huge dataset.'
                    img={p}
                    />
                </div>

                <div className='col-lg-6 col-md-6 col-12 bulb'>
                    <div><SvgLogo/></div>
                </div>
                <div className='parallax col-lg-6 col-md-6 col-12 mt-5'>
                    <Parallax1 
                    desc1='Clinic appointment management improves by 65%'
                    desc2='Automatic manages all slots available/booked by patient and improves availability.'
                    img={c}
                    />
                </div>

                <div  className='col-lg-6 col-md-6 col-12 bulb'>
                    <div><img className='graph' data-aos='zoom-in' data-aos-delay="500" src={Graphs} height='300px' width='350px'></img></div>
                </div>
                <div className='parallax col-lg-6 col-md-6 col-12 mt-5'>
                    <Parallax1 
                    desc1='Analysis of daily patients through Graphs'
                    desc2='Provides graphical analysis of everyday and weekly data of patients bookings/missing.'
                    img={c}
                    />
                </div>

            </div>
            
            <Foot/>
        </div>
        </div>
        </>
    )
}

export default HomeCard1;