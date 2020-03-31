import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';

import './style.css';

import api from '../../services/api';

export default function Dashboard(){
    const [incidents, setIncidents] = useState([]);
    const [totalCasos, setTotal] = useState(0);

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    
    const history = useHistory();
    
    function details(incidents){
        console.log(incidents);
        history.push('/details',  {incidents} );
    }

    async function loadIncidents(){
        
        if(loading){
            return;
        }

        if(totalCasos > 0 && incidents.length === totalCasos ){
            return;
        }
        
        setLoading(true);
        
        const response = await api.get('/incidents', {
            params: {page}
        });
        

        setIncidents([...incidents, ...response.data]);//anexando 2 vetores dentro de um so
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    
    return (
        <div className="dashboard-container">
            <header>
                <img src={logoImg}/>
                Total de <span> {totalCasos} casos</span>
                <Link className="button" to="/login"> Entrar Como ONG </Link>
                
            </header>
            <h1>Bem vindo!</h1>
            <p> Escolha um dos casos e salve o dia.</p>


            <ul>
        
                {incidents.map(incidents => (
                    <li key={incidents.id}>
                        <strong>ONG:</strong>
                        <p> {incidents.name} </p>

                        <strong>Caso:</strong>
                        <p> {incidents.title} </p>

                        <strong>Valor:</strong>
                        <p> {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incidents.value) } </p>

                        <div className="back-link" onClick={()=>details(incidents)}> Veja mais detalhes </div>
                    </li>
                ))}
        
            </ul>
            <a className="button" onClick={loadIncidents}>MAIS CASOS</a>
        </div>

    )
    
} 