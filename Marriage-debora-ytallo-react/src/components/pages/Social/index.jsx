import React from 'react';
import { FaInstagram } from 'react-icons/fa';

import './styles.css';

function Social() {
    return (
        <div className="social-content">
            <h1 className="title-content">Siga nossa Rede Social</h1>
            <p>
                <span>
                    Clique neste link:&nbsp;
                </span>
                <a href="https://www.instagram.com/italoedebora/"
                    target="_blank" rel="noopener noreferrer">
                    <FaInstagram size="30" />
                        Instagram.com/italoedebora
                </a>
            </p>
            <p>
                OU
                </p>
            <div className="social-qrcode">
                <p>Leia o QRCODE abaixo:</p>
                <img src="images/qrCode.jpeg" alt="qrCode" />
            </div>
        </div>
    );
}

export default Social;


