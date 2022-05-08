import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import ActivationEmail from './auth/ActivationEmail'
import NotFound from '../utils/NotFound/NotFound'

import ForgotPass from '../body/auth/ForgotPassword'
import ResetPass from '../body/auth/ResetPassword'

import Profile from '../body/profile/Profile'
import EditUser from '../body/profile/EditUser'

import Addorder from '../body/Addorder'
import Allorder from '../body/Allorder'

import Alldelivery from '../body/Alldelivery';
 import AddDelivery from '../body/AddDelivery';
 import Allreturnstock from '../body/Allreturnstock';
 import Addreturnstock from '../body/Addreturnstock';
 import Addbranch from '../body/Addbranch';
 import Allbranch from '../body/Allbranch';
 import Allitem from '../body/Allitem';
 import Additem from '../body/Additem';
 import Addemployee from '../body/Addemployee';
 import AllEmployee from '../body/Allemployee';
 import Allsupplier from '../body/Allsupplier';
 import Addsupplier from '../body/Addsupplier';

 import Create from '../body/create.component';
import TableRow from '../body/TableRow';
 import email from '../body/email';
import financetable from'../body/financetable';

import Home from '../body/home/Home'
import EditForm from '../body/editsupplier';

import cusview from '../body/customerview';

import {useSelector} from 'react-redux'

function Body() {
    const auth = useSelector(state => state.auth)
    const {isLogged, isAdmin} = auth
    return (
        <section>
            <Switch>
                <Route path="/" component={Home} exact />

                <Route path="/login" component={isLogged ? NotFound : Login} exact />
                <Route path="/register" component={isLogged ? NotFound : Register} exact />

                <Route path="/forgot_password" component={isLogged ? NotFound : ForgotPass} exact />
                <Route path="/user/reset/:token" component={isLogged ? NotFound : ResetPass} exact />

                <Route path="/user/activate/:activation_token" component={ActivationEmail} exact />

                <Route path="/profile" component={isLogged ? Profile : NotFound} exact />
                <Route path="/edit_user/:id" component={isAdmin ? EditUser : NotFound} exact />

                <Route path ="/addOrder" exact component={Addorder}/>
                <Route path ="/allOrder" exact component={Allorder}/>

                <Route path = "/addsup" exact component={Addsupplier}/>
                 <Route path = "/allsup" exact component={Allsupplier}/>
                     <Route path = "/adddel" exact component={AddDelivery}/>
     <Route path = "/alldel" exact component={Alldelivery}/>
     <Route path = "/addret" exact component={Addreturnstock}/>
     <Route path = "/allret" exact component={Allreturnstock}/>
     <Route path = "/addbrn" exact component={Addbranch}/>
     <Route path = "/allbrn" exaxt component={Allbranch}/>
     <Route path = "/add" exact component={Additem}/>
     <Route path = "/all" exact component={Allitem}/>
     <Route path = "/addemp" exact component={Addemployee}/>
     <Route path = "/allemp" exact component={AllEmployee}/>

     <Route path = "/cus" exact component={cusview}/>
     <Route path = "/update/:id" exact component={EditForm}/>
      

     

     <Route exact path='/add' component={ Create } />
              
              <Route path='/TableRow' component={ TableRow } />
              <Route path='/email' component={ email } />
              <Route path='/financetable' component={ financetable } />


            </Switch>
        </section>
    )
}

export default Body
