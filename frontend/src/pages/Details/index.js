import React from 'react';
import {useLocation, Link} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import './style.css';

import logoImg from '../../assets/logo.svg';

export default function Details(){

    const location = useLocation()
    const incidents = location.state.incidents;

    function informa(identificador){
        if(identificador === 'whatsapp'){
            alert('EM BREVE UMA FUNCIONALIDADE DE CHAT POR ENQUANTO FIQUE FAÇA MANUALMETE')
            alert(`numero do Whatsapp --- ${incidents.whatsapp}`)   
        }else if(identificador === 'email'){
            alert('EM BREVE UMA FUNCIONALIDADE DE CHAT POR ENQUANTO FIQUE FAÇA MANUALMETE')
            alert(`Email--- ${incidents.email}`)
        }else{
            alert('error')
        }
    }

    return (
        <div className="details-container">
            <header>
                <img src={logoImg}/>
            </header>

            <div className="component">
                <ul>
                    <li>
                    <strong>ONG:</strong>
                        <p> {incidents.name} </p>

                        <strong>Descrição do caso:</strong>
                        <p> {incidents.description} </p>

                        <strong>Valor:</strong>
                        <p> {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incidents.value) } </p>
                    </li>
                </ul>

                <div className="fale-conosco">
                    <h1>Seja o heroi desse caso</h1>
                    <p>Para ajudar no caso, entre em contato pelas redes sociais. </p>
                    <a className="button" onClick={e => informa('email')} >E-mail</a>
                    <a className="button" onClick={e => informa('whatsapp')}>Whatsapp</a>
                </div>

            </div>
            
           

            <Link className="back-link" to="/">
                <FiArrowLeft size={18} color="#e02041"/>
                Voltar
            </Link>
        
        </div>
    );
}