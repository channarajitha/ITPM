import React from 'react'
import AppointmentCard from './AppointmentCard';
import './AppointmentCard.css';

export default function Appointment() {
    return (
        <>
        <div className='card-group-1'>
            <AppointmentCard   title='Make Appointment' text={"Don't Make a Wish\nMake an\nAppointment"} />
            <AppointmentCard   title='Booking History' text={"Once You've Opened it,\nYou've Opened up\nyour mind"}  />
            <AppointmentCard   title='Treatment history' text={"Medicines cure diseases,\nbut only Doctors can\ncure Patients"}     />
        </div>
        <div className='card-group-2'>
            <AppointmentCard    title='Manage Booking' text={"Nothing is worse than\nmissing an\nOppurtunity"}  />
            <AppointmentCard   title='Appointment Feedback' text={"There is always space for improvement\nno matter how long\nit takes"}  />
        </div>
        </>
    )
}
