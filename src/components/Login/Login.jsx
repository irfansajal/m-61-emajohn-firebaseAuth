import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProviders';
import './Login.css';

const Login = () => {
    const [show,setShow] = useState(false);

   const {signIn} = useContext(AuthContext);
   const navigate = useNavigate();
   const location = useLocation();
   console.log(location);

   const from = location.state?.from?.pathname || '/';
   console.log(from);   // need to fix this line ,there is error here// i fixed it there was a spelling mistake 'from' 


   const handleLogin = event =>{
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email,password);

    signIn(email,password)
    .then(result =>{
        const loggedUser = result.user;
        console.log(loggedUser);
        form.reset('')
        navigate(from,{replace: true})
    })
    .catch(error =>{
        console.log(error);

    })
    
    }

    return (
        <div className='form-container'>
            <h2 className='form-title'>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-control" >
                    <label htmlFor='Email'>Email</label>
                    <input type="email" name="email"  required />
                </div>
                <div className="form-control" >
                    <label htmlFor='password'>Password</label>
                    <input type={show ? 'text' : 'password'} name="password"  required />

                     <p onClick={ () => setShow (!show)}><small>
                        {
                            show ? <span>Hide password</span>: <span>show password</span>
                        }
                        
                        </small></p>


                </div>
                <input className='btn-submit' type="submit" value="Login" />

            </form>
        <p><small>New to ema-john? <Link to ='/SignUp'>Create new Account</Link></small></p>
        </div>
    );
};

export default Login;