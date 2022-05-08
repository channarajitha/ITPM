import React,{Component, useState} from "react";
import axios from "axios";
//import './returnstock.css';
import swal from "sweetalert";

 
 

export default function Addreturnstock(){
  const [customer_name, Setcustomer_name] = useState("");
  const [customer_id, Setcustomer_id] = useState("");
  const [item_name, Setitem_name] = useState("");
  const [quantity, Setquantity] = useState("");
  const [item_code, Setitem_code] = useState("");
  const [ return_reason, Setreturn_reason] = useState("");
  const [date_of_purchase, Setdate_of_purchase] = useState("");
  const [fileName, SetFileName] = useState("");
 

   const  onChangeFile =e =>{
     SetFileName(e.target.files[0]);
   }
  
    function sendData(e){
      swal({
        title: "Are you sure?",
        text: "Return Item Succesfully Added",
        icon: "success",
        buttons: "ok",
       
      });

        e.preventDefault();

        const formData = new FormData();
        formData.append("customer_name",customer_name);
        formData.append("customer_id",customer_id);
        formData.append("item_name", item_name);
        formData.append("quantity",quantity);
        formData.append("item_code",item_code);
        formData.append("return_reason",return_reason);
        formData.append("date_of_purchase",date_of_purchase);
        formData.append("item_image",fileName);

        const newReturnstock = {
          customer_name,
          customer_id,
          item_name,
          quantity,
          item_code,
          return_reason,
          date_of_purchase,
          date_of_purchase,
          
       
        }
        
        axios.post("http://localhost:5000/returnstock/addret", formData).then(()=>{
            alert("Retun item added")
        }).catch((err)=>{
            alert(err)

        })
    }

    
    
  
    return(

      

        <div className = "container">
          <br></br>
          <br></br>
          <br></br>
            <h1><center>RETURN STOCK DETAILS</center></h1>
          <br></br>
          <br></br>
        
            <form onSubmit={sendData} encType='multipart/form-data'>
              <fieldset>
            <h2><center>CUSTOMER DETAILS</center></h2>
            <div class="mb-3">
<label for="customer_name" class="form-label">Customer Name</label>
<input type="string" class="form-control" id="customer_name" onChange ={(e)=>{

Setcustomer_name(e.target.value);
}}></input>
 
</div>  <br></br> <br></br>

            <div class="mb-3">
    <label for="customer_id" class="form-label">Customer Id</label>
    <input type="string" class="form-control" id="customer_id" onChange ={(e)=>{

    Setcustomer_id(e.target.value);
}}></input>
  </div>
  
 
 
 
  
  </fieldset>
    
     </form>   

  <h2><center>RETURN ITEM DETAILS</center></h2>
  <form onSubmit={sendData}> 
<fieldset>
  <div class="mb-3">
    <label for="item_name" class="form-label">Item Name</label>
    <input type="string" class="form-control" id="item_name" onChange ={(e)=>{

Setitem_name(e.target.value);
}}></input>
  </div>

  <div class="mb-3">
    <label for=" quantity" class="form-label">Quantity</label>
    <input type="number" class="form-control" id=" quantity" onChange ={(e)=>{

Setquantity(e.target.value);
}}></input>
  </div>

  <div class="mb-3">
    <label for="item_code" class="form-label">Item Code</label>
    <input type="string" class="form-control" id="item_code" onChange ={(e)=>{

Setitem_code(e.target.value);
}}></input>
  </div>

  <div class="mb-3">
    <label for=" return_reason" class="form-label">Return Reason</label>
    <input type="string" class="form-control" id=" return_reason" onChange ={(e)=>{

Setreturn_reason(e.target.value);
}}></input>
  </div>

  <div class="mb-3">
    <label for="date_of_purchase" class="form-label">Date of Purchase</label>
    <input type="string" class="form-control" id="date_of_purchase" onChange ={(e)=>{

Setdate_of_purchase(e.target.value);
}}></input>
  </div>

  <div class="mb-3">
    <label for="file" class="form-label">Add Return Item Image </label>
    <input type="file" filename="item_image" className="form-control-file
  <br></br>"
    onChange={onChangeFile}
    />
    </div>      
  <br></br>
  <br></br>
  <br></br>
<center><button type="submit"  class="btn btn-primary">SAVE</button></center>

</fieldset>
</form>


     
        </div>
    )
}