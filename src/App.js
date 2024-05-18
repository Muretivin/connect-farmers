import React, { useEffect } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, Contact, Login, Register, Reset } from './pages/Index';
import { Header, Footer } from './components';
import { login, logout, selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Feed from './pages/home/Feed';
import { auth } from './firebase';
import Widgets from './Widgets';
import Navbar from './pages/home/Navbar';
import Nabar from './components/crud/Nabar';
import AddEditUser from './pages/rud/AddEditUser';
import CombineHome from './pages/home/CombineHome';
import Ome from './pages/rud/Ome';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className='app'>
      <Router>
        {!user ? (
          <>
            <Navbar />
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset" element={<Reset />} />
              
            </Routes>
          </>
        ) : (
          <>
          <Header />
          
            <div className='app_body'>
            <Routes>
              <Route path="/records" element={<Nabar />} />
              <Route path="/add" element={<AddEditUser />} />
              <Route path="/update/:id" element={<AddEditUser />} />
              <Route path="/" element={<CombineHome />} />
            </Routes>
          
              
            </div>
          
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
