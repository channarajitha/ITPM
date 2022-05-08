import React from 'react'
import './home.css'
import AppointmentCard from './AppointmentCard';
 
import img1 from '../../../assets/p5.jpeg';
import img2 from '../../../assets/p6.jpeg';
import img3 from '../../../assets/p7.jpeg';
import img4 from '../../../assets/p8.jpeg';
function Home() {
    return (
        <div className="home_page">
            <h2></h2>
            
            <div className='card-group-1'>
            <AppointmentCard imgURL={img1}  title='Nurses' text={"Don't be late\nPlace a Order\nWhat you want"} URLpath={"/addOrder"}/>
            <AppointmentCard   imgURL={img2}  title='Medicine' text={"Once You've Opened it,\nYou've Opened up\nyour mind"} URLpath={"/cus"}/>
            <AppointmentCard imgURL={img3}  title='Future Panedemic' text={"Medicines cure diseases,\nbut only Doctors can\ncure Patients"} />
            <AppointmentCard imgURL={img4} title='Hospiital' text={"Medicines cure diseases,\nbut only Doctors can\ncure Patients"} />
            </div>
        </div>
    )
}

export default Home
