import React, { useCallback, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import api from '../../services/api'
import * as yup from 'yup'

import './style.css'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

function Admin() {
    const history = useHistory()
    const [user, setUser] = useState(null)

    const validate = yup.object().shape({
        title: yup.string().min(3).required(),
        link: yup.string().url().required()
    });

    function handleLogout() { 
        localStorage.removeItem('@SuaAplicacao:JWT_TOKEN');
        history.push('/');
    }

    const userToken = localStorage.getItem('@SuaAplicacao:JWT_TOKEN');

    const addLinkInList = useCallback((values)=> {

        const data = {
            title: values.title,
            url: values.link
        }

        api.post('/create_link', data, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            }
        }).then(response => {
            alert("cadastrado com sucesso!")
        })
        
    }, [userToken])

    useEffect(() => {
        api.get('/users', {
            headers: {
                Authorization: `Bearer ${userToken}`,
            }
        }).then(valores=> {
            setUser(valores.data[0].id)
        })
    }, [userToken])

    localStorage.setItem('@SuaAplicacao:ID_USER', user)

    return (
        <>
            <Header />
                <section className="dashboard">
                    <h1>O único link que você vai precisar</h1>

                    <Formik
                    onSubmit={addLinkInList}
                    initialValues={{ title: '', link: '' }}
                    validationSchema={validate}
                    >
                        <Form className="form-add">
                            <div className="form-add-fields">
                                <Field autoComplete="off" className="input-add" type="text" name="title" placeholder="Título" />
                                <ErrorMessage className="error-add" component="span" name="title"/>
                            </div>
                            <div className="form-add-fields">
                                <Field autoComplete="off" className="input-add" type="link" name="link" placeholder="Url" />
                                <ErrorMessage className="error-add" component="span" name="link"/>
                            </div>
                            <button className="add-link" type="submit">Adicionar</button>
                        </Form>
                    </Formik>

                    <div className="btn-sair">
                        <button onClick={handleLogout} className="out-apication">Sair</button>
                    </div>

                    <div className="content">
                        <p>
                            O Linkfive é serviço online para Instagram
                            que permite divulgar os links de todos os 
                            seus perfis e sites em um mesmo lugar. A ferramenta
                            é muito utilizada por influenciadores e empresas para
                            promover suas contas em outras redes sociais, como Facebook
                            ou Twitter, e até venda de produtos.
                        </p>
                    </div>
                </section>
            <Footer/>
        </>
    )
}

export default Admin
