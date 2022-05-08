import React,{useState,useEffect} from "react";
import axios from "axios";
//import Header from "./Header";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import jspdf from 'jspdf'
import "jspdf-autotable"
//import './Addsupplier.css';
import {Link} from 'react-router-dom';
 
 
//import img from '../components/logo.jpg';
 
import swal from 'sweetalert';

export default function AllSupplier(){

    const [suppliers, setSuppliers] = useState([]);
    const [searchTerm, setsearchTerm] = useState("");

    const deleteSupplier=(id) =>{
        axios.delete(`http://localhost:5000/supplier/deletesup/${id}`).then(()=>{
            swal({
                title: "Are you sure?",
                text: "The Item Will be Deleted from Supplier List",
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
        //fetching all supplier data from the database
        function getSuppliers(){
        axios.get("http://localhost:5000/supplier/allsup").then((res) => {
            setSuppliers(res.data);
            }
        ).catch((err) => {
            alert(err.message);
        })
    }
    getSuppliers();
    }, [])

     // genarate pdf

     const generatePDF = tickets => {

        const doc = new jspdf();
        const tableColumn = ["Supplier ID", "Supplier Name", "Address", "Item code" ];
        const tableRows = [];
        const date = Date().split(" ");
        const dateStr = date[1] + "-" + date[2] + "-" + date[3];

        tickets.map(ticket => {
            const ticketData = [
                ticket.supplierID,
                ticket.suppliername,
                ticket.address,
                ticket.itemcode,
                 
            ];
            tableRows.push(ticketData);
        })
        doc.text("V Star Hardware Pvt Ltd", 70, 8).setFontSize(13);
        doc.text("Supplier Detail Report", 14, 16).setFontSize(13);
        doc.text(`Report Genarated Date - ${dateStr}`, 14, 23);
        //right down width height
        //doc.addImage(img, 'JPEG', 170, 8, 25, 25);
        doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY:35});
        doc.save("Supplier Details Report.pdf");
    };

    return (
        <>
         <div class="head">
        <br></br>
          <br></br>
          <br></br>
   <h3> Supplier Management</h3>
    
   </div>
   <br></br>
          <br></br>
   <div class="buttonn">
   <button type="button" class="btn btn-secondary btn-sm" onClick={() => generatePDF(suppliers)} >GenerateReport</button>
   <br></br>
    
   
   <button type="text" class="btn btn-secondary btn-sm"> Supplier Count : {suppliers.length} </button>
   </div>
    
       <div class="lft">
       <br></br>
       <br></br>
<div class="card1" >
    <input type="text" placeholder="Search.." className="form-control" style={{margintop:50,marginbottom:20,width:"40%"}}
      onChange = {(e) => {
          setsearchTerm(e.target.value);
      }}/>
        
        <br></br>
       <div >  <button><Link to="/addsup" type="button" className="btn btn-secondary btn-sm " >Add Another Supplier</Link></button> </div>
   <br></br>
   <br></br>
   <table class="table table-bordered">
        <table class="table table-hover" >
         
                   <thead>
                
                       <tr>
              
                           <th >Supplier ID</th>
                           <th>Supplier Name</th>
                           <th>Address</th>
                           <th>Item code</th>
                           <th>Delete</th>
                           <th>Edit</th>

                       </tr>
                   </thead>
                   <tbody>
                       {
                           suppliers.filter(val=>{
                               if(searchTerm === ''){
                                   return val;
                               }else if(
                                   val.supplierID.toLowerCase().includes(searchTerm.toLowerCase()) 
                                    
                                    

                               ){
                                   return val;
                               }
                               }).map(function (f) {
                               return <tr>
                                   

                                   <td >{f.supplierID}</td>
                                   <td >{f.suppliername} </td>
                                   <td >{f.address} </td>
                                   <td >{f.itemcode} </td>
                                    

                                   <td > <IconButton aria-label="delete"  onClick={() =>deleteSupplier  (f._id)}>
                                       
               
         <DeleteIcon fontSize="small" />
       </IconButton></td>


            
       <td><a className="btn btn-warning" href={'update/' + (f._id)}>Edit
                                                    <i className="far fa-edit"></i>&nbsp;</a></td>

                                       
                

                               </tr>

                           })
                       }
                   </tbody>
                   </table>
               </table>
              
             

</div>

    </div></>
   
   )








}