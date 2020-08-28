import React from 'react';
import { FaInstagram } from 'react-icons/fa'

import './styles.css';

function Location() {
    return (
        <div className="location">
            <h1 className="title-content">Cerimônia Religiosa</h1>
            <div className="present-guests">
                <h2>Convidados Presenciais (Familiares)</h2>

                <p>Data: 17/10/2020.</p>
                <p>Horário: 17h</p>
                <p>Local: Rua de Apipucos, 629 - Apipucos, Recife - PE, 52071-000.</p>
                <iframe className="map" title="Event Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.7700101093524!2d-34.93353704902188!3d-8.022634982272958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab1997a82c4847%3A0xd54eb62890fbe5c4!2sVilla%20Apipucos%20Recep%C3%A7%C3%B5es!5e0!3m2!1spt-BR!2sbr!4v1597433311087!5m2!1spt-BR!2sbr"
                    width="450" height="338" style={{ border: "0" }} aria-hidden="false" />
            </div>

            <div className="remote-guests">
                <h2>Convidados Remotos (devido à pandemia)</h2>

                <p>Transmissão online através do
                <a href="https://www.instagram.com/italoedebora/"
                        target="_blank"
                        rel="noopener noreferrer"
                    > Instragram do Casamento </a>
                 abaixo :
                </p>
                <span>
                    Siga nossa rede Social:
                </span>
                <a href="https://www.instagram.com/italoedebora/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaInstagram size="30" />
                    Instagram.com/italoedebora
                </a>
            </div>

        </div>
    );
}

export default Location;