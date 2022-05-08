//import React,{useState,useEffect} from "react";

import swal from 'sweetalert';
import './pandemic.css';
import React, { Component } from 'react';
import axios from 'axios';
 

export default class EditPandemic extends Component {
    constructor(props) {
        super(props);

        this.onChangepandemictype = this.onChangepandemictype.bind(this);
        this.onChangepandemicname = this.onChangepandemicname.bind(this);
        this.onChangearea = this.onChangearea.bind(this);
        this.onChangedate = this.onChangedate.bind(this);
        this.onChangearea = this.onChangearea.bind(this);
        this.onChangestatus = this.onChangestatus.bind(this);
        this.onChangedescription = this.onChangedescription.bind(this);
        this.onChangemetron = this.onChangemetron.bind(this);
        this.onChangesister = this.onChangesister.bind(this);
        this.onChangenursingofficers = this.onChangenursingofficers.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            pandemictype: '',
            pandemicname: '',
            area: '',
            date: '',
            status: '',
            description: '',
            metron: '',
            sister: '',
            nursingofficers: '',
            Pandemic: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/pandemic/get/' + this.props.match.params.id)
            .then(response => {

                console.log(this.props.match.params.id)
                this.setState({
                    pandemictype: response.data.pandemictype,
                    pandemicname: response.data.pandemicname,
                    area: response.data.area,
                    date: response.data.date,
                    status: response.data.status,
                    description: response.data.description,
                    metron: response.data.metron,
                    sister: response.data.sister,
                    nursingofficers: response.data.nursingofficers,

                })
            })
            .catch(function(error) {
                console.log(error);
            })

        axios.get('http://localhost:3000/pandemic/all')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        Pandemic: response.data.map(Pandemic => Pandemic.pandemictype),
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    onChangepandemictype(e) {
        this.setState({
            pandemictype: e.target.value
        })
    }

    onChangepandemicname(e) {
        this.setState({
            pandemicname: e.target.value
        })
    }

    onChangearea(e) {
        this.setState({
            area: e.target.value
        })
    }
    
    onChangedate(e) {
        this.setState({
            date: e.target.value
        })
    }
    
    onChangestatus(e) {
        this.setState({
            status: e.target.value
        })
    }
    
    onChangedescription(e) {
        this.setState({
            description: e.target.value
        })
    }

   

    onChangemetron(e) {
        this.setState({
            metron: e.target.value
        })
    }

    
    onChangesister(e) {
        this.setState({
            sister: e.target.value
        })
    }

    onChangenursingofficers(e) {
        this.setState({
            nursingofficers: e.target.value
        })
    }


    onSubmit(e) {
        e.preventDefault();

        const Pandemic = {
            pandemictype: this.state.pandemictype,
            pandemicname: this.state.pandemicname,
            area: this.state.area,
            date: this.state.date,
            status: this.state.status,
            description: this.state.description,
            metron: this.state.metron,
            sister: this.state.sister,
            nursingofficers: this.state.nursingofficers

        }

        console.log( Pandemic);

        axios.post('http://localhost:3000/pandemic/update/' + this.props.match.params.id, Pandemic)
            .then(res => console.log(res.data));
        alert("Edit Successfully")
        window.location = '/all';
    }

    
    render() {
        return (<div className = "container" >
            <h3><center> Update Pandemic Details</center> </h3> 
            <br></br>
            <br></br>
            <br></br>
            <form onSubmit = { this.onSubmit }>

            <div class="mb-3">
            <label > Pandemic Type: </label> 
             <input type = "text" required className = "form-control" value = { this.state.pandemictype } onChange = { this.onChangepandemictype }/>
              </div> 


              <div class="mb-3">
            <label> Pandemic Name: </label>
             <input type = "text"required className = "form-control" value = { this.state.pandemicname } onChange = { this.onChangepandemicname}/> 
             </div> 


             <div class="mb-3">
            <label> Area: </label> 
            <input type = "text"className = "form-control " value = { this.state.area }onChange = { this.onChangearea }/> 
            </div>


            <div class="mb-3">
            <label> Date: </label> 
            <input type = "text"className = "form-control " value = { this.state.date }onChange = { this.onChangearea }/> 
            </div>

            <div class="mb-3">
            <label > Status: </label>
             <input type = "text"className = "form-control" value = { this.state.status }onChange = { this.onChangestatus }/>
              </div>


              
            <div class="mb-3">
            <label > Description: </label>
             <input type = "text"className = "form-control" value = { this.state.description }onChange = { this.onChangedescription }/>
              </div>
              


            <div class="mb-3">
            <label > Metron: </label>
             <input type = "text"className = "form-control" value = { this.state.metron }onChange = { this.onChangemetron }/>
              </div>

              
            <div class="mb-3">
            <label > Sister: </label>
             <input type = "text"className = "form-control" value = { this.state. sister }onChange = { this.onChangesister }/>
              </div>



            <br>


            </br> 



            <div class="mb-3">
            <label> Nursing Officers: </label> 
             <input type = "text"required className = "form-control" value = { this.state.nursingofficers}onChange = { this.onChangenursingofficers }/> 
             </div>



            <div className = "form-group">
            <input type = "submit"value = "Create"className = "btn btn-primary"/>
            </div> 
            </form > 
            </div>

        
)
}
}