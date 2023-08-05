import React from 'react'
import powerLineImage from '../../assets/img/login/power_line.jpg';
import { Link } from 'react-router-dom';
import MainForm from '../../components/Form/MainForm/MainForm';

function Register() {

    const INPUT_FORM = [
        {
            label: 'Email',
            type: 'email',
        },
        {
            label: 'Password',
            type: 'password',
        }
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
                />
                    
            </div>
        </div>
    )
}

export default Register