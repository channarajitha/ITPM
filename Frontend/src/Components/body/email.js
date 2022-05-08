import React, { Component,useState } from 'react';
import emailjs from 'emailjs-com';
import swal from 'sweetalert';
//import './create.css';
import axios from "axios";


export default function Email(){
    const [item_name, Setitem_name] = useState("");
    const [qty, Setqty] = useState("");
    const [price, Setprice] = useState("");
    const [user_email, Setuser_email] = useState("");
    const [name, Setname] = useState("");


    


    function sendEmail(e){

        swal({
            title: "Success!",
            text: " Successfully Added",
            icon: "success",
            button: "Ok",
          });
            e.preventDefault()
    
            const newfinance = {
               item_name,
               qty,
               price,
               user_email,
               name
            }
            
            axios.post("http://localhost:5000/finance/send",newfinance).then(()=>{
                alert("User added")
            }).catch((err)=>{
                alert(err)
    
            })

        e.preventDefault();
        emailjs.sendForm('service_928z5bo','template_w9jdy5j',e.target,
        'user_t6DDlIpkwfo3DgVDwDgHy').then(res=>{
            console.log(res);
        }).catch(err=>console.log(err));



    }

    return(

        <dev>
            
              <div className = "container">
              <br></br>
            <br></br>
            <h1>Payment form</h1>
            <form onSubmit={sendEmail}>
            <div className="form-group">
                <lable>Name</lable>
                <input type = 'text'  className="form-control"  name = 'name'onChange={(e)=>{
       Setname(e.target.value)
    }}/>
            </div>

            <div className="form-group">
                <lable>Item Name</lable>
                <input type = 'text'  className="form-control" id="item_name" name = 'item' onChange={(e)=>{
        Setitem_name(e.target.value)
    }}/>
            
            </div>
            <div className="form-group">
                <lable>Quntity</lable>
                <input type = 'text'  className="form-control"  id="qty" name = 'qty'onChange={(e)=>{
        Setqty(e.target.value)
    }}/>
            </div>
                <lable>Price</lable>
                <input type = 'text'  className="form-control" id="price"  name = 'price'onChange={(e)=>{
        Setprice(e.target.value)
    }}/>
            <div className="form-group">
                <lable>Email</lable>
                <input type = 'text'  className="form-control"  name = 'user_email' id="user_email" onChange={(e)=>{
        Setuser_email(e.target.value)
    }}/>
              </div>  
              <div className="form-group">
                <lable>Message</lable>
                <textarea name = 'message'  className="form-control"  rows = '4'/>
                <br></br>
                <input type = 'submit' value='send' className="btn btn-primary"/>
                 <br></br>  <br></br>
             

            </div>



            </form>
            </div>
        </dev>



     );
}

 