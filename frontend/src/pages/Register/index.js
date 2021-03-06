import React, { useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi'

import './style.css';

import logoImg from '../../assets/logo.svg'

import api from '../../services/api';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };

        try{
            const response = await api.post('/ongs', data);
            
            alert(`Seu ID: ${response.data.id}`)
                        
            history.push('/login')
        }catch(err){
            toast.error('Falha no cadastro')
        }
    }

    return (
        <div className="register-container">
            <div className="content">

                <ToastContainer/>

                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    
                    <h1>Cadastro</h1>
                    
                    <p>Faça seu cadastro e ajude as pessoas a encontrarem os casos da sua ONG</p>

                    <Link className="back-link" to="/login">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Voltar para o Logon
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}  
                    ></input>

                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    ></input>

                    <input 
                        placeholder="WhatsApp"
                        valeu={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    ></input>
                    
                    <div className="input-group">
                        <input 
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        ></input>

                        <input 
                            placeholder="UF" style={{ width:80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        ></input>
                    </div>

                    <button className="button" type="submit"> Cadastrar </button>
                </form>
            </div>
        </div>
    );
}