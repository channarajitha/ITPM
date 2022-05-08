//import React,{useState,useEffect} from "react";

import swal from 'sweetalert';
import './item.css';
import React, { Component } from 'react';
import axios from 'axios';




 

export default class EditLeave extends Component {
    constructor(props) {
        super(props);

        this.onChangeNurseID = this.onChangeNurseID.bind(this);
        this.onChangeLeaveType = this.onChangeLeaveType.bind(this);
        this.onChangeReason = this.onChangeReason .bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeTime = this.onChangeTime.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            NurseID: '',
            LeaveType: '',
            Reason: '', 
            Description: '',
            Date: '',
            Time: '',
            Leave: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/leave/' + this.props.match.params.id)
            .then(res => {

                console.log(this.props.match.params.id)
                this.setState({
                    NurseID: res.data. NurseID,
                    LeaveType: res.data.LeaveType,
                    Reason: res.data. Reason,
                    Description: res.data.Description,
                    Date: res.data. Date,
                    Time: res.data.Time,


                })
            })
            .catch(function(error) {
                console.log(error);
            })

        axios.get('http://localhost:5000/item/all')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        Leave: response.data.map(Leave => Leave.NurseID),
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    onChangeNurseID(e) {
        this.setState({
            NurseID: e.target.value
        })
    }

    onChangeLeaveType(e) {
        this.setState({
            LeaveType: e.target.value
        })
    }

    onChangeReason(e) {
        this.setState({
            Reason: e.target.value
        })
    }

   

    onChangeDescription(e) {
        this.setState({
            Description: e.target.value
        })
    }

    onChangeDate(e) {
        this.setState({
            Date: e.target.value
        })
    }

    onChangeTime(e) {
        this.setState({
            Time: e.target.value
        })
    }

    

    onSubmit(e) {
        e.preventDefault();

        const Leave = {
            NurseID: this.state. NurseID,
            LeaveType: this.state.LeaveType,
            Reason: this.state. Reason,
            Description: this.state. Description,
            Date: this.state. Date,
            Time: this.state. Time,



        }

        console.log(Leave);

        axios.post('http://localhost:5000/item/update/' + this.props.match.params.id, Leave)
            .then(res => console.log(res.data));
        alert("Edit Successfully")
        window.location = '/all';
    }

    
    render() {
        return (<div className = "container" >
            <h3><center> EDIT ITEM</center> </h3> 
            <br></br>
            <br></br>
            <br></br>
            <form onSubmit = { this.onSubmit }>
            <div class="mb-3">
            <label > Nurse ID: </label> 
             <input type = "text" required className = "form-control" value = { this.state.NurseID } onChange = { this.onChangeNurseID }/>
              </div> 
              <div class="mb-3">
            <label> LeaveType: </label>
             <input type = "text"required className = "form-control"value = { this.state.LeaveType } onChange = { this.onChangeLeaveType}/> 
             </div> 
             <div class="mb-3">
            <label> Reason: </label> 
            <input type = "text"className = "form-control "value = { this.state.Reason }onChange = { this.onChangeReason }/> 
            </div>

            <div class="mb-3">
            <label > Description: </label>
             <input type = "text"className = "form-control"value = { this.state.Description }onChange = { this.onChangeDescription }/>
              </div>

              <div class="mb-3">
            <label >Date: </label>
             <input type = "text"className = "form-control"value = { this.state.Date }onChange = { this.onChangeDate }/>
              </div>

            <div class="mb-3">
            <label > Time: </label>
             <input type = "text"className = "form-control"value = { this.state.Time }onChange = { this.onChangeTime}/>
              </div>
           
              

            <br>


            </br> 



        
            <div className = "form-group">
            <input type = "submit"value = "Create"className = "btn btn-primary"/>
            </div> 
            </form > 
            </div>

        
)
}
}