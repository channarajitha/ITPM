import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {dispatchLogin} from '../../../redux/actions/authAction'
import {useDispatch} from 'react-redux'
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';



const initialState = {
    email: '',
    password: '',
    err: '',
    success: ''
}


function Login() {
    const [passwordShown, setPasswordShown] = useState(false);
    const [user, setUser] = useState(initialState)
    const dispatch = useDispatch()
    const history = useHistory()

    const {email, password, err, success} = user

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }

    const tooglePasswordVisibility = () => {
        setPasswordShown(passwordShown ? false : true)
    }
    
    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('/user/login', {email, password})
            setUser({...user, err: '', success: res.data.msg})

            localStorage.setItem('firstLogin', true)

            dispatch(dispatchLogin())
            history.push("/")

        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

    const responseGoogle = async (response) => {
        try {
            const res = await axios.post('/user/google_login', {tokenId: response.tokenId})

            setUser({...user, error:'', success: res.data.msg})
            localStorage.setItem('firstLogin', true)

            dispatch(dispatchLogin())
            history.push('/')
        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

    const responseFacebook = async (response) => {
        try {
            const {accessToken, userID} = response
            const res = await axios.post('/user/facebook_login', {accessToken, userID})

            setUser({...user, error:'', success: res.data.msg})
            localStorage.setItem('firstLogin', true)

            dispatch(dispatchLogin())
            history.push('/')
        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

    return (
        <div className="login_page mt-5 pt-5">
            
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <div class="card w-75">
                <div class="card-body">
                    <h5 class="card-title">LOGIN</h5>
                    <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="text" placeholder="Enter email address" id="email"
                    value={email} name="email" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type={passwordShown ? "text" : "password"} placeholder="Enter password" id="password"
                    value={password} name="password" onChange={handleChangeInput} />
                    <span class = "p-viewer" >
                        <i class = {`fa ${passwordShown ? "fa-eye" : "fa-eye-slash"}`} onClick = {tooglePasswordVisibility}/>
                        </span>
                </div>

                <div className="row">
                    <div class="col">
                    <button type="submit">Login</button>
                    
                    </div>
                </div>

                <div className="row">
                    <div className="col text-center pt-2">
                    <Link to="/forgot_password">Forgot your password?</Link>
                    </div>
                </div>
            </form>
                </div>
            </div>


            

            {/* <div className="hr">Or Login With</div> */}

            {/* <div className="social">
                <GoogleLogin
                    clientId="Your google client id"
                    buttonText="Login with google"
                    onSuccess={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                
                <FacebookLogin
                appId="Your facebook app id"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook} 
                />

            </div> */}

            <p>New Customer? <Link to="/register">Register</Link></p>
        </div>
    )
}

export default Login
