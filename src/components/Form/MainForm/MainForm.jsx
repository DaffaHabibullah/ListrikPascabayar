import React from 'react'
import { Link } from 'react-router-dom';
function MainForm({title, inputForm, button, link, linkdesc}) {
    const toLink = link.split('/')[1]

    return (
        <div>
            <div className='flex flex-col justify-center items-center max-w-lg'>
                <h1 className="text-3xl font-bold mb-4">{title}</h1>
                <form className="w-64 ">
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
                    {/* <div className="mb-4">
                        <label htmlFor="email" className="text-lg">Email:</label>
                        <input type="email" id="email" className="w-full px-2 py-1 border rounded" />
                    </div> */}
                    {/* <div className="mb-4">
                        <label htmlFor="password" className="text-lg">Password:</label>
                        <input type="password" id="password" className="w-full px-1 py-1 border rounded" />
                    </div> */}
                    <Link to="/dashboard" className='text-blue-500' >
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full">{button}</button>
                    </Link>
                </form>
            </div>
            <p className='text-center mt-2'>{linkdesc}
                <Link to={link} className='text-blue-500' > {toLink}</Link>  
            </p>
        </div>
    )
}

export default MainForm