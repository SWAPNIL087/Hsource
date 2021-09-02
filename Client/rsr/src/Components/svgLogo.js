import React, { useEffect } from 'react';
import anime from 'animejs';
const SvgLogo =()=>{
    useEffect(()=>{
        anime({
            targets:'#motion path',
            strokeDashoffset:[anime.setDashoffset,0],
            easing:'easeInOutQuad',
            duration:3500,
            direction:'alternate',
            loop:true
        })
    },[])
    return(
        <>
        <svg className='svgL' id='motion' width='350' height='300'>
            <path stroke='red' strokeWidth='5px' fill='none'
            d='M 6 209 L 28 208 L 41 161 L 61 292 L 91 74 L 105 208 L 136 209 L 154 172 L 175 208 L 223 208 A 50 50 0 1 1 247 207 L 246 146 L 246 169 L 213 170 L 274 169 '
            >
            </path>
        </svg>
        </>
    )
}
export default SvgLogo