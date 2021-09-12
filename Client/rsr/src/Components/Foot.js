import React from 'react'
import {FiGithub} from 'react-icons/fi'
import {FaFacebookF} from 'react-icons/fa'
import {FaInstagram} from 'react-icons/fa'
import {FaLinkedinIn} from 'react-icons/fa'

const Foot = ()=>{
    return(
        <>
        <div className='col-10 m-auto pt-2 pb-5 mb-0 tem_foot text-left'>
            <div className='row m-0'>
                <div className='col-lg-6 col-12'>
                    <p>Need some help?</p>
                    <h1 class='sampleEmail'>Sample@gmail.com</h1>
                </div>
                <div className='col-lg-6  col-12'>
                <p>Lets Connect!</p>
                <div className='d-flex'>
                <a href='https://github.com/SWAPNIL087' className='icons'><FiGithub/></a>
                <a href='https://www.linkedin.com/in/swapnil-tiwari-7269a11b5/' className='icons'><FaLinkedinIn/></a>
                <a href='' className='icons'><FaFacebookF/></a>
                <a href='' className='icons'><FaInstagram/></a>
                </div>

                
                </div>
            </div>
            <hr class="new1"></hr>
            <div className='row m-0 w-50'>
                <div className='col-lg-6 col-md-6 col-12'>
                    <h5>ABOUT US</h5>
                    <p>About us</p>
                    <p>Resources</p>
                    <p>Contact us</p>
                    <p>GDPR</p>
                </div>
                <div className='col-lg-6 col-md-6 col-12'>
                    <h5>Resources</h5>
                    <p>News & Events</p>
                    <p>Library</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default Foot