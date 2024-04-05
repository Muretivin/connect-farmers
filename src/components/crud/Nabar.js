import React from 'react';
import "./Nabar.css";
import {Menu, Container, Button, Image} from "semantic-ui-react";
import { useNavigate, Link } from 'react-router-dom';
import logo from "../../assets/mureti.jpg";
import Ome from '../../pages/rud/Ome';

const Nabar = () => {
    const navigate = useNavigate();
  return (
    <>
    <Menu inverted borderless sytle={{padding: "0.3rem", marginBottom: "20px"}} attached className='menu'>
        <Container className='container'>
            <Menu.Item name="home" >
                <Link to="/">
                    <Image size="mini" src={logo} alt="logo" className='mini' />
                </Link>

            </Menu.Item>
            <Menu.Item>
                <h2> My Records </h2>
            </Menu.Item>
            <Menu.Item position="right" className='button'>
                <Button size="mini" primary onClick={() => navigate("/add")} >
                    Add Record
                </Button>

            </Menu.Item>
        </Container>
        <Ome />
    </Menu>
    
    </>
  )
}

export default Nabar