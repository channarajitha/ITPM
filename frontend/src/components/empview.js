import React,{useState,useEffect} from "react";
import axios from "axios";
//import Header from "./Header";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import './Addattendance.css';
import {Link} from 'react-router-dom';
import jspdf from 'jspdf'
import "jspdf-autotable"
 
import swal from 'sweetalert';

export default function AllAttendance(){
   
    const [attendance,setAttendances ] = useState([]);
    const [searchTerm, setsearchTerm] = useState("");


    const deleteAttendance=(id) =>{
        axios.delete(`http://localhost:5000/attendance/delete/${id}`).then(()=>{
            swal({
                title: "Are you sure?",
                text: "The Attendance Will be Deleted from Attendance List",
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
        
        function getAttendances(){
        axios.get("http://localhost:5000/attendance/empall").then((res) => {
            setAttendances(res.data);
            }
        ).catch((err) => {
            alert(err.message);
        })
    }
    getAttendances();
    }, [])
// genarate pdf

const generatePDF = tickets => {

    const doc = new jspdf();
    const tableColumn = ["Employee ID", "Employee Name", "Date", "Log Type", "Time"];
    const tableRows = [];
    const date = Date().split(" ");
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];

    tickets.map(ticket => {
        const ticketData = [
            ticket.empid,
            ticket.empname,
            ticket.date,
            ticket.logtype,
            ticket.time
             
        ];
        tableRows.push(ticketData);
    })
    doc.text("Health Care Centre", 70, 8).setFontSize(13);
    doc.text("Attendance Detail Report", 14, 16).setFontSize(13);
    doc.text(`Report Genarated Date - ${dateStr}`, 14, 23);
    //right down width height
    //doc.addImage(img, 'JPEG', 170, 8, 25, 25);
    doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY:35});
    doc.save("Attendance Details Report.pdf");
};
    return (
        <>
     
   <div class="buttonn">
   <button type="button" class="btn btn-secondary btn-sm" onClick={() => generatePDF(attendance)} >ATTENDANCE REPORT</button>
   <br></br>
  
   </div>
       <div class="lft">
<div class="card" >
<br></br>
   <br></br>
   <div class="head">
               
               <h3>ATTENDANCE</h3>   
               </div>
               
   <br></br>
   <br></br>
   
<input type="text" placeholder="Search ID number" className="form-control" style={{margintop:50,marginbottom:20,width:"50%"}}
      onChange = {(e) => {
          setsearchTerm(e.target.value);<br></br>
      }}/>
   <br></br>
   <br></br>
   <br></br>
   <br></br>
   
   <button type="text" class="btnq btnq--skew btnq-default"> Count of Attendances  : {attendance.length} </button>
   
   <table class="table table-bordered">
        <table class="table table-hover" >
            
                   <thead>
                       
                       <tr>
                           <th >Employee ID</th>
                           <th>Employee Name</th>
                           <th>Date</th>
                           <th>Log Type</th>
                           <th>Time</th>
                          

                       </tr>
                   </thead>
                   <tbody><br></br>
                   {
                           attendance.filter(val=>{
                               if(searchTerm === ''){
                                   return val;
                               }else if(
                                   val.empid.toLowerCase().includes(searchTerm.toLowerCase()) 
                                    
                                    

                               ){
                                   return val;
                               }
                               }).map(function (f) {
                               return <tr>
                                   

                                   <td >{f. empid}</td>
                                   <td >{f.empname} </td>
                                   <td >{f.date} </td>
                                   <td >{f. logtype} </td>
                                   <td >{f. time} </td>
                                                                   
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