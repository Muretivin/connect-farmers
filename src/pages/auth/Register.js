import React, { useState } from 'react';
import styles from './Auth.module.scss';
import { auth } from '../../firebase';
import { login } from '../../features/userSlice';
import Card from '../../components/card/Card';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
const register = (e) => {
    e.preventDefault()
    
    if(!name){
        return alert ("please enter a full name");

    }else if(password !== cpassword){
        return alert ("password does not match")
    }
    setIsLoading(true)
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
        setIsLoading(false)
        navigate("/login")
    });
};
  return (
    <>
    {isLoading && <Loader />}
    <Card>
    <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
            <img src='' alt='' width='400' />
        </div>
       
    <div className='login'>
        <img src='https://play-lh.googleusercontent.com/2BVmc0f-rf0CqAzvJlkbNH9spabOfI4BarGh6LWeAufw-cFLzo3TsFhPQ_xBAML-Y6ax' alt='' />
        <form onSubmit={register}>
            <input required value={name} onChange={(e) => setName(e.target.value)} placeholder='full name (required)' type='text' />
            <input value={profilePic} onChange={(e) => setProfilePic(e.target.value)} placeholder='profile pic url (optional)' type='text' />
            <input required value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' type='email' />
            <input required value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' type='password' />
            <input required value={cpassword} onChange={(e) => setCPassword(e.target.value)} placeholder='confirm password' type='password' />
            <button type='submit'onClick={register}> Register</button>
        </form>
        <p> Already have an Account?{""}
                <Link to='/login'><span className='login_register'> Login</span></Link>
            </p>

    </div>
    

    </section>
    </Card>
    </>
  )
}

export default Register