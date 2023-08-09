import React, { useState } from 'react'
import powerLineImage from '../../assets/img/login/power_line.jpg';
import { Link } from 'react-router-dom';
import MainForm from '../../components/Form/MainForm/MainForm';
import axios from 'axios';

function Register() {

    const [userInput, setUserInput] = useState({
        username: '',
        password: '',
    })

    async function POSTRegister() {
        try {
            const {data} = await axios.post('http://localhost:9000/register', {
                username: userInput.username,
                password: userInput.password,
            }, {
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                }
            }) 

            
        } catch (error) {
            console.log(error)
        }
        
    }

    function handleFunction() {
        POSTRegister()
    } 

    const INPUT_FORM = [
        {
            label: 'username',
            type: 'text',
        },
        {
            label: 'password',
            type: 'password',
        },
    ]


    return (
        <div className={'relative flex w-screen h-screen justify-start items-center bg-[image:var(--image-url)] bg-center'} style={{ '--image-url': `url(${powerLineImage})` }}>
            <div className="flex flex-col justify-center items-center h-full w-1/2 bg-white">
                <MainForm
                    title='Register Page'
                    inputForm={INPUT_FORM}
                    button='Register'
                    link='/login'
                    linkdesc='Sudah punya Akun?'
                    state = {userInput}
                    setState = {setUserInput}
                    handleFunction={handleFunction}
                />
            </div>
        </div>
    )
}

export default Register