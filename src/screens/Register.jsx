
import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/user.context'
import axios from '../config/axios'
import toast from 'react-hot-toast'

const Register = () => {

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const { setUser } = useContext(UserContext)

    const navigate = useNavigate()

    function submitHandler(e) {
        e.preventDefault();
        axios.post('/users/register', { email, password })
            .then((res) => {
                console.log(res.data);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user)); // Store user
                setUser(res.data.user);
                toast.success('Registration successful!');
                navigate('/');
            })
            .catch((err) => {
                toast.error('Registration failed!');
                console.log(err.response.data);
            });
    }
    


    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="bg-zinc-900 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-white mb-6">Register</h2>
                <form
                    onSubmit={submitHandler}
                >
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-2" htmlFor="email">Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            className="w-full p-3 rounded bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-zinc-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)} s
                            type="password"
                            id="password"
                            className="w-full p-3 rounded bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-zinc-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 rounded bg-white text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-zinc-500 font-semibold cursor-pointer"
                    >
                        Register
                    </button>
                </form>
                <p className="text-gray-400 mt-4">
                    Already have an account? <Link to="/login" className="text-white! font-semibold hover:underline!">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Register