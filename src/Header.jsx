import React from 'react'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand
  } from 'mdb-react-ui-kit';
function Header() {
  return (
    <>
    <MDBNavbar bgColor='dark'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'>
            <img
            className='ms-5'
              src='./src/assets/pngegg.png'
              height='80'
              alt=''
              loading='lazy'
              style={{borderRadius:'50%'}}
            />
           <h1 className='text-light ms-3' style={{fontWeight:"bolder"}}> Wheather App</h1>
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
    </>
  )
}

export default Header
