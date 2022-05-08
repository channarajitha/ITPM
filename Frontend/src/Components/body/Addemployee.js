import React,{useState} from "react";
import axios from "axios";
import swal from 'sweetalert';
//import './employee.css';

 
 

export default function Addemployee(){
    const [name, Setname] = useState("");
    const [employeeID, SetemployeeID] = useState("");
    const [email, Setemail] = useState("");
    const [monum, Setmonum] = useState("");
    const [salary, Setsalary] = useState("");
    const [address, Setaddress] = useState("");

    function sendData(e){
      swal({
        title: "Success!",
        text: "Supplier Successfully Added",
        icon: "success",
        button: "Ok",
      });
   

        e.preventDefault()

        const newEmployee = {
            name,
            employeeID,
            email,
            monum,
            salary,
            address
        }
        
        axios.post("http://localhost:5000/employee/addemp", newEmployee).then(()=>{
            alert("Employee added")
        }).catch((err)=>{
            alert(err)

        })
    }



    return(

        <div className = "container">
          <br></br>
          <br></br>
          <br></br>
            <h1><center> Employee Registration</center></h1>
          <br></br>
          <br></br>
            <form onSubmit={sendData}>
  <div class="mb-3">
    <label for="name" class="form-label"> Name </label>
    <input type="string" class="form-control" id="name" onChange ={(e)=>{

        Setname(e.target.value);
    }} ></input>
   
  </div>
  <div class="mb-3">
    <label for="employeeID" class="form-label">Employee ID</label>
    <input type="string" class="form-control" id="employeeID" onChange ={(e)=>{

    SetemployeeID(e.target.value);
}}></input>
  </div>
  
  <div class="mb-3">
    <label for="email" class="form-label">Email</label>
    <input type="string" class="form-control" id="email" onChange ={(e)=>{

Setemail(e.target.value);
}}></input>
  </div>

  <div class="mb-3">
    <label for="monum" class="form-label">Mobile Number</label>
    <input type="string" class="form-control" id="monum" onChange ={(e)=>{

Setmonum(e.target.value);
}}></input>
</div>

<div class="mb-3">
  <label for="salary" class="form-label">salary</label>
  <input type="string" class="form-control" id="salary" onChange ={(e)=>{

Setsalary(e.target.value);
}}></input>
</div>

<div class="mb-3">
  <label for="address" class="form-label">Address</label>
  <input type="string" class="form-control" id="address" onChange ={(e)=>{

Setaddress(e.target.value);
}}></input>
  </div>

  <button type="submit" class="btn btn-primary" onClick={sendData}>Add Employee  </button>
</form>
     
        </div>
    )
}