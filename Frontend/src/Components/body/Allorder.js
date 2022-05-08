import React,{useState,useEffect} from "react";
import axios from "axios";
//import Header from "./Header";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
//import './Allorder.css';
import {Link} from 'react-router-dom';

import jspdf from 'jspdf'
import "jspdf-autotable"

//import img from '../components/logo.jpg';
 
import swal from 'sweetalert';

export default function Allorder(){

    const [orders, setOrders] = useState([]);
    const [searchTerm, setsearchTerm] = useState("");

    const deleteOrder=(id) =>{
        axios.delete(`http://localhost:5000/order/deleteOrder/${id}`).then(()=>{
            swal({
                title: "Are you sure?",
                text: "The Order Will be Deleted from Order List",
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
        
        })
      }

    useEffect(() =>{
        function getOrder(){
            axios.get("http://localhost:5000/order/allOrder").then((res) => {
                setOrders(res.data);
            
            }).catch((err) => {
                alert(err.massage);
            })
        }
        getOrder();

    }, [])

     // genarate pdf

     const generatePDF = tickets => {

        const doc = new jspdf();
        const tableColumn = ["order ID", "Full Name", "Dilivery Address", "Contact No", "Item Name", "Quantity", "Request Date"];
        const tableRows = [];
        const date = Date().split(" ");
        const dateStr = date[1] + "-" + date[2] + "-" + date[3];

        tickets.map(ticket => {
            const ticketData = [
                ticket._id,
                ticket.name,
                ticket.diliveryaddress,
                ticket.cphone,
                ticket.item_name,
                ticket.item_quantity,
                ticket.req_date,
            ];
            tableRows.push(ticketData);
        })
        doc.text("Order Detail Report", 14, 16).setFontSize(13);
        doc.text(`Report Genarated Date - ${dateStr}`, 14, 23);
        //right down width height
       // doc.addImage(img, 'JPEG', 170, 8, 25, 25);
        doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY:35});
        doc.save("Order Details Report.pdf");
    };

   

    return (
        <>
        <div class="head">
        <br></br>
          <br></br>
          <br></br>
   <h3> Order Management</h3>
   
   
   </div>
   <br></br>
   <div class="buttonn">
       <button type="button" class="btn btn-secondary btn-sm" onClick={() => generatePDF(orders)} >GenerateReport</button> <br></br>
       <button type="text" class="btnq btnq--skew btnq-default"> Order Count : {orders.length} </button>
   </div>
  
<div class="lft">
<br></br>
<br></br>
<div class="card1" >
<input type ="text" placeholder="search.." className="form-control" style={{margintop:50, marginbottom:50, width:"40%"}}
    onChange ={(e) => {
        setsearchTerm(e.target.value);
    }} />
   <br></br>
   
   <table class="table table-bordered">
        <table class="table table-hover" >
                   <thead>
                       <tr>
                           <th>Order ID</th>
                           <th>Full Name</th>
                           <th>Dilivery Address</th>
                           <th>Contact No</th>
                           <th>Item Name</th>
                           <th>Quantity</th>
                           <th>Request Date</th>
                           <th>Delete</th>
                           <th>Edit</th>

                       </tr>
                   </thead>
                   <tbody>
                       {
                            orders.filter(val=>{
                                if (searchTerm === ''){
                                    return val;
                                } else if(
                                    val.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    val.diliveryaddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    val.req_date.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    val.cphone.toLowerCase().includes(searchTerm.toLowerCase())
                                    
                                ){
                                    return val;
                                }
                            }).map(function (f) {
                               return <tr>
                                   

                                   <td >{f._id}</td>
                                   <td >{f.name} </td>
                                   <td >{f.diliveryaddress} </td>
                                   <td >{f.cphone} </td>
                                   <td >{f.item_name} </td>
                                   <td >{f.item_quantity} </td>
                                   <td >{f.req_date} </td>
                                    

                                   <td > <IconButton aria-label="delete"  onClick={() => deleteOrder(f._id)}>
                                       
               
         <DeleteIcon fontSize="small" />
       </IconButton></td>

       <td > <IconButton aria-label="delete"  >
                                       
               
                                       <EditIcon fontSize="small" />
                                     </IconButton></td>

                               </tr>

                           })
                       }
                   </tbody>
                   </table>
               </table>
               <div><button><Link to="/addOrder" className="nav-link">Place a new order</Link></button></div>
</div>
</div>

       </>
   
   )

}