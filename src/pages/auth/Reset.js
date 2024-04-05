import React from 'react'
import Card from '../../components/card/Card';
import styles from './Auth.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';


const Reset = () => {
  const [email, setEmail] = useState("");
  const resetPassword =(e) =>{
    e.preventDefault();
    auth.sendPasswordResetEmail( email)
    .then(() => {
      toast.success("Check your email fro a reset link")

    })
    .catch((error) => {
      toast.error(error.message)

    });
  };

  return (
    <Card>
    <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
            <img src='' alt='' width='400' />
        </div>
       
    <div className='login'>
        <img src='https://play-lh.googleusercontent.com/2BVmc0f-rf0CqAzvJlkbNH9spabOfI4BarGh6LWeAufw-cFLzo3TsFhPQ_xBAML-Y6ax' alt='' />
        <form onSubmit={resetPassword}>
        <input required value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' type='email' />
            <button type='submit' onClick={resetPassword}> Reset Password</button>
            <div className={styles.links}>
              <p>
                <Link to='/login'> Login</Link>
              </p>
              <p>
                <Link to='/register'> Register</Link>
              </p>
            </div>
        </form>
    </div>
    

    </section>
    </Card>
  )
}

export default Reset