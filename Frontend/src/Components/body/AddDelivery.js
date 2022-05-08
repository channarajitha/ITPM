import React,{useState} from "react";
import axios from "axios";
import swal from 'sweetalert';
//import './delivery.css';
//import './AddDelivery.css';

 
 

export default function Addsupplier(){
    const [delivery_id, Setdelivery_id] = useState("");
    const [customer_name, Setcustomer_name] = useState("");
    const [customer_location, Setcustomer_location] = useState("");
    const [customer_phone_number, Setcustomer_phone_number] = useState("");
    const [branch_id, Setbranch_id] = useState("");
    const [delivery_date, Setdelivery_date] = useState("");
    const [order_status, Setorder_status] = useState("");

    function sendData(e){
      swal({
        title: "Success!",
        text: "Delivery item Successfully Added",
        icon: "success",
        button: "Ok",
      });
        e.preventDefault()

        const newDelivery = {
          delivery_id ,
          customer_name,
          customer_location,
          customer_phone_number,
          branch_id,
          delivery_date ,
          order_status
        }
        
        axios.post("http://localhost:5000/delivery/adddel", newDelivery).then(()=>{
            alert("delivery added")
        }).catch((err)=>{
            alert(err)

        })
    }



    return(

        <div className = "container">
          <br></br>
          <br></br>
          <br></br>
            <h1><center> DELIVERY DETAILS</center></h1>
          <br></br>
          <br></br>
            <form onSubmit={sendData}>
  <div class="mb-3">
    <label for="delivery_id" class="form-label"> Delivery ID </label>
    <input type="string" class="form-control" id="delivery_id" onChange ={(e)=>{

        Setdelivery_id(e.target.value);
    }} ></input>
   
  </div>
  <div class="mb-3">
    <label for="customer_name" class="form-label">Customer Name</label>
    <input type="string" class="form-control" id="customer_name" onChange ={(e)=>{

    Setcustomer_name(e.target.value);
}}></input>
  </div>
  
  <div class="mb-3">
    <label for=" customer_location" class="form-label">Customer Location</label>
    <input type="string" class="form-control" id=" customer_location" onChange ={(e)=>{

Setcustomer_location(e.target.value);
}}></input>
  </div>

  
  <div class="mb-3">
    <label for=" customer_phone_number" class="form-label">Customer Phone Number</label>
    <input type="string" class="form-control" id=" customer_phone_number" onChange ={(e)=>{

Setcustomer_phone_number(e.target.value);
}}></input>
  </div>

  <div class="mb-3">
    <label for="branch_id" class="form-label">Branch ID</label>
    <input type="string" class="form-control" id="branch_id" onChange ={(e)=>{

Setbranch_id(e.target.value);
}}></input>
  </div>

  <div class="mb-3">
    <label for="delivery_date" class="form-label">Delivery Date</label>
    <input type="string" class="form-control" id="delivery_date" onChange ={(e)=>{

Setdelivery_date(e.target.value);
}}></input>
  </div>

  <div class="mb-3">
    <label for="order_status" class="form-label">Order StatusS</label>
    <input type="string" class="form-control" id="order_status" onChange ={(e)=>{

Setorder_status(e.target.value);
}}></input>
  </div>


  <button type="submit" class="btn btn-primary">Add Delivery  </button>
</form>
     
        </div>
    )
}