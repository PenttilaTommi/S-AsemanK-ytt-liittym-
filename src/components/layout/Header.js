import React from 'react';
import {Link} from 'react-router-dom';



function Header() {
return (
<header style={headerStyle}>
  <h1>Tommin IoT Sääasema</h1>
  <Link to="/" style={linkstyle}>Sääasema</Link> -  <Link to="/portfolio" style={linkstyle}>Porfolio</Link>
</header>
)
}
const headerStyle = {
background: '#333333',
color: '#ffffff',
textAlign: 'center',
padding: '10px'
}

const linkstyle = {
  color: '#ffffff',
  textDecoration: 'none'
}
export default Header;