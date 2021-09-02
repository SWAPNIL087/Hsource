import React from 'react';
const Parallax1 = (props)=>{
    return(
        <div>
        <div className='position-relative control_img_op'>
            <h5>{props.desc1}</h5>
            <img data-aos='zoom-in' data-aos-delay="500" className='letterP' src={props.img} width='100' height='100'></img>
            <p className='grey'>
                {props.desc2}
            </p>
        </div>
        </div>
    )
}

export default Parallax1