
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
 
 //import Updatesupplier from './components/Updatesupplier';
import {BrowserRouter as Router, Route} from 'react-router-dom'
//import Home from './components/home/Home'
 
 import Allleave from './components/Allleave';
 import Addleave from './components/Addleave';
 import cusview from './components/customerview';
  
 import editleave from './components/editleave';

function App() {
  return (
    
    <Router>
   <div>
     <Nav/>
     <Header/>
     
      
     <Route path = "/add" exact component={Addleave}/>
     <Route path = "/all" exact component={Allleave}/>
     <Route path = "/cus" exact component={cusview}/>
    
     <Route path = "/edit/:id" exact component={editleave}/>
      
   </div>
   </Router>
  );
}

export default App;
