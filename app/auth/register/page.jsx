'use client';

import { useState } from 'react';
import Image from 'next/image';
import Google from '../../assets/google.webp';
import axios from 'axios';
import routes from '../../../lib/routes';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);

            if (res.status !== 200 && res.status !== 201) {
                alert(res.data.message || 'Registration failed');
            } else {
                alert('Registered successfully!');
                router.push(routes.dashboard);
            }
        } catch (error) {
            alert('Something went wrong: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="w-full flex space-x-4">
                        <div>
                            <label className="text-gray-600 font-medium w-50">Name</label>
                            <input
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-4 focus:ring-green-400/40 focus:ring-offset-2 shadow-sm transition-all duration-200 border-gray-300"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-gray-600 font-medium w-50">Username</label>
                            <input
                                name="username"
                                type="text"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-4 focus:ring-green-400/40 focus:ring-offset-2 shadow-sm transition-all duration-200 border-gray-300"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-gray-600 font-medium">Email</label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-4 focus:ring-green-400/40 focus:ring-offset-2 shadow-sm transition-all duration-200 border-gray-300"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-gray-600 font-medium">Password</label>
                        <input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-4 focus:ring-green-400/40 focus:ring-offset-2 shadow-sm transition-all duration-200 border-gray-300"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 cursor-pointer text-white font-semibold py-4 px-2 rounded-full transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
                    >
                        Register
                    </button>
                </form>

                <p className="text-sm text-gray-600 text-center mt-4">
                    Already have an account?{' '}
                    <a href="/auth/login" className="text-blue-600 hover:underline">
                        Login
                    </a>
                </p>

                <div className="flex items-center justify-center mt-6">
                    <button className="flex items-center justify-center w-auto bg-white hover:bg-gray-100 font-semibold p-4 rounded-full border cursor-pointer border-gray-300 shadow-md transition-all duration-200">
                        <Image src={Google} alt="Google" width={20} height={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
