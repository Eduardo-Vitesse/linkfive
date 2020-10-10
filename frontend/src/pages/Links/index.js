import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../services/api'

import './style.css'

function Links() {

    const [ dados, setDados ] = useState([])
    const [ photo, setPhoto ] = useState(null)
    const { id } = useParams()

    useEffect(()=> {
        api.get(`/links/${id}`).then(response => {
            setDados(response.data);
        })

        api.get(`/user/${id}`).then(resp => {
            setPhoto(resp.data[0].avatar);
        })
    }, [id])

    return (
        <section className="page-links">
                <img className="photo-profile" src={photo} alt="foto de perfil"/>
                <div className="all-links">
                {dados.map(item => (
                    <a className="personal-link" key={item.id} href={item.url} target="_blanck">{item.title}</a>
                ))}
                </div>
        </section>
    )
}

export default Links
