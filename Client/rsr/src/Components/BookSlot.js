import React from 'react'

const BookSlot = ()=>{
    // add opening time and closing time in db
    // count the average of slot range provided                         slot1                                          
    // accordingly set the total number of slots i.e arr of objects=[
    //[{Pname,mobnumber,email,openSlotTime,closeSlotTime,Booked,available,locked},{} ,   {}]  #day1
    // [{Pname,mobnumber,email,openSlotTime,closeSlotTime,Booked,available,locked},{} ,   {}] #day2
    // [{Pname,mobnumber,email,openSlotTime,closeSlotTime,Booked,available,locked},{} ,   {}] #day3
    // [{Pname,mobnumber,email,openSlotTime,closeSlotTime,Booked,available,locked},{} ,   {}] #day4
    // [{Pname,mobnumber,email,openSlotTime,closeSlotTime,Booked,available,locked},{} ,   {}] #day5
    // [{Pname,mobnumber,email,openSlotTime,closeSlotTime,Booked,available,locked},{} ,   {}] #day6
    // [{Pname,mobnumber,email,openSlotTime,closeSlotTime,Booked,available,locked},{} ,   {}] #day7
    // ]
    //-----------------------------------------------

    // then here we should recieve the following
    // 1) total number of slots
    // 2) opening and closing time
    // 3) average size of the slot

    const totalslots = 15
    const slotsize = 15; // in mins
    const opening = '9:30 a.m'
    const closing = '8:00 p.m'

    const options =[];
    for(var i=0;i<totalslots;i++){
        options.push(
        <div className='mb-3 mt-3 col-lg-3 col-md-6 col-12'>
            <div className='cell p-1'>
            <p className='position-absolute mark'></p>
            <h5 className='mt-3'>Slot-{i+1}</h5>
            <small>{opening}-<strong>to-</strong>{opening}</small>
            </div>
        </div>
        )
    }
    return(
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <h4>Book a slot</h4>
                </div>
                <div className='calender border container m-auto w-75'>
                    <div className='row m-auto w-100'>
                    {options}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookSlot