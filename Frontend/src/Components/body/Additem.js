import React,{useState} from "react";
import axios from "axios";
import swal from 'sweetalert';
//import './item.css';
 

export default function Additem(){
    const [itemcode, Setitemcode] = useState("");
    const [productname, Setproductname] = useState("");
    const [ quantity, Setquantity] = useState("");
    const [unitprice, Setunitprice] = useState("");
    const [description, Setdescription] = useState("");

    function sendData(e){
      swal({
        title: "Scuccess!",
        text:"Item Sccessfully Added",
        icon:"success",
        button:"OK",

      });
        e.preventDefault()

        const newItem = {
          itemcode,
          productname,
          quantity,
          unitprice,
          description
        }
        
        axios.post("http://localhost:5000/item/add", newItem).then(()=>{
            //alert("item added")
        }).catch((err)=>{
            alert(err)

        })
    }



    return(
        
       
        <div className = "container">
          
            <h1><center>  ADD ITEM</center></h1>
          <br></br>
          <br></br>
            <form onSubmit={sendData}>
  <div class="mb-3">
    <label for="itemcode" class="form-label"> Item Code </label>
    <input type="string"   class="form-control" id="itemcode" onChange ={(e)=>{

        Setitemcode(e.target.value);
    }} ></input>
   
  </div>
  <div class="mb-3">
    <label for="productname" class="form-label">Product Name</label>
    <input type="string"  class="form-control" id="productname" onChange ={(e)=>{

    Setproductname(e.target.value);
}}></input>
  </div>
  
  <div class="mb-3">
    <label for=" quantity" class="form-label">Quantity</label>
    <input type="string"  class="form-control" id=" quantity" onChange ={(e)=>{

Setquantity(e.target.value);
}}></input>
  </div>

  <div class="mb-3">
    <label for="unitprice" class="form-label">Unit Price</label>
    <input type="string"  class="form-control" id="unitprice" onChange ={(e)=>{

Setunitprice(e.target.value);
}}></input>
  </div>

  <div class="mb-3">
    <label for="description" class="form-label">Description</label>
    <input type="string"  class="form-control" id="description" onChange ={(e)=>{

Setdescription(e.target.value);
}}></input>
  </div>

  <button type="submit" class="btn btn-primary">Add Item  </button>
</form>
     
        </div>

        
    )
}