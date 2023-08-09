import React, { useState } from 'react'
import powerLineImage from '../../assets/img/login/power_line.jpg';
import { Link } from 'react-router-dom';
import MainForm from '../../components/Form/MainForm/MainForm';
import axios from 'axios';

function Login() {
    const [userInput, setUserInput] = useState({
        username: '',
        password: '',
    })

    async function handleFunction() {
        try {
            const {data} = await axios.post('http://localhost:9000/login', {
                username: userInput.username,
                password: userInput.password,
            }, {
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                }
            }) 

            data.message === 'Login berhasil' ? window.location.href = '/dashboard' : console.log(data.message)

            
        } catch (error) {
            console.log(error)
        }
        
    }

    const INPUT_FORM = [
        {
            label: 'username',
            type: 'text',
        },
        {
            label: 'password',
            type: 'password',
        }
    ]

    return (
        <div className={'relative flex w-screen h-screen justify-start items-center bg-[image:var(--image-url)] bg-center'} style={{ '--image-url': `url(${powerLineImage})` }}>
            <div className="flex flex-col justify-center items-center h-full w-1/2 bg-white">
                <MainForm 
                    title='Login Page'
                    inputForm={INPUT_FORM}
                    button='Login'
                    link='/register'
                    linkdesc='Sudah punya Akun?'
                    state = {userInput}
                    setState = {setUserInput}
                    handleFunction={handleFunction}
                />
            </div>
        </div>
    )
}

export default Login