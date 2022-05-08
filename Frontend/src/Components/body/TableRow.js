import React,{useState,useEffect} from "react";
import axios from "axios";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
//import './create.css';
import swal from 'sweetalert';
import jspdf from 'jspdf'
import "jspdf-autotable"
import {Link} from 'react-router-dom';

export default function TableRow(){

    const [suppliers, setpayment] = useState([]);
    const[searchTerm,setsearchTerm] = useState ("");

    const deletepayment=(id) =>{
        axios.delete(`http://localhost:5000/payment/delete/${id}`).then(()=>{
            swal({
                title: "Are you sure?",
                text: "The Item Will be Deleted from Finance List",
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
        //fetching all  data from the database
        function getpayment(){
        axios.get("http://localhost:5000/payment").then((res) => {
            setpayment(res.data);
            }
        ).catch((err) => {
            alert(err.message);
        })
    }
    getpayment();
    }, [])

  // genarate pdf

  const generatePDF = tickets => {

    const doc = new jspdf();
    const tableColumn = ["Date", "Income", "Outcome", "Total Balance" ];
    const tableRows = [];
    const date = Date().split(" ");
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];

    tickets.map(ticket => {
        const ticketData = [
            ticket.date,
            ticket.income,
            ticket.outcome,
            ticket.total,
             
        ];
        tableRows.push(ticketData);
    })
    doc.text("V Star Hardware Pvt Ltd", 70, 8).setFontSize(13);
    doc.text("Finance Detail Report", 14, 16).setFontSize(13);
    doc.text(`Report Genarated Date - ${dateStr}`, 14, 23);
    //right down width height
    //doc.addImage(img, 'JPEG', 170, 8, 25, 25);
    doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY:35});
    doc.save("Finance Details Report.pdf");
};









    return (
        <>
        <div class="head">
        <br></br>
          <br></br>
          
   <h3> FINANCE MANAGEMENT</h3>
    
   </div>
  
   <div class="buttonn">
       <button type="button" class="btn btn-secondary btn-sm" onClick={() => generatePDF(suppliers)}>GenerateReport</button>
   </div>
    
       <div class="lft">
<div class="card1" >
<div>
<br></br><br></br>

</div>
<input type = "text" placeholder = "search...." className = "form-control" style = {{margintop:60, marginebotton:20,width:"30%"}}
            onChange = {(e) =>{

                setsearchTerm(e.target.value);

            } }  />

<div>
          <br></br>


        <Link exact to= "/email"> Send Mail </Link><br></br>
        <Link exact to= "/financetable"> Details </Link>


        </div>








<br></br>
          <br></br>
          <br></br>
          <br></br>

          
               <div><br></br></div>
   <table class="table table-bordered">
        <table class="table table-hover" >
         
                   <thead>
                
                       <tr>
                            
                           <th >Date</th>
                           <th >Income(LKR)</th>
                           <th>outcome(LKR)</th>
                           <th>Total Balance(LKR)</th>
                           <th>Delete</th>
                           <th>Edit</th>

                       </tr>
                   </thead>
                   <tbody>
                       {  
                       
                       
                      suppliers.filter(val=>{
                          if (searchTerm == ''){
                            return val;
                          } else if (

                            val.date.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
                            val.income.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
                            val.outcome.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
                            val.total.toLowerCase().includes(searchTerm.toLocaleLowerCase())
                          ){
                              return val;
                          }


                          



                      }).map(function (f) {
                               return <tr>
                                   
                                   <td >{f.date}</td>
                                   <td >{f.income}</td>
                                   <td >{f.outcome} </td>
                                   <td >{f.total} </td>
                                
                                    

       <td > <IconButton aria-label="delete"  onClick={() =>deletepayment  (f._id)}>
                                       
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