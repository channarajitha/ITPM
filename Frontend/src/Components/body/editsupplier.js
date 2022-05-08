import React, { useState,useEffect } from "react"
import { useParams } from "react-router";
import axios from "axios";
import swal from 'sweetalert';



export default function EditForm() {
    const { id } = useParams();

    const[supplierID, setsupplierID] = useState("");
    const[suppliername, setsuppliername] = useState("");
    const[address, setaddress] = useState("");
    const[itemcode, setitemcode] = useState("");
    
   

    useEffect(() => {
      async function getData(){
            const result = await axios.get(`http://localhost:5000/supplier/getsup/${id}`)

            let BillData = result.data.supplier
            if ( BillData) {
                setsupplierID( BillData.supplierID);
                setsuppliername( BillData.suppliername);
                setaddress( BillData.address);
                setitemcode( BillData.itemcode);
                
            } else {
                
            }
        }
        getData()
    }, [])

    
    function sendData(e) {
        e.preventDefault();

        const newSupplier = {
            supplierID,
            suppliername,
            address,
            itemcode
        }
        axios.put(`http://localhost:5000/supplier/update/${id}`, newSupplier).then(() => {
            alert("Supplier Updated")
            swal({
                title: "Success!",
                text: "Supplier Updated Successfully",
                icon: "success",
                button: "Ok",
              });
            window.location = "/allsup"

        }).catch((err) => {
            console.log(err.message)
            alert(err)
        })

    }

return (

    <div className = "container">
    <br></br>
    <br></br>
    <br></br>
      <h1><center>Update Supplier Registration</center></h1>
    <br></br>
    <br></br>
      <form onSubmit={sendData}>
<div class="mb-3">
<label for="supplierID" class="form-label"> Supplier ID </label>
<input required type="string" class="form-control" id="supplierID"value={supplierID} onChange ={(e)=>{
 
  setsupplierID(e.target.value);
}} ></input>

</div>
<div class="mb-3">
<label for="suppliername" class="form-label">Supplier Name</label>
<input required type="string" class="form-control" id="suppliername"value={suppliername} onChange ={(e)=>{

setsuppliername(e.target.value);
}}></input>
</div>

<div class="mb-3">
<label for="address" class="form-label">Supplier Address</label>
<input required type="string" class="form-control" id="address" value={address} onChange ={(e)=>{

setaddress(e.target.value);
}}></input>
</div>

<div class="mb-3">
<label for="itemcode" class="form-label">Item Code</label>
<input required type="string" class="form-control" id="itemcode" value={itemcode} onChange ={(e)=>{

setitemcode(e.target.value);
}}></input>
</div>

<div className='button'>
             <button type="update" class="btn btn-primary" onClick={(e)=>{sendData(e)}}>Update</button>
             </div>
</form>

  </div>
)
}