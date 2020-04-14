import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi';

import './style.css';
import logoImg from '../../assets/logo.svg'

import api from '../../services/api'

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NewIncident(){

    const ongId = localStorage.getItem('ongId');
    
    const history = useHistory();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    async function handlesNewIncidents(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value
        }

        try{
            await api.post('/incidents', data ,{ 
                headers: {
                    Authorization: ongId
                }
            });
            
            history.push('/profile')
        }catch(err) {
            toast.warn('erro ao cadastar caso, tente novamente')
        }
    }

    return ( 
        <div className="new-incident-container">
        <div className="content">
           
            <ToastContainer/>   
           
            <section>
                <img src={logoImg} alt="Be The Hero"/>
                
                <h1>Cadastrar novo caso</h1>
                
                <p>Descreva o caso detalhado, para encontrar um heroi para ele</p>

                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#e02041"/>
                    Voltar para seus casos
                </Link>
            </section>

            <form onSubmit={handlesNewIncidents}>

                <input 
                    placeholder=" titulo do caso"
                    value={title}
                    onChange={e => setTitle(e.target.value)}    
                ></input>

                <textarea 
                    placeholder="Descrição do caso"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                ></textarea>

                <input 
                    placeholder="Valor em reais"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                ></input>
                

                <button className="button" type="submit"> Cadastrar </button>
            </form>
        </div>
    </div>
    );
}