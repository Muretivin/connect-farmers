import React, { useState } from 'react';
import './Login.css';
import { auth } from '../../firebase';
import { login } from '../../features/userSlice';
import {useDispatch} from 'react-redux';
import styles from './Auth.module.scss';
import { Link } from 'react-router-dom';
import Card from '../../components/card/Card';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const dispatch = useDispatch();
    const loginToApp = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
        .then(userAuth => {
            dispatch(login({
                email:userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: userAuth.user.displayName,
                profileUrl: userAuth.user.photoURL,

              })
            );
        })
        .catch((error) => alert(error));
    };
    const register = () => {
        if(!name){
            return alert ("please enter a full name");

        }
        auth.createUserWithEmailAndPassword(email,password)
        .then((userAuth) => {
            userAuth.user.updateProfile({
                displayName: name,
                photoURL: profilePic,
            })
            .then(() => {
                dispatch(login({
                    email:userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: name,
                    photoURL: profilePic,

                }));
            });
        });
    };
  return (
    <Card>
    <div className='login'>
        <img src='https://play-lh.googleusercontent.com/2BVmc0f-rf0CqAzvJlkbNH9spabOfI4BarGh6LWeAufw-cFLzo3TsFhPQ_xBAML-Y6ax' alt='' />
        <form>
            
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' type='email' />
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' type='password' />
            <button type='submit' onClick={loginToApp}> Sign in</button>
            <div className={styles.links}>
                <Link to='/reset' > Reset Password</Link>
            </div>
            <p> not a memeber?{""}
                <Link to='/register'><span className='login_register' > Register now</span></Link>
            </p>



        </form>

    </div>
    </Card>
  )
}

export default Login