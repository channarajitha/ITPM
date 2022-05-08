import React,{useState,useEffect} from "react";
import axios from "axios";
//import Header from "./Header";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import jspdf from 'jspdf'
import "jspdf-autotable"
//import './AddDelivery.css';
import './AddDelivery';
import {Link} from 'react-router-dom';
 
import swal from 'sweetalert';

export default function Alldelivery(){

    const [deliveries, setDelivery] = useState([]);
    const [searchTerm, setsearchTerm] = useState("");

    const deleteDelivery=(id) =>{
        axios.delete(`http://localhost:5000/delivery/deletedel/${id}`).then(()=>{
            swal({
                title: "Are you sure?",
                text: "The Item Will be Deleted from Delivery List",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                  swal("The file has been deleted!", 
                    "success",
                  );  setTimeout(function(){
                    window.location.reload();
                   },1000);
                } else {
                  swal("File Is Not Deleted");
                }
              });
        // ;
        })
      }



    useEffect(() => {
        //fetching all delivery data from the database
        function getDelivery(){
        axios.get("http://localhost:5000/delivery/alldel").then((res) => {
            setDelivery(res.data);
            debugger
            }
        ).catch((err) => {
            alert(err.message);
        })
    }
    getDelivery();
    }, [])

// genarate pdf

const generatePDF = tickets => {

    const doc = new jspdf();
    const tableColumn = ["delivery_id" , "customer_name", "customer_location", "customer_phone_number", "branch_id", "delivery_date" , "order_status" ];
    const tableRows = [];
    const date = Date().split(" ");
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];

    tickets.map(ticket => {
        const ticketData = [
            ticket.delivery_id,
            ticket.customer_name,
            ticket.customer_location,
            ticket.customer_phone_number,
            ticket.branch_id,
            ticket.delivery_date,
            ticket.order_status, 
        ];
        tableRows.push(ticketData);
    })
    doc.text("V Star Hardware Pvt Ltd", 70, 8).setFontSize(13);
    doc.text("Delivery Detail Report", 14, 16).setFontSize(13);
    doc.text(`Report Genarated Date - ${dateStr}`, 14, 23);
    //right down width height
    //doc.addImage(img, 'JPEG', 170, 8, 25, 25);
    doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY:35});
    doc.save("Delivery Details Report.pdf");
};

    return (
        <>
        <div class="head">
        <br></br>
          <br></br>
          
   <h3> Delivery Management</h3>
    
   </div>
   
   <div class="buttonn">
       <button type="button" class="btn btn-secondary btn-sm" onClick={() => generatePDF(deliveries)} >GenerateReport</button>
   </div>
    
       <div class="lft">
       <br></br>
<div class="wrap">
<div class="card" >
<div class="search">
<input type="text" placeholder="Search.." className="form-control" style={{margintop:50,marginbottom:20,width:"40%"}}
      onChange = {(e) => {
          setsearchTerm(e.target.value);
      }}/>
      
</div>
</div>
<br></br>

          <br></br>
          <br></br>
          <br></br>
           
   <table class="table table-bordered">
        <table class="table table-hover" >
         
                   <thead>
                
                       <tr>
              
                           <th>Delivery ID</th>
                           <th>Customer Name</th>
                           <th>Customer Location</th>
                           <th>Customer Phone Number</th>
                           <th>Branch ID</th>
                           <th>Delivery Date</th>
                           <th>Order Status</th>
                           <th>Delete</th>
                           <th>Edit</th>

                       </tr>
                   </thead>
                   <tbody>
                   {
deliveries.filter(val=>{
    if(searchTerm === ''){
        return val;
    }else if(
        val.delivery_id.toLowerCase().includes(searchTerm.toLowerCase()) 
         
         

    ){
        return val;
    }
    }).map(function (f) {
                               return <tr>
                                   
                           <td>{f.delivery_id}</td>
                           <td>{f.customer_name}</td>
                           <td>{f.customer_location}</td>
                           <td>{f.customer_phone_number}</td>
                           <td>{f.branch_id}</td>
                           <td>{f.delivery_date}</td>
                           <td>{f.order_status}</td>
                                       
                          
                           <td > <IconButton aria-label="delete"  onClick={() =>deleteDelivery  (f._id)}>
                                       
               
         <DeleteIcon fontSize="small" />
       </IconButton></td>

       <td > <IconButton aria-label="EDIT"  >
                                       
               
                                       <EditIcon fontSize="small" />
                                     </IconButton></td>


                               </tr>

                           })
                       }
                   </tbody>
                   </table>
               </table>
</div>
</div>

       </>
   
   )








}