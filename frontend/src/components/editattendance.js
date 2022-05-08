//import React,{useState,useEffect} from "react";

import swal from 'sweetalert';
import './attendance.css';
import React, { Component } from 'react';
import axios from 'axios';




 

export default class EditAttendance extends Component {
    constructor(props) {
        super(props);

        this.onChangePempid = this.onChangeempid.bind(this);
        this.onChangeempname = this.onChangeempname.bind(this);
        this.onChangedate = this.onChangedate.bind(this);
        this.onChangelogtype = this.onChangelogtype.bind(this);
        this.onChangetime = this.onChangetime.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            empid: '',
            empname: '',
            date: '', 
            logtype: '',
            time: '',
            Attendance: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/attendance/' + this.props.match.params.id)
            .then(res => {

                console.log(this.props.match.params.id)
                this.setState({
                    empid: res.data. empid,
                    empname: res.data.empname,
                    date: res.data.date,
                    logtype: res.data.logtype,
                    time: res.data.time,

                })
            })
            .catch(function(error) {
                console.log(error);
            })

        axios.get('http://localhost:5000/attendance/empall')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        Attendance: response.data.map(Attendance => Attendance.empid),
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    onChangeempid(e) {
        this.setState({
            empid: e.target.value
        })
    }

    onChangeempname(e) {
        this.setState({
            empname: e.target.value
        })
    }

    onChangedate(e) {
        this.setState({
            date: e.target.value
        })
    }

    onChangelogtype(e) {
        this.setState({
            logtype: e.target.value
        })
    }

    onChangetime(e) {
        this.setState({
            time: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const Attendance = {
            empid: this.state.empid,
            empname: this.state.empname,
            date: this.state.date,
            logtype: this.state.logtype,
            time: this.state.time,

        }

        console.log(Attendance);

        axios.post('http://localhost:5000/attendance/update/' + this.props.match.params.id, Attendance)
            .then(res => {
                alert("Updated Successfully")
                window.location = '/empall';
            });
      
    }

    
    render() {
        return (<div className = "container" >
            <br></br>
            <br></br>
            <br></br>
            <form onSubmit = { this.onSubmit }>
            <h3 className='header-edit'><center> Edit Attendance Details</center> </h3> 
            <br></br>  <br></br>
            <br></br>
           
            <div class="mb-3">
            <label > Employee Name: </label> 
            <input type = "text" required className = "form-control" value = { this.state.empname } onChange = { this.onChangeempname }/>
            </div> 


            <div class="mb-3">
            <label> Date: </label>
            <input type = "date" required className = "form-control"value = { this.state.date } onChange = { this.onChangedate}/> 
            </div> 


             <div class="mb-3">
            <label>Log Type: </label> 
        
            <select class = "form-control form0control-sm" required  value = { this.state.logtype }onChange = { this.onChangelogtype}>

            <option value = "TIME IN AM">TIME IN AM</option>

            <option value = "TIME OUT PM">TIME OUT PM</option>

            <option value = "TIME IN PM">TIME IN PM</option>

            <option value = "TIME OUT AM">TIME OUT AM</option>

            </select>
            </div>
           
              <div class="mb-3">
            <label> Time: </label>
             <input type = "time" className = "form-control"value = { this.state.time }onChange = { this.onChangetime }/>
              </div>

            <br>


            </br> 

            <div className = "form-group">
            <input type = "submit" value = "UPDATE" className = "btn btn-primary"/>
            </div> 
            </form > 
            </div>

        
        )
    }
}