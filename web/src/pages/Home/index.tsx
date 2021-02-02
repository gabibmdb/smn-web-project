import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './styles.css';
import logo from '../../assets/logo.svg';


const Home = () => {
    return (
        <div id="page-home">
            <div className="content">
                {/* <header>
                    <img src={logo} alt="Cadastro de Usuários"/>
                </header> */}

                <main>
                    <form>
                    <img src={logo} alt="Cadastro de Usuários"/>
                        <fieldset>
                    
                                <div className="field">
                                    <label htmlFor="email">E-mail</label>
                                    <input 
                                        type="email"
                                        name="email"
                                        id="email"
                                    />
                                </div>
                                <div className="field">
                                    <label htmlFor="password">Senha</label>
                                    <input 
                                        type="text"
                                        name="password"
                                        id="password"
                                    />
                                </div>
                                
                            
                        </fieldset>

                        <Link to="/register">
                            <span>
                                <FiLogIn />
                            </span>
                            <strong>Entrar</strong>
                        </Link>

                    </form>
                

                    
                </main>

            </div>
        </div>
    )
}

export default Home;