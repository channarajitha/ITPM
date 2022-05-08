import React,{useState,useEffect} from "react";
import axios from "axios";
//import Header from "./Header";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
//import './Addemployee.css';
 
import swal from 'sweetalert';

export default function AllEmployee(){

    const [employees, setEmployees] = useState([]);
    const [searchTerm, setsearchTerm] = useState("");

    const deleteEmployee=(id) =>{
        axios.delete(`http://localhost:5000/employee/deleteemp/${id}`).then(()=>{
            swal({
                title: "Are you sure?",
                text: "The Employee Will be Deleted from Employee List",
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


    const generatePDF = (data) => {

      const doc = new jsPDF();
      const tableColumn = ["Name", "Employee ID", "Email", "Mobile Number", "Salary", "Address" ];
      const tableRows = [];
      const date = Date().split(" ");
      const dateStr = date[1] + "-" + date[2] + "-" + date[3];

      data.map(d => {
          const empData = [
              d.name,
              d.employeeID,
              d.email,
              d.monum,
              d.salary,
              d.address
          ];
          tableRows.push(empData);
      })
      doc.text("V Star Hardware Pvt Ltd", 70, 8).setFontSize(13);
      doc.text("Employee Detail Report", 14, 16).setFontSize(13);
    
      //right down width height
      //doc.addImage(img, 'JPEG', 170, 8, 25, 25);
      doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY:35});
      doc.save("Employee Details Report.pdf");
    };


    useEffect(() => {
        //fetching all supplier data from the database
        function getEmployees(){
        axios.get("http://localhost:5000/employee/allemp").then((res) => {
            setEmployees(res.data);
            }
        ).catch((err) => {
            alert(err.message);
        })
    }
    getEmployees();
    }, [])

    return (
        <>
        <div class="head">
        <br></br>
          <br></br>
          
   <h3> Employee Management </h3>

    
   </div>
   
   
    
       <div class="lft">
<div class="card1" >
<br></br>
          <br></br>
          <br></br>
          <br></br>
          <input type = "text"
placeholder ="Search..."
className="form-control"
style ={{margintop:50, marginbottom:20, width:"40%"}}
onChange = {(e) =>{
  setsearchTerm(e.target.value);
 
  
}}/>
    
 
<br></br>         
   <table class="table table-bordered">
        <table class="table table-hover" >
         
                   <thead>
                
                       <tr>
              
                           <th>Name</th>
                           <th>Employee ID</th>
                           <th>Email</th>
                           <th>Mobile Number</th>
                           <th>Salary</th>
                           <th>Address</th>
                           <th>Delete</th>
                           <th>Edit</th>

                       </tr>
                   </thead>
                   <tbody>
                    
                      


                      
                       {
                           employees.filter((val) =>{
                            if (setsearchTerm===''){
                              return val;
                            }
                            else if (
                              val.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
                              val.employeeID.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
                              val.monum.toLowerCase().includes(searchTerm.toLocaleLowerCase()) 
                            ){
                              return val;

                            }
                          }).map(function (f) {
                               return <tr>
                                   

                                   <td >{f.name}</td>
                                   <td >{f.employeeID} </td>
                                   <td >{f.email} </td>
                                   <td >{f.monum} </td>
                                   <td >{f.salary}</td>
                                   <td >{f.address}</td>
                                    

                                   <td > <IconButton aria-label="delete"  onClick={() =>deleteEmployee  (f._id)}>
                                       
               
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

              
                <table class="table" width="300px" >
         
                   <thead>
                
                       <tr>
              
                          <th>Employee Count : </th>
                          
                          <th>
                              {                              
                                employees.length
                              }
                          </th>

                       </tr>
                   </thead>
                  
                </table>
                   
              
               
               
</div>
</div>

<div class="buttonn">
       <button type="button" class="btn btn-secondary btn-sm" onClick={() =>{
         generatePDF(employees);
       }}>GenerateReport</button>
   </div>
   

       </>
   
   )








}