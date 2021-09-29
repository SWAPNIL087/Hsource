import React from 'react'
import '../404style.css'
 
const PageNotFound = ()=>{
    return (
        <div className='Body min-vh-100'>
            <h1 className='heading'>404</h1>
            <p className='para'>Oops! Something is wrong.</p>
            <a class="button button_" href="/"><i class="icon-home"></i> Go back in initial page, is better.</a>
        </div>
    )
}

export default PageNotFound