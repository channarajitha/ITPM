
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
 
 //import Updatesupplier from './components/Updatesupplier';
import {BrowserRouter as Router, Route} from 'react-router-dom'
//import Home from './components/home/Home'
 
 import Allattendance from './components/Allattendance';
 import Addattendance from './components/Addattendance';
 import empview from './components/empview';
  
 import editattendance from './components/editattendance';

function App() {
  return (
    
    <Router>
   <div>
     <Nav/>
     <Header/>
     
      
     <Route path = "/add" exact component={Addattendance}/>
     <Route path = "/empall" exact component={Allattendance}/>
     <Route path = "/cus" exact component={empview}/>
    
     <Route path = "/edit/:id" exact component={editattendance}/>
      
   </div>
   </Router>
  );
}

export default App;
