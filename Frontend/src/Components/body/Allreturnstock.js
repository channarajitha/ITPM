import React,{useState,useEffect} from "react";
import axios from "axios";
//import './Addreturnstock.css';
import jspdf from 'jspdf'
import "jspdf-autotable"
import {Link} from 'react-router-dom';
 
import swal from 'sweetalert';

export default function AllReturnstock(){

    const [returnstocks, setReturnstock] = useState([]);
    const [searchTerm, setsearchTerm] = useState("");

    const deleteReturnstock=(id) =>{
        axios.delete(`http://localhost:3000/returnstock/deleteret/${id}`).then(()=>{
            swal({
                title: "Are you sure?",
                text: "The Item Will be Deleted from RETURN STOCK List",
                icon: "warning",
                buttons: true,
                dangerMode: "true"
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


    useEffect(() => {
        //fetching all return item data from the database
        function getReturnstocks(){
        axios.get("http://localhost:3000/returnstock/allret").then((res) => {
            setReturnstock(res.data);
            }
        ).catch((err) => {
            alert(err.message);
        })
    }
    getReturnstocks();
    }, [])

     // genarate pdf

     const generatePDF = tickets => {

        const doc = new jspdf();
        const tableColumn = ["Customer name", "Customer id","Item name" ,"Quantity","Item code","Return reason","Date Of Purchase ","Item Image"];
        const tableRows = [];
        const date = Date().split(" ");
        const dateStr = date[1] + "-" + date[2] + "-" + date[3];

        tickets.map(ticket => {
            const ticketData = [
                ticket.customer_name,
                ticket.customer_id,
                ticket.item_name,
                ticket.quantity,
                ticket.item_code,
                ticket.return_reason,
                ticket.date_of_purchase,
                ticket.item_image
                
                 
            ];
            tableRows.push(ticketData);
        })
        doc.text("V Star Hardware Pvt Ltd", 70, 8).setFontSize(13);
        doc.text("Retun item Detail Report", 14, 16).setFontSize(13);
        doc.text(`Report Genarated Date - ${dateStr}`, 14, 23);
        //right down width height
        //doc.addImage(img, 'JPEG', 170, 8, 25, 25);
        doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY:35});
        doc.save("Return item Details Report.pdf");
    };


    return (
        <>
      <div class="head">
        <br></br>
          <br></br>
          
   <h2> RETURN STOCK MANAGEMENT</h2>
    
   </div>
   <br></br>
   <br></br>

   <div class="buttonn">
       <button type="button" class="btn btn-secondary btn-sm" onClick={() => generatePDF(returnstocks)} >GenerateReport</button>
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

          <div>  <button><Link to="/addret" className="btn btn-danger" >Add Another Return Item Detail</Link></button> </div>
   <br></br>
   <br></br>
  
         
            
          <br></br>
           
     <table class="table table-bordered">
        <table class="table table-hover" >
     
                   <thead>
                
                       <tr>
              
                           <th> Customer name  </th>
                           <th>Customer id     </th>
                            <th>Item name       </th>
                            <th>Quantity        </th>
                            <th>Item code       </th>
                            <th>Return reason   </th>
                            <th>Date of purchase </th>
                            <th> Item Image </th>
                            <th>Delete         </th>
                            

                       </tr>
                   </thead>
                   <tbody>
                       {
 returnstocks.filter(val=>{
    if(searchTerm === ''){
        return val;
    }else if(
        val.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) 
         
         

    ){
        return val;
    }
    }).map(function (f) {
                               return <tr>
                                   

                                   <td >{f.customer_name}</td>
                                   <td >{f.customer_id}</td>
                                   <td>{f.item_name}</td>
                                   <td>{f.quantity}</td>
                                   <td>{f.item_code}</td>
                                   <td>{f.return_reason}</td>
                                   <td>{f.date_of_purchase}</td>
                                   <td>{f.item_image}</td>
                                   
                                   



                                   <td > <button className="btn btn-danger" onClick={() =>{deleteReturnstock(f._id)}}>Delete</button>
                                       
               
         </td>

        

    
                                       
                                  
                               </tr>

                           })
                       }
                   </tbody>
                   </table>
               </table>
              

</div>

      </div> </>
   
   )








}