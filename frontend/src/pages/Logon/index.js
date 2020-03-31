import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import './style.css';

import { FiLogIn, FiArrowLeft } from 'react-icons/fi';

import heroImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function Logon() {
    
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('/sessions', { id });

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');

        }catch(err) {
            alert('Falha ao conectar, verifique seu ID');
        }
    }

    return (
        <div className="logon-conteiner">
            <section className="form">
                
                <img src={logoImg}/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>

                    <input 
                        placeholder="Seu ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    ></input>
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041"/>
                        Nao tenho cadastro
                    </Link>
                    
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Voltar
                    </Link>

                </form>
            </section>
            <img src={heroImg}/>
        </div>
    );
}