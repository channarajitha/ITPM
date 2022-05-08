import React,{useState,useEffect} from "react";
import axios from "axios";
//import Header from "./Header";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import './Additem.css';
import {Link} from 'react-router-dom';
import jspdf from 'jspdf'
import "jspdf-autotable"
import { Button } from "react-bootstrap";
 
import swal from 'sweetalert';

export default function AllLeave(){

    const [leave,setLeave ] = useState([]);
    const [searchTerm, setsearchTerm] = useState("");


    const deleteLeave=(id) =>{
        axios.delete(`http://localhost:5000/leave/delete/${id}`).then(()=>{
            swal({
                title: "Are you sure?",
                text: "The Product Will be Deleted from Product List",
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
        
        function getLeaves(){
        axios.get("http://localhost:5000/leave/all").then((res) => {
            setLeave(res.data);
            }
        ).catch((err) => {
            alert(err.message);
        })
    }
    getLeaves();
    }, [])
// genarate pdf

const generatePDF = tickets => {

    const doc = new jspdf();
    const tableColumn = ["Nurse ID", "Leave Type", "Reason"," Description", "Date","Time", ];
    const tableRows = [];
    const date = Date().split(" ");
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];

    tickets.map(ticket => {
        const ticketData = [
            ticket.NurseID,
            ticket.LeaveType,
            ticket.Reason,
            ticket.Description,
            ticket.Date,
            ticket.Time,
        ];
        tableRows.push(ticketData);
    })
    doc.text("Health Care", 70, 8).setFontSize(13);
    doc.text("Leaving Report", 14, 16).setFontSize(13);
    doc.text(`Report Genarated Date - ${dateStr}`, 14, 23);
    //right down width height
    //doc.addImage(img, 'JPEG', 170, 8, 25, 25);
    doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY:35});
    doc.save("Leaving List Report.pdf");
};
    return (
        <>
     
   <div class="buttonn">
   <button type="button" class="btn btn-secondary btn-sm" onClick={() => generatePDF(leave)} >Genarate Report</button>
   <br></br>
  
   </div>
       <div class="lft">
<div class="card" >
<br></br>
   <br></br>
   <div class="head">
               
               <h3> Leave Management </h3>
               
               </div>
               
   <br></br>
   <br></br>
   
<input type="text" placeholder="Search.." className="form-control" style={{margintop:50,marginbottom:20,width:"50%"}}
      onChange = {(e) => {
          setsearchTerm(e.target.value);
      }}/>
   <br></br>
   <button type="text" class="btn btn-secondary btn-sm"> Leave Count : {leave.length} </button>
   <br></br>
   <table class="table table-bordered">
        <table class="table table-hover" >
            
                   <thead>
                       
                       <tr>
                           <th >NurseID</th>
                           <th >Leave Type</th>
                           <th> Reason</th>
                           <th >Description</th>
                           <th >Date</th>
                           <th>Time</th>
                           <th>Delete</th>
                           <th>Edit</th>
                       </tr>
                   </thead>
                   <tbody>
                   {
                           leave.filter(val=>{
                               if(searchTerm === ''){
                                   return val;
                               }else if(
                                   val.NurseID.toLowerCase().includes(searchTerm.toLowerCase()) 
                                    
                                    

                               ){
                                   return val;
                               }
                               }).map(function (f) {
                               return <tr>
                                   

                                   <td >{f.NurseID}</td>
                                   <td >{f.LeaveType} </td>
                                   <td >{f.Reason} </td>
                                   <td >{f.Description} </td>
                                   <td >{f.Date} </td>
                                   <td >{f.Time} </td>

                                   <td > <IconButton aria-label="delete"  onClick={() =>deleteLeave  (f._id)}>
                                       
               
         <DeleteIcon fontSize="small" />
       </IconButton></td>

       <td >

       <button className="button-edit"><Link to={"/edit/"+ f._id} className="nav-link">edit</Link></button>



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