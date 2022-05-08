import React,{useState,useEffect} from "react";
import axios from "axios";
//import Header from "./Header";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
//import './Additem.css';
import {Link} from 'react-router-dom';
import jspdf from 'jspdf'
import "jspdf-autotable"
 
import swal from 'sweetalert';

export default function AllItem(){

    const [item,setItems ] = useState([]);
    const [searchTerm, setsearchTerm] = useState("");


    const deleteItem=(id) =>{
        axios.delete(`http://localhost:5000/item/delete/${id}`).then(()=>{
            swal({
                title: "Are you sure?",
                text: "The Item Will be Deleted from Item List",
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
        
        function getItems(){
        axios.get("http://localhost:5000/item/all").then((res) => {
            setItems(res.data);
            }
        ).catch((err) => {
            alert(err.message);
        })
    }
    getItems();
    }, [])
// genarate pdf

const generatePDF = tickets => {

    const doc = new jspdf();
    const tableColumn = ["Item Code", "Product Name", "Quantity", "Unit Price", "Description", ];
    const tableRows = [];
    const date = Date().split(" ");
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];

    tickets.map(ticket => {
        const ticketData = [
            ticket.itemcode,
            ticket.productname,
            ticket.quantity,
            ticket.unitprice,
            ticket.description,
             
        ];
        tableRows.push(ticketData);
    })
    doc.text("V Star Hardware Pvt Ltd", 70, 8).setFontSize(13);
    doc.text("Stock Detail Report", 14, 16).setFontSize(13);
    doc.text(`Report Genarated Date - ${dateStr}`, 14, 23);
    //right down width height
    //doc.addImage(img, 'JPEG', 170, 8, 25, 25);
    doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY:35});
    doc.save("Stock Details Report.pdf");
};
    return (
        <>
     
   <div class="buttonn">
   <button type="button" class="btn btn-secondary btn-sm" onClick={() => generatePDF(item)} >StockReport</button>
   <br></br>
  
   </div>
       <div class="lft">
<div class="card1" >
<br></br>
   <br></br>
   <div class="head">
               
               <h3> ITEMS</h3>
               
               </div>
               
   <br></br>
   <br></br>
   
<input type="text" placeholder="Search.." className="form-control" style={{margintop:50,marginbottom:20,width:"50%"}}
      onChange = {(e) => {
          setsearchTerm(e.target.value);
      }}/>
   <br></br>
  
   <br></br>
   
   <button type="text" class="btnq btnq--skew btnq-default"> Items Count : {item.length} </button>
   
   <table class="table table-bordered">
        <table class="table table-hover" >
            
                   <thead>
                       
                       <tr>
                           <th >Item Code</th>
                           <th>Product Name</th>
                           <th>Quantity</th>
                           <th>Unit Price</th>
                           <th>Description</th>
                          

                       </tr>
                   </thead>
                   <tbody>
                   {
                           item.filter(val=>{
                               if(searchTerm === ''){
                                   return val;
                               }else if(
                                   val.itemcode.toLowerCase().includes(searchTerm.toLowerCase()) 
                                    
                                    

                               ){
                                   return val;
                               }
                               }).map(function (f) {
                               return <tr>
                                   

                                   <td >{f. itemcode}</td>
                                   <td >{f.productname} </td>
                                   <td >{f.quantity} </td>
                                   <td >{f. unitprice} </td>
                                   <td >{f. description} </td>
                                    

                                   

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