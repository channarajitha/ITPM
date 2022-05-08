import React,{useState,useEffect} from "react";
import axios from "axios";
//import Header from "./Header";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import './Addpandemic.css';
import {Link} from 'react-router-dom';
import jspdf from 'jspdf'
import "jspdf-autotable"
import { Button } from "react-bootstrap";
 
import swal from 'sweetalert';

export default function AllPandemic(){

    const [pandemic,setPandemics] = useState([]);
    const [searchTerm, setsearchTerm] = useState("");


    const deletePandemic=(id) =>{
        axios.delete(`http://localhost:3000/pandemic/delete/${id}`).then(()=>{
            swal({
                title: "Are you sure?",
                text: "The Details Will be Deleted from Item List",
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
        
        function getPandemics(){
        axios.get("http://localhost:5000/pandemic/all").then((res) => {
            setPandemics(res.data);
            }
        ).catch((err) => {
            alert(err.message);
        })
    }
    getPandemics();
    }, [])
// genarate pdf

const generatePDF = tickets => {

    const doc = new jspdf();
    const tableColumn = ["Pandemic Type", "Pandemic Name", "Area", "Date", "Status","Description","Metron","Sister","Nursing Officers", ];
    const tableRows = [];
    const date = Date().split(" ");
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];

    tickets.map(ticket => {
        const ticketData = [
            ticket.pandemictype,
            ticket.pandemicname,
            ticket. area,
            ticket.date,
            ticket.status,
            ticket.description,
            ticket.metron,
            ticket.sister,
            ticket.nursingofficers,
             
        ];
        tableRows.push(ticketData);
    })
    doc.text("Health Care Center", 70, 8).setFontSize(13);
    <br></br>
    doc.text("Pandemic Deatils Report", 14, 16).setFontSize(13);
    doc.text(`Report Genarated Date - ${dateStr}`, 14, 23);
    //right down width height
    //doc.addImage(img, 'JPEG', 170, 8, 25, 25);
    doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY:35});
    doc.save("Pandemic Deatils Report.pdf");
};
    return (
        <>
     
   <div class="buttonn">
   <button type="button" class="btn btn-secondary btn-sm" onClick={() => generatePDF(pandemic)} >Pandemic Deatils Report</button>
   <br></br>
  
   </div>
       <div class="lft">
<div class="card" >
<br></br>
   <br></br>
   <div class="head">
               
               <h3> PANDEMIC % STAFF MANAGEMENT</h3>
               
               </div>
               
   <br></br>
   <br></br>
   
<input type="text" placeholder="Search.." className="form-control" style={{margintop:50,marginbottom:20,width:"50%"}}
      onChange = {(e) => {
          setsearchTerm(e.target.value);
      }}/>
   <br></br>
   <div>  <button type="text" class="btnq btnq--skew btnq-default"><Link to="/add" className="nav-link">Add Pandemic Details</Link></button></div>
   <br></br>
   
   <button type="text" class="btnq btnq--skew btnq-default">  Pandemics Count : {pandemic.length} </button>
   
   <table class="table table-bordered">
        <table class="table table-hover" >
            
                   <thead>
                       
                       <tr>
                           <th >Pandemic Type</th>
                           <th>Pandemic Name</th>
                           <th>Area</th>
                           <th>Date</th>
                           <th>Status</th>
                           <th>Description</th>
                           <th>Metron</th>
                           <th>Sister</th>
                           <th>Nursing Officers</th>
                           <th>Delete</th>
                           <th>Edit</th>

                       </tr>
                   </thead>
                   <tbody>
                   {
                         pandemic.filter(val=>{
                            if(searchTerm === ''){
                                return val;
                            }else if(
                                val.pandemictype.toLowerCase().includes(searchTerm.toLowerCase()) 
                                    
                                    

                               ){
                                   return val;
                               }
                               }).map(function (f) {
                               return <tr>
                                   

                                   <td >{f. pandemictype}</td>
                                   <td >{f.pandemicname} </td>
                                   <td >{f.area} </td>
                                   <td >{f.date} </td>
                                   <td >{f. status} </td>
                                   <td >{f. description} </td>
                                   <td >{f.metron} </td>
                                   <td >{f. sister} </td>
                                   <td >{f. nursingofficers} </td>
                                    

                                   <td > <IconButton aria-label="delete"  onClick={() =>deletePandemic  (f._id)}>
                                       
               
         <DeleteIcon fontSize="small" />
       </IconButton></td>

       <td >

       <button className="button-edit"><Link to={"/edit/"+ f._id} className="nav-link">Edit</Link></button>



       </td>

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