import React,{useState} from "react";
import axios from "axios";
import swal from 'sweetalert';
//import './Addorder.css';


export default function Addorder(){
    const [name, Setname] = useState("");
    const [diliveryaddress, Setdiliveryaddress] = useState("");
    const [cphone, Setcphone] = useState("");
    const [item_name, Setitem_name] = useState("");
    const [item_quantity, Setitem_quantity] = useState("");
    const [req_date, Setreq_date] = useState("");

    function sendData(e){
      // swal({
      //   title: "Success!",
      //   text: "Order Successfully Added",
      //   icon: "success",
      //   button: "Ok",
      // });
        e.preventDefault()

        const newOrder = {
          name,
          diliveryaddress,
          cphone,
          item_name,
          item_quantity,
          req_date
      
        }
        
        axios.post("http://localhost:5000/order/addOrder",newOrder).then(()=>{
          swal({
            title: "Success!",
            text: "Order Successfully Added",
            icon: "success",
            button: "Ok",
          });  
           // alert("user added")
        }).catch((err)=>{
            alert(err)

        })
    }



    return(
        <div className="container">
          <br></br>
          <br></br>
          <h1><center> Add your Order</center></h1>
          <br></br>

        <form onSubmit={sendData}>
  <div className="mb-3">
    <label for="name" className="form-label">Full Name</label>
    <input required type="string" className="form-control" id="name" onChange={(e)=>{
        Setname(e.target.value)
    }}/>
    
  </div>

  <div className="mb-3">
    <label for="diliveryaddress" className="form-label">Dilivery Address</label>
    <input required type="string" className="form-control" id="diliveryaddress" onChange={(e)=>{
        Setdiliveryaddress(e.target.value)
    }} />
    
  </div>

  <div className="mb-3">
    <label for="cphone" className="form-label">Contact No</label>
    <input required type="string" className="form-control" id="cphone" onChange={(e)=>{
        Setcphone(e.target.value)
    }} />
    
  </div>

  <div className="mb-3">
    <label for="item_name" className="form-label">Item Name</label>
    <input required type="string" className="form-control" id="item_name" onChange={(e)=>{
        Setitem_name(e.target.value)
    }} />
    
  </div>

  <div className="mb-3">
    <label for="item_quantity" className="form-label">Quantity</label>
    <input required type="string" className="form-control" id="item_quantity" onChange={(e)=>{
        Setitem_quantity(e.target.value)
    }} />
    
  </div>

  <div className="mb-3">
    <label for="req_date" className="form-label">Request Date</label>
    <input required type="string" className="form-control" id="req_date" onChange={(e)=>{
        Setreq_date(e.target.value)
    }} />
    
  </div>
  
  <button type="submit" className="btn btn-primary">Confirm</button>
</form>
</div>
    )
}