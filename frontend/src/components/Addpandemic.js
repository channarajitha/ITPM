import React,{useState} from "react";
import axios from "axios";
import swal from 'sweetalert';
import './pandemic.css';
 

export default function Addpandemic(){
    const [pandemictype, Setpandemictype] = useState("");
    const [pandemicname, Setpandemicname] = useState("");
    const [ area, Setarea] = useState("");
    const [date, Setdate] = useState("");
    const [status, Setstatus] = useState("");
    const [description, Setdescription] = useState("");
    const [metron, Setmetron] = useState("");
    const [sister, Setsister] = useState("");
    const [nursingofficers, Setnursingofficers] = useState("");

    function sendData(e){
      swal({
        title: "Scuccess!",
        text:"Pandemic Details Sccessfully Added",
        icon:"success",
        button:"OK",

      });
        e.preventDefault()

        const newPandemic = {
          pandemictype,
          pandemicname,
          area,
          date,
          status,
          description,
          metron,
          sister,
          nursingofficers
        }
        
        axios.post("http://localhost:3000/pandemic/add", newPandemic).then(()=>{
          
        }).catch((err)=>{
            alert(err)

        })
    }



    return(
        
       
        <div className = "container">
          
            <h1><center> Create Pandemic Details</center></h1>
          <br></br>
          <br></br>
            <form onSubmit={sendData}>
  <div class="mb-3">
    <label for=" pandemictype" class="form-label"> Pandemic Type</label>
    <input type="string"   class="form-control" id=" pandemictype" required onChange ={(e)=>{

        Setpandemictype(e.target.value);
    }} ></input>
   
  </div>
  <div class="mb-3">
    <label for="pandemicname" class="form-label">Pandemic Name</label>
    <input type="string"  class="form-control" id="pandemicname" required onChange ={(e)=>{

    Setpandemicname(e.target.value);
}}></input>
  </div>
  
  <div class="mb-3">
    <label for=" area" class="form-label">Area</label>
    <input type="string"  class="form-control" id=" area" required onChange ={(e)=>{

Setarea(e.target.value);
}}></input>
  </div>

  <div class="mb-3">
    <label for="date" class="form-label">Date</label>
    <input type="date"  class="form-control" id="date" required  onChange ={(e)=>{

Setdate(e.target.value);
}}></input>
  </div>

  <div class="mb-3">
    <label for="status" class="form-label">Status</label>
    <input type="string"  class="form-control" id="status" required  onChange ={(e)=>{

Setstatus(e.target.value);
}}></input>
  </div>

  <div class="mb-3">
    <label for="description" class="form-label">Description</label>
    <input type="string"  class="form-control" id="description" required onChange ={(e)=>{

Setdescription(e.target.value);
}}></input>
  </div>

  <div class="mb-3">
    <label for=" metron" class="form-label">Metron</label>
    <input type="string"  class="form-control" id=" metron" required  onChange ={(e)=>{

Setmetron(e.target.value);
}}></input>
  </div>

  <div class="mb-3">
    <label for="sister" class="form-label">Sister</label>
    <input type="string"  class="form-control" id="sister" required  onChange ={(e)=>{

Setsister(e.target.value);
}}></input>
  </div>


  <div class="mb-3">
    <label for="nursingofficers" class="form-label">Nursing Officers</label>
    <input type="string"  class="form-control" id="nursingofficers"  required onChange ={(e)=>{

Setnursingofficers(e.target.value);
}}></input>
  </div>

  

  <button type="submit" class="btn btn-primary">Add Pandemic Details  </button>
</form>
     
        </div>

        
    )
}