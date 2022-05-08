import React,{useState,useEffect} from "react";
import axios from "axios";
//import Header from "./Header";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
//import './Allbranch.css';
import jspdf from 'jspdf'
import "jspdf-autotable"

 
import swal from 'sweetalert';

export default function Allbranch(){
  const [searchTerm,setsearchTerm] = useState("");

    const [branches, setbranches] = useState([]);

    const deletebranch=(id) =>{
        axios.delete(`http://localhost:5000/branch/deletebrn/${id}`).then(()=>{
            swal({
                title: "Are you sure?",
                text: "The Item Will be Deleted from Branch List",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                  swal("The Branch has been deleted!", 
                    "success",
                  );  setTimeout(function(){
                    window.location.reload();
                   },1000);
                } else {
                  swal("File Is Not Deleted");
                }
              });
         ;
        })
      }



    useEffect(() => {
        //fetching all  data from the database
        function getbranch(){
        axios.get("http://localhost:5000/branch/allbrn").then((res) => {
            setbranches(res.data);
            }
        ).catch((err) => {
            alert(err.message);
        })
    }
    getbranch();
    }, [])
    //Genarating PDF
    const generatePDF = tickets => {

      const doc = new jspdf();
      const tableColumn = ["Branch_Name", "Branch_RegNo", "Contact_Number", "Address","Holidays", "Open_Close_Status", "Description", "E_mail" ];
      const tableRows = [];
      const date = Date().split(" ");
      const dateStr = date[1] + "-" + date[2] + "-" + date[3];

      tickets.map(ticket => {
          const ticketData = [
              ticket.Branch_Name,
              ticket.Branch_RegNo,
              ticket.Contact_Number,
              ticket.Address,
              ticket.Holidays,
              ticket.Open_Close_Status,
              ticket.Description,
              ticket.E_mail,
               
          ];
          tableRows.push(ticketData);
      })
      doc.text("V Star Hardware Pvt Ltd", 70, 8).setFontSize(13);
      doc.text("Branch Detail Report", 14, 16).setFontSize(13);
      doc.text(`Report Genarated Date - ${dateStr}`, 14, 23);
      //right down width height
      //doc.addImage(img, 'JPEG', 170, 8, 25, 25);
      doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY:35});
      doc.save("Branch Details Report.pdf");
  };

    return (
        <>
         <div class="head">
        <br></br>
          <br></br>

          
   <h2> Branch Details Management</h2>
    
   </div>
   
   <div class="buttonn">
   <button type="button" class="btn btn-secondary btn-sm" onClick={() => generatePDF(branches)} >GenerateReport</button>
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
          <br></br>
      
   <table class="table table-bordered">
        <table class="table table-striped table-hover">
         
                   <thead class="table-dark">
                
                       <tr>
              
                           <th >Branch_Name</th>
                           <th>Branch_RegNo</th>
                           <th>Contact_Number</th>
                           <th>Address</th>
                           <th>Holidays</th>
                           <th>Open_Close_Status</th>
                           <th>Description</th>
                           <th>E_mail </th>
                           <th>action</th>
                           <th></th>

                       </tr>
                      
                   </thead>
                   <tbody>
                   {
branches.filter(val=>{
    if(searchTerm === ''){
        return val;
    }else if(
        val. Branch_Name.toLowerCase().includes(searchTerm.toLowerCase()) 
         
         

    ){
        return val;
    }
    }).map(function (f) {
                               return <tr>
                                   
                                   

                                   <td >{f.Branch_Name}</td>
                                   <td >{f.Branch_RegNo} </td>
                                   <td >{f.Contact_Number} </td>
                                   <td >{f.Address} </td>
                                   <td >{f.Holidays}</td>
                                   <td >{f.Open_Close_Status}</td>
                                   <td >{f.Description}</td>
                                   <td >{f.E_mail }</td>
                                    

                                   <td > <IconButton  aria-label="delete"  onClick={() =>deletebranch(f._id)}>
                                       
               
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
</div>
</div>

       </>
   
   )


}