import React,{useState} from "react";
import axios from "axios";
//import './branch.css';


 export default function Addbranch(){
     const [ Branch_Name, SetBranch_Name] = useState("");
     const [Branch_RegNo, SetBranch_RegNo,] = useState("");
     const [Contact_Number, SetContact_Number] = useState("");
     const [ Address, SetAddress] = useState("");
     const [Holidays,SetHolidays] = useState("");
     const [ Open_Close_Status, SetOpen_Close_Status] = useState("");
     const [Description, SetDescription] = useState("");
     const [ E_mail, SetE_mail] = useState("");

    function sendData(e){
        e.preventDefault()

        const Addbranch = {
            Branch_Name,
            Branch_RegNo,
            Contact_Number,
            Address,
            Holidays,
            Open_Close_Status,
            Description,
            E_mail
        }
        
        axios.post("http://localhost:5000/branch/addbrn", Addbranch).then(()=>{
            alert("branch added")
        }).catch((err)=>{
            alert(err)

        })
    }



    return(

        <div className = "container">
          <br></br>
          <br></br>
          <br></br>
            <h1><center> <b>Branch Details</b></center></h1>
          <br></br>
          <br></br>
            <form onSubmit={sendData}>
  <div class="mb-3">
    <label for="Branch_Name" class="form-label"> Branch_Name </label>
    <input required type="string" class="form-control" id="Branch_Name" onChange ={(e)=>{

        SetBranch_Name(e.target.value);
    }} ></input>
   
  </div>

  <div class="mb-3">
    <label for=" Branch_RegNo" class="form-label"> Branch_RegNo</label>
    <input required type="string" class="form-control" id=" Branch_RegNo" onChange ={(e)=>{

    SetBranch_RegNo(e.target.value);
}}></input>
  </div>
  
  <div class="mb-3">
    <label for="Contact_Number" class="form-label">Contact_Number</label>
    <input required type="string" class="form-control" id="Contact_Number" onChange ={(e)=>{

    SetContact_Number(e.target.value);
}}></input>
  </div>

  <div class="mb-3">
    <label for="Address" class="form-label">Address</label>
    <input required type="string" class="form-control" id="Address" onChange ={(e)=>{

    SetAddress(e.target.value);
}}></input>
  </div>

  <div class="mb-3">
    <label for="Holidays" class="form-label">Holidays</label>
    <input required type="string" class="form-control" id="Holidays" onChange ={(e)=>{

    SetHolidays(e.target.value);
}}></input>
  </div>

  

  <div class="mb-3">
    <label for=" Open_Close_Status" class="form-label"> Open_Close_Status</label>
    <input required type="string" class="form-control" id=" Open_Close_Status" onChange ={(e)=>{

    SetOpen_Close_Status(e.target.value);
}}></input>
  </div>
  
  <div class="mb-3">
    <label for="Description" class="form-label">Description</label>
    <input required type="string" class="form-control" id=" Description" onChange ={(e)=>{

    SetDescription(e.target.value);
}}></input>
  </div>
  
  <div class="mb-3">
    <label for=" E_mail" class="form-label">E_mail</label>
    <input required type="string" class="form-control" id=" E_mail" onChange ={(e)=>{

    SetE_mail(e.target.value);
}}></input>
  </div>
  

  <button type="submit" class="btn btn-primary">Add Branch  </button>
</form>


    
     
        </div>
    )
}