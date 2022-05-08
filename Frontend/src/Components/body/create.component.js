
import React, { Component } from 'react';
import axios from 'axios';
//import './create.css';
import swal from 'sweetalert';


export default class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangedate = this.onChangedate.bind(this);
    this.onChangeincome = this.onChangeincome.bind(this);
    this.onChangeoutcome = this.onChangeoutcome.bind(this);
    this.onChangetotal = this.onChangetotal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);




    

    this.state = {
         date: '',
        income: '',
        outcome: '',
        total:''
    }
  }


  onChangedate(e) {
    this.setState({
      date: e.target.value
    });
  }


  onChangeincome(e) {
    this.setState({
      income: e.target.value
    });
  }
  onChangeoutcome(e) {
    this.setState({
      outcome: e.target.value
    })  
  }
  onChangetotal(e) {
    this.setState({
     total: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      date: this.state.date,
     income: this.state.income,
      outcome: this.state.outcome,
      total: this.state.total
    };
    axios.post('http://localhost:5000/payment/add', obj)
        .then(res => console.log(res.data));

    swal({
      title : "Sucessfull",
      text: "Details Added",
      icon: "success",
      button : "ok",




    });




    
    this.setState({
      date: '',
     income: '',
      outcome: '',
      total: ''
    })
  }
 
  render() {
    return (
      
      <div className = "container">
         <br></br>
          <br></br>
          <br></br>
        <div style={{ marginTop: 10 }}>
            <h3>Add New Details</h3>
            <form onSubmit={this.onSubmit}>


            <div className="form-group">
                    <label>Date:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.date}
                      onChange={this.onChangedate}
                      />
                    </div>




                <div className="form-group">
                    <label>Income:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.income}
                      onChange={this.onChangeincome}
                      />
                </div>
                <div className="form-group">
                    <label>outcome: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.outcome}
                      onChange={this.onChangeoutcome}
                      />
                </div>
                <div className="form-group">
                    <label>Total Balance: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.total}
                      onChange={this.onChangetotal}
                      />
                </div>
                <div className="form-group">
                   <div><br>
                   
                   </br>
                   </div>

                    <input type="submit" value="Add" className="btn btn-primary"/>
                </div>
            </form>
            </div>
        </div>
    )
  }
}