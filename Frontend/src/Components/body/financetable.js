import React,{useState,useEffect} from "react";
import axios from "axios";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
//import './create.css';
import swal from 'sweetalert';
import { Link } from "react-router-dom";
export default function Financetable(){

    const [suppliers, setfinance] = useState([]);
    const[searchTerm,setsearchTerm] = useState ("");

    const deletefinance=(id) =>{
        axios.delete(`http://localhost:5000/finance/delete/${id}`).then(()=>{
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
        function getfinance(){
        axios.get("http://localhost:5000/finance/all").then((res) => {
            setfinance(res.data);
            }
        ).catch((err) => {
            alert(err.message);
        })
    }
    getfinance();
    }, [])




  return (
        <>
        <div class="head">
        <br></br>
          <br></br>
          
   <h3> FINANCE MANAGEMENT</h3>
    
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


        <Link exact to= "/email"> Send Mail </Link>


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
                            
                           <th >Item_Name</th>
                           <th >price</th>
                           <th>Name</th>
                           <th>Email</th>
                           <th>Delete</th>
                        
                       </tr>
                   </thead>
                   <tbody>
                       {  
                       
                       
                      suppliers.filter(val=>{
                          if (searchTerm == ''){
                            return val;
                          } else if (

                            val.item_name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
                            val.price.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
                            val.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
                            val.user_email.toLowerCase().includes(searchTerm.toLocaleLowerCase()) 
                          ){
                              return val;
                          }


                          



                      }).map(function (f) {
                               return <tr>
                                   
                                   <td >{f.item_name}</td>
                                   <td >{f.price}</td>
                                   <td >{f.name} </td>
                                   <td >{f.user_email} </td>
                                
                                
                                    

       <td > <IconButton aria-label="delete"  onClick={() =>deletefinance  (f._id)}>
                                       
      <DeleteIcon fontSize="small" />
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