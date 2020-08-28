import React from 'react';
import { FaHeart } from 'react-icons/fa';

import './styles.css';

function Footer() {
  return (
    <div className="footer">
      <FaHeart className="icon" color="#FF0000" />
      <span>
        Desenvolvido por
        <a href="https://www.linkedin.com/in/gabriel-j%C3%BAlio-brito-pessoa-5a96a2106/" target="_blank" rel="noopener noreferrer"><strong> Gabriel Pessoa</strong></a>!
      </span>
    </div>
  );
}

export default Footer;