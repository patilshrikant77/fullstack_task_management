import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import UserService from '../services/UserService';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';


const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');

        try {
            // Implement registration logic here
            // For example, call UserService.register(email, password, dispatch);
            // After successful registration, navigate to login page
        } catch (error: any) {
            setError(error.message || 'Failed to register. Please try again later.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <section className="bg-white p-6 rounded-md shadow-md">
                <p className={`errmsg ${error ? '' : 'offscreen'}`} aria-live="assertive">{error}</p>
                <h1 className="text-4xl font-bold mb-8">Register</h1>
                <form onSubmit={handleSubmit} className="mb-4">
                    <label htmlFor="email" className="block mb-2">Email:</label>
                    <input
                        type="text"
                        id="email"
                        autoComplete="off"
                        required
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="password" className="block mb-2">Password:</label>
                    <input
                        type="password"
                        id="password"
                        required
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="btn-primary px-4 py-2 rounded-md w-full text-white bg-[#635fc7] dark:bg-[#2b2c37]">Register</button>
                </form>
                <p>Already have an account?
                    <button className="text-primary mx-1 font-medium text-[#635fc7] dark:text-[#2b2c37]" onClick={() => navigate('/signin')}>Sign In</button>
                </p>
            </section>
        </div>
    );
};

export default Register;
