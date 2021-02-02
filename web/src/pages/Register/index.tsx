import React, { useEffect, useState, ChangeEvent, FormEvent} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaPowerOff} from 'react-icons/fa';
import axios from 'axios';
import api from '../../services/api';
import './styles.css';
import logo from '../../assets/logo.svg';


interface IBGEUFResponse {
    sigla: string;
}

interface IBGECityResponse {
    nome: string;
}

const Register = () => {

    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);


    const[formData, setFormData] = useState({
        image: '',
        name: '',
        phone: '',
        cellphone: '',
        email: '',
        street:'',
        role: '',
        password: ''
    });

    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [selectedRole, setSelectedRole] = useState('0');

    const history = useHistory();


    //loading UFs
    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);
            setUfs(ufInitials);
        });
    }, []);


    //loading cities
    useEffect(() => {
        if (selectedUf === '0') {
            return;
        }
        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
            const cityNames = response.data.map(city => city.nome);
            setCities(cityNames);
        });

    }, [selectedUf]);

    //UF ChangeEvent
    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value;

        setSelectedUf(uf);
    }

    //City ChangeEvent
    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value;

        setSelectedCity(city);
    }

    //Role ChangeEvent 
    function handleSelectRole(event: ChangeEvent<HTMLSelectElement>) {
        const role = event.target.value;

        setSelectedRole(role);
    }

    //Input change
    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData({...formData, [name]: value});
    }


    //Submitting data to the API
    async function handleSubmit(event: FormEvent) {
        //preventDefault is being used to avoid reloading the page after submitting the form
        event.preventDefault();

        const { image, name, phone, cellphone, email, street, password } = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const role = selectedRole;

        const data = {
            image,
            name,
            phone,
            cellphone,
            street,
            city,
            uf,
            role,
            email,
            password
        };
        
        await api.post('users', data);

        alert('Usuário registrado!');

        history.push('/')
    }

    return (
        <div id="register">
            <header>
                <img src={logo} alt="Cadastro de Usuários" />

                <Link to="/">
                    <FaPowerOff />
                    Voltar para home
                </Link>
            </header>

            <form onSubmit={handleSubmit}>
                <h1>Cadastro de novo usuário</h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome completo</label>
                        <input 
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="phone">Telefone fixo</label>
                            <input 
                                type="text"
                                name="phone"
                                id="phone"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="cellphone">Celular</label>
                            <input 
                                type="text"
                                name="cellphone"
                                id="cellphone"
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="field-group">
                            <div className="field">
                                <label htmlFor="image">Foto de Perfil</label>
                                <input 
                                    type="text"
                                    name="image"
                                    id="image"
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="field">
                                <label htmlFor="role" id="role">Função</label>
                                <select 
                                    name ="role" 
                                    id="role" 
                                    value=""
                                    onChange={handleSelectRole}
                                >
                                    <option value="0">Selecione uma função</option>
                                    <option value="Gerente"> Gerente </option>
                                    <option value="Recepcionista"> Recepcionista </option>
                                    <option value="Cozinheiro"> Cozinheiro </option>
                                    <option value="Cozinheiro"> Faxineiro </option>
                                </select>
                            </div>
                        </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="street">Rua</label>
                        <input 
                            type="text"
                            name="street"
                            id="street"
                            onChange={handleInputChange}
                        />
                    </div>

                
                    <div className="field-group">
                    
                        <div className="field">
                            <label htmlFor="uf" id="uf">Estado (UF)</label>
                            <select 
                                name ="uf" 
                                id="uf" 
                                value={selectedUf} 
                                onChange={handleSelectUf}
                            >
                                <option value="0">Selecione uma UF</option>
                                {ufs.map(uf => (
                                    <option key={uf} value={uf}> {uf} </option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city" id="city">Cidade</label>
                            <select 
                                name ="city" 
                                id="city"
                                value = {selectedCity}
                                onChange={handleSelectCity}
                            >
                                <option value="0">Selecione uma cidade</option>
                                {cities.map(city => (
                                    <option key={city} value={city}> {city} </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Informações de Login</h2>
                    </legend>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input 
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="password">Senha</label>
                            <input 
                                type="text"
                                name="password"
                                id="password"
                                onChange={handleInputChange}
                            />
                        </div>
                        
                    </div>
                </fieldset>

                <button type="submit">
                    Cadastrar novo usuário
                </button>
            </form>
        </div>
    );
};

export default Register;