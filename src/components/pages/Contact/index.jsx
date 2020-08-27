import React from 'react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi'
import { GrGroup } from 'react-icons/gr'

import './styles.css';

function Contact() {
    return (
        <div className="contact">
            <h1 className="title-content">Envie sua Mensagem</h1>
            <span>Clique nos links abaixo:</span>
            <p>
                <a href="mailto:casamentoitaloedebora@gmail.com">
                    <FiMail className="contact-icon" color="#ffa500" size="25px" />
                Envie um Email aos Noivos
                </a>
            </p>
            <p>
                <a href="tel:+55081992167110">
                    <FaWhatsapp className="contact-icon" color="#008000" size="25px" />
                Envie um WhatApp aos Noivos
                </a>
            </p>
            <p>
                <a href="https://chat.whatsapp.com/CQcT5z0nCRv4OqFWv018be"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    <GrGroup size="25px" /> Entre no grupo de WhatsApp
                </a>
            </p>
            <p>
                <a href="https://www.instagram.com/italoedebora/"
                    target="_blank" rel="noopener noreferrer">
                    <FaInstagram size="30" />
                        Instagram.com/italoedebora
                </a>
            </p>
        </div>
    );
}

export default Contact;