
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';

import {BrowserRouter as Router, Route} from 'react-router-dom'
//import Home from './components/home/Home'


 import Allpandemic from './components/Allpandemic';
 import Addpandemic from './components/Addpandemic';
 import cusview from './components/customerview';


 
 
 import editpandemic from './components/editpandemic';

function App() {
  return (
    
    <Router>
   <div>
     <Nav/>
     <Header/>
     
    

     <Route path = "/add" exact component={Addpandemic}/>
     <Route path = "/all" exact component={Allpandemic}/>
     <Route path = "/cus" exact component={cusview}/>
     <Route path = "/edit/:id" exact component={editpandemic}/>
      
   </div>
   </Router>
  );
}

export default App;
