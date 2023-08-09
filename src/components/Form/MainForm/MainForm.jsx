import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
function MainForm({title, inputForm, button, link, linkdesc, state, setState, handleFunction}) {
    const toLink = link.split('/')[1]

    useEffect(() => {
        if (state.username && state.password) {
            handleFunction()
        }
    }, [state])

    function handleSubmit(e) {
        e.preventDefault()

        let inputSubmit = e.target
        let inputSubmitValue = {}
        for (let i = 0; i < inputSubmit.length - 1; i++) {
            inputSubmitValue[inputSubmit[i].id] = inputSubmit[i].value
        }  
        setState(inputSubmitValue)

    }

    
    return (
        <div>
            <div className='flex flex-col justify-center items-center max-w-lg'>
                <h1 className="text-3xl font-bold mb-4">{title}</h1>
                <form className="w-64" onSubmit={e => handleSubmit(e)}>
                    {
                        inputForm.map((input, index) => {
                            return (
                                <div className="mb-4" key={index}>
                                    <label htmlFor="email" className="text-lg">{input.label}:</label>
                                    <input type={input.type} id={input.label} className="w-full px-2 py-1 border rounded" />
                                </div>
                            )
                        })
                    }
                
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full">{button}</button>
                    
                </form>
            </div>
            <p className='text-center mt-2'>{linkdesc}
                <Link to={link} className='text-blue-500' > {toLink}</Link>  
            </p>
        </div>
    )
}

export default MainForm