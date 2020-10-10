import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import api from '../../services/api'

import './style.css'

function Register() {

    const history = useHistory()
    
    const validateRegister = yup.object().shape({
        username: yup.string().min(5).required(),
        email: yup.string().email().required(),
        password: yup.string().min(8).required(),
        avatar: yup.string().url().required(),
    });

    const handleRegister = useCallback((values)=> {
        try {
            api.post('/create_user', {
                "username": values.username,
                "email": values.email,
                "password": values.password,
                "avatar": values.avatar
            }).then(response => {
                alert("Agora você pode fazer o login, Obg :D")
                history.push('/')
            })
        } catch (error) {
            if(error) alert("Erro ao cadastar usuário...")
        }
    }, [history])

    return (
        <div className="page-form-register">
        <Formik
        onSubmit={handleRegister}
        initialValues={{ username: '', email: '', password: '', avatar: '' }}
        validationSchema={validateRegister}
        >
            <Form className="form-register">
                <h2>Hora de Cadastrar</h2>
                <div className="form-field-register">
                    <Field autoComplete="off" className="input-filed-register" type="text" name="username" placeholder="Nome de usuário" />
                    <ErrorMessage className="error-msg-register" component="span" name="username" />
                </div>
                <div className="form-field-register">
                    <Field autoComplete="off" className="input-filed-register" type="email" name="email" placeholder="E-mail" />
                    <ErrorMessage className="error-msg-register" component="span" name="email" />
                </div>
                <div className="form-field-register">
                    <Field autoComplete="off" className="input-filed-register" type="password" name="password" placeholder="Senha" />
                    <ErrorMessage className="error-msg-register" component="span" name="password" />
                </div>
                <div className="form-field-register">
                    <Field autoComplete="off" className="input-filed-register" type="link" name="avatar" placeholder="Link da sua Foto" />
                    <ErrorMessage className="error-msg-register" component="span" name="avatar" />
                </div>
                <button className="btn-login-register" type="submit">Cadastrar</button>
            </Form>
        </Formik>
    </div>
    )
}

export default Register
