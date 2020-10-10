import React, { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'

import './style.css'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

function Configure() {

    const userToken = localStorage.getItem('@SuaAplicacao:JWT_TOKEN');
    const id_user = localStorage.getItem('@SuaAplicacao:ID_USER')
    const [ configLinks, setConfigLinks ] = useState([])

     // Excluir um link expecífico
    const handleDelete = useCallback(async (e) => {
        await api.delete(`/del_link/${e.target.id}`,{
            headers: {
                Authorization: `Bearer ${userToken}`,
            }
        })
        window.location.reload(true);
    }, [userToken])

    // lIstar os links paenas para usuários logados
    useEffect(()=>{
        api.get(`links/${id_user}`, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            }
        }).then(respo => {
            setConfigLinks(respo.data);
        })
    }, [id_user, userToken, handleDelete])

    return (
        <>
            <Header/>
            <section className="page-config">
                    <h2 className="title-page-config">Edite seus links Luiz Eduardo</h2>
                    {configLinks.map(link=> (
                        <div key={link.id} className="box-link-config">
                        <span className="config-my-link">{link.title}</span>
                        <Link className="editar-link" to={`/edit/${link.id}`}>EDITAR</Link>
                        <button id={link.id} className="excluir-link" onClick={e => handleDelete(e)}>EXCLUIR</button>
                    </div>
                    ))}
            </section>
            <Footer/>
        </>
    )
}

export default Configure
