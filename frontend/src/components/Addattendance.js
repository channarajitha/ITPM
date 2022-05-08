import React,{useState} from "react";
import axios from "axios";
import swal from 'sweetalert';
import './attendance.css';
 

export default function Addattendance(){
    const [empid, Setempid] = useState("");
    const [empname, Setempname] = useState("");
    const [date, Setdate] = useState("");
    const [logtype, Setlogtype] = useState("");
    const [time, Settime] = useState("");

    function sendData(e){
      swal({
        title: "Scuccess!",
        text:"Attendance Details  Added Successfully",
        icon:"success",
        button:"OK",

      });
        e.preventDefault()

        const newAttendance = {
          empid,
          empname,
          date,
          logtype,
          time,
      
        }
        
        axios.post("http://localhost:5000/attendance/add", newAttendance).then(()=>{
            //alert("Details added")
        }).catch((err)=>{
            alert(err)

        })
    }

    return(
              
        <div className = "container">
          <br></br>
          <br></br>
     
          <h3 className="header-add"><center>Add  Attendance  Details</center></h3>
    
          
         
   <form onSubmit={sendData}>
  <div class="mb-3">
    <label for="empid" class="form-label"> Employee ID </label>
    <input type="string" maxLength='5'  placeholder="Employee Reg No (Eg : EID01 ), without space" required class="form-control" id="empid" onChange ={(e)=>{
 
        Setempid(e.target.value);
    }} ></input>
   
  </div>
  <div class="mb-3">
    <label for="empname" class="form-label">Employee Name</label>
    <input type="string" placeholder="Employee Name" required  class="form-control" id="empname" onChange ={(e)=>{

    Setempname(e.target.value);
}}></input>
  </div>
  
  <div class="mb-3">
    <label for=" date" class="form-label">Date</label>
    <input type="date" class="form-control" id=" date" required onChange ={(e)=>{

Setdate(e.target.value);
}}></input>
  </div>


  <div class="mb-3">
    <label for="logtype" class="form-label">Log Type</label>
    <select class = "form-control form0control-sm" required onChange ={(e)=>{

Setlogtype(e.target.value);
}}>


<option value = "TIME IN AM">TIME IN AM</option>

<option value = "TIME OUT PM">TIME OUT PM</option>

<option value = "TIME IN PM">TIME IN PM</option>

<option value = "TIME OUT AM">TIME OUT AM</option>

</select>
</div>
  
  <div class="mb-3">
    <label for="time" class="form-label">Time</label>
    <input type="time"  class="form-control" id="time" required onChange ={(e)=>{

Settime(e.target.value);
}}></input>
  </div>
  
  <button type="submit" class="btn btn-primary"> SUBMIT  ATTENDANCE  DETAILS </button>
  
</form>
             </div>       
    )
}


