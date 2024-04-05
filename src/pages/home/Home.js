import React from 'react';
import styles from './Home.module.scss';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Header } from '../../components';
import Navbar from './Navbar';
import Slider from '../../components/slider/Slider';

function Home()  {
  return (
    <div className="home-page">
      <Slider />
      
            
    </div>
  )
}

export default Home