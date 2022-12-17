import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import './App.css';

export default function App() {
  return (
    <MDBFooter bgColor='light'  className='text-center text-lg-start text-muted' >
      <div className="Footer-text text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2022 Namo valdymo sistema
      </div>

    </MDBFooter>
  );
}