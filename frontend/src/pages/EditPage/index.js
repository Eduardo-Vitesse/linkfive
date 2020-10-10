import React, { useCallback, useRef } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import api from '../../services/api'

import './style.css'

function EditPage() {

    const userToken = localStorage.getItem('@SuaAplicacao:JWT_TOKEN');
    const id_user = localStorage.getItem('@SuaAplicacao:ID_USER')
    const history = useHistory()
    const { id } = useParams()

    const title = useRef('')
    const url = useRef('')

    const handleUpdate = useCallback((e)=> {
        e.preventDefault()
        const dadosUpdate = {
            title: title.current.value,
            url: url.current.value
        }

        api.patch(`/atualizar_link/${id}`, dadosUpdate, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            }
        })
        
        history.replace(`/config/${id_user}`)
    }, [ id, userToken, id_user, history])

    return (
        <section className="baclground-form-edit">
            <form onSubmit={handleUpdate} className="form-edit">
                <h4>Edite Seu Link</h4>
                <div className="input-edit-group">
                    <label className="label-edit">Título</label>
                    <input ref={title} name="title-upfate" className="input-edit" type="text"/>
                </div>
                <div className="input-edit-group">
                    <label className="label-edit">Link</label>
                    <input ref={url} name="title-upfate" className="input-edit" type="url"/>
                </div>
                <button className="btn-save-edit" type="submit">Salvar</button>
            </form>
        </section>
    )
}

export default EditPage
