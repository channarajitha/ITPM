import React,{useState} from "react";
import axios from "axios";
import swal from 'sweetalert';
//import './supplier.css';
 

export default function Addsupplier(){
    const [supplierID, SetsupplierID] = useState("");
    const [suppliername, Setsuppliername] = useState("");
    const [address, Setaddress] = useState("");
    const [itemcode, Setitemcode] = useState("");

    function sendData(e){
     
        e.preventDefault()

        const newSupplier = {
            supplierID,
            suppliername,
            address,
            itemcode
        }
        
        axios.post("http://localhost:5000/supplier/addsup", newSupplier).then(()=>{
        swal({
          title: "Success!",
          text: "Supplier Successfully Added",
          icon: "success",
          button: "Ok",
        });
        //

           // alert("supplier added")
        }).catch((err)=>{
            alert(err)

        })
    }



    return(

        <div className = "container">
          <br></br>
          <br></br>
          <br></br>
            <h1><center> Supplier Registration</center></h1>
          <br></br>
          <br></br>
            <form onSubmit={sendData}>
  <div class="mb-3">
    <label for="supplierID" class="form-label"> Supplier ID </label>
    <input required type="string" class="form-control" id="supplierID" onChange ={(e)=>{

        SetsupplierID(e.target.value);
    }} ></input>
   
  </div>
  <div class="mb-3">
    <label for="suppliername" class="form-label">Supplier Name</label>
    <input required type="string" class="form-control" id="suppliername" onChange ={(e)=>{

    Setsuppliername(e.target.value);
}}></input>
  </div>
  
  <div class="mb-3">
    <label for="address" class="form-label">Supplier Address</label>
    <input required type="string" class="form-control" id="address" onChange ={(e)=>{

Setaddress(e.target.value);
}}></input>
  </div>

  <div class="mb-3">
    <label for="itemcode" class="form-label">Item Code</label>
    <input required type="string" class="form-control" id="itemcode" onChange ={(e)=>{

Setitemcode(e.target.value);
}}></input>
  </div>

  <button type="submit" class="btn btn-primary">Add Supplier  </button>
</form>
     
        </div>
    )
}