import React from 'react';
import logo from './assets/logo.svg'; // Caminho do logo original

const Header = () => {
  return (
    <header>
      <img src={logo} alt="Logo" className="logo" />
    </header>
  );
};

export default Header; 