import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import api from '../../services/api'
import * as yup from 'yup'

import './style.css'

function Login() {

    const history = useHistory()
    
    const validation = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(8).required()
    });

    const handleLogin = useCallback((values)=> {
        api.post('/login', {
            "email": values.email,
            "password": values.password
        }).then(response => {
            const token = response.data.token
            localStorage.setItem('@SuaAplicacao:JWT_TOKEN', token)
            history.push('/admin')
        })

    }, [history])

    return (
        <div className="page-form">
            <Formik
            onSubmit={handleLogin}
            initialValues={{ email: '', password: '' }}
            validationSchema={validation}
            >
                <Form className="form">
                    <h2>Faça Login</h2>
                    <div className="form-field">
                        <Field autoComplete="off" className="input-filed" type="email" name="email" placeholder="E-mail" />
                        <ErrorMessage className="error-msg" component="span" name="email" />
                    </div>
                    <div className="form-field">
                        <Field autoComplete="off" className="input-filed" type="password" name="password" placeholder="Senha" />
                        <ErrorMessage className="error-msg" component="span" name="password" />
                    </div>
                    <button className="btn-login" type="submit">Logar</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Login
