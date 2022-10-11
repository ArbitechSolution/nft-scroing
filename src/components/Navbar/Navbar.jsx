import React,{useState, useEffect} from 'react'

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { faSearch, faGasPump } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loadWeb3 } from '../api/api';
import "./Navbar.css"
import logo from "../../assets/logo.jpg"
import {Link} from 'react-router-dom'
function CollapsibleExample() {
  const [account , setAccount] = useState("Connect")
  const connectWallet =async()=>{
    let acc = await loadWeb3();
    if (acc=="No Wallet"){
      setAccount("No Wallet")
    }      
    else if(acc=="Wrong Network"){  
      setAccount("Wrong Network")
    }else{
        let  myAcc = acc?.substring(0, 4) + "..." + acc?.substring(acc?.length - 4);
        setAccount(myAcc);  

    } 
  }
  return (
    <Navbar collapseOnSelect expand="lg" className='backgroundColor'  variant="dark">
      <div className='container-fluid'>
        <Navbar.Brand href="#">
            <img src={logo} alt="logo" className="rounded-circle border border-5"  
              width="45"
              height="45" 
              />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link href="/" ><Link to="/" style={{textDecoration: 'none', color:'white', fontSize: '18px'}}>Collections</Link></Nav.Link>
          <Nav.Link href="#"  style={{textDecoration: 'none', color:'white', fontSize: '18px'}}>Snipe Bot</Nav.Link>
          <Nav.Link href="#"  style={{textDecoration: 'none', color:'white', fontSize: '18px'}}>Mint Bot</Nav.Link>
          <Nav.Link href="#"  style={{textDecoration: 'none', color:'white', fontSize: '18px'}}>Auto trading</Nav.Link>
          <Nav.Link href="#"  style={{textDecoration: 'none', color:'white', fontSize: '18px'}}>Wallet Manage</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#"><FontAwesomeIcon icon={faGasPump}  className="text-info me-2"/>5.18</Nav.Link>
           <button onClick={()=>connectWallet()} className='btn btn-dark border-4 border-primary rounded-5 py-1 px-4'>{account}
           </button>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default CollapsibleExample;