import React,{useState} from "react";
import axios from "axios";
import swal from 'sweetalert';
import './item.css';
 

export default function Addleave(){
  const [NurseID, SetNurseID] = useState("");
  const [LeaveType, SetLeaveType] = useState("");
  const [Reason, SetReason] = useState("");
  const [ Description, SetDescription] = useState("");
  const [ Date, SetDate] = useState("");
  const [Time, SetTime] = useState("");


    function sendData(e){
      swal({
        title: "Scuccess!",
        text:"Product Sccessfully Added",
        icon:"success",
        button:"OK",

      });
        e.preventDefault()

        const newLeave = {
          NurseID,
          LeaveType,
          Reason,
          Description,
          Date,
          Time,

      
        }
        
        axios.post("http://localhost:5000/leave/add", newLeave).then(()=>{
            //alert("item added")
        }).catch((err)=>{
            alert(err)

        })
    }



    return(
        
       
        <div className = "container">
          
            <h1><center>  Request a Leave</center></h1>
          <br></br>
          <br></br>
            <form onSubmit={sendData}>
  <div class="mb-3">
    <label for="NurseID" class="form-label"> Nurse ID  </label>
    <input type="string"   class="form-control" id="NurseID" required onChange ={(e)=>{

        SetNurseID(e.target.value);
    }} ></input>
   
  </div>
  <div class="mb-3">
    <label for="LeaveType" class="form-label">Leave Type</label>
    <input type="string"  class="form-control" id="LeaveType" required onChange ={(e)=>{

    SetLeaveType(e.target.value);
}}></input>
  </div>
  
  <div class="mb-3">
    <label for=" Reason" class="form-label">Reason</label>
    <input type="string"  class="form-control" id=" Reason" required onChange ={(e)=>{

SetReason(e.target.value);
}}></input>
  </div>

  <div class="mb-3">
    <label for=" Description" class="form-label">Description</label>
    <input type="string"  class="form-control" id=" Description" required onChange ={(e)=>{

SetDescription(e.target.value);
}}></input>
  </div>

  <div class="mb-3">
    <label for=" Date" class="form-label">Date</label>
    <input type="string"  class="form-control" id=" Date" required onChange ={(e)=>{

SetDate(e.target.value);
}}></input>
  </div>

  <div class="mb-3">
    <label for=" Time" class="form-label">Time</label>
    <input type="string"  class="form-control" id=" Time" required onChange ={(e)=>{

SetTime(e.target.value);
}}></input>
  </div>

   

  <button type="submit" class="btn btn-primary">Submit  </button>
</form>
     
        </div>

        
    )
}