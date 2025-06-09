// 'use client';

// import { useSession, signIn } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { useState, useEffect } from 'react';
// import GoogleSignInButton from '../../../components/GoogleSignInButton';
// import routes from '../../../lib/routes';

// export default function LoginPage() {
//     const { data: session, status } = useSession();
//     const router = useRouter();

//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const [error, setError] = useState('');

//     useEffect(() => {
//         if (status === 'authenticated') {
//             router.replace(routes.dashboard);
//         }
//     }, [status, router]);

//     if (status === 'loading') return <p>Loading...</p>;

//     const handleChange = (e) => {
//         setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//         setError('');
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const result = await signIn('credentials', {
//             redirect: false,
//             email: formData.email,
//             password: formData.password,
//             callbackUrl: routes.dashboard,
//         });

//         if (result?.error) {
//             setError('Invalid credentials. Please try again.');
//         } else if (result?.ok) {
//             router.refresh();
//             router.replace(routes.dashboard);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center px-4">
//             <div className="p-8 w-full max-w-md">
//                 <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
//                 <form onSubmit={handleSubmit} className="space-y-5" noValidate>
//                     <div>
//                         <label className="text-gray-600 font-medium">Email</label>
//                         <input
//                             name="email"
//                             type="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                             placeholder="Enter your email"
//                             className={`w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-4 focus:ring-green-400/40 focus:ring-offset-2 shadow-sm transition-all duration-200 border-gray-300 ${error ? 'border-red-500' : ''
//                                 }`}
//                         />
//                     </div>
//                     <div>
//                         <label className="text-gray-600 font-medium">Password</label>
//                         <input
//                             name="password"
//                             type="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             required
//                             placeholder="Enter your password"
//                             className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-4 focus:ring-green-400/40 focus:ring-offset-2 shadow-sm transition-all duration-200 border-gray-300"
//                         />
//                     </div>
//                     {error && <p className="text-red-500 text-sm">{error}</p>}
//                     <button
//                         type="submit"
//                         className="w-full bg-green-600 hover:bg-green-700 cursor-pointer text-white font-semibold py-4 px-2 rounded-full transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
//                     >
//                         Login
//                     </button>
//                 </form>

//                 <p className="text-sm text-gray-600 text-center mt-4">
//                     Don't have an account?{' '}
//                     <a href="/auth/register" className="text-blue-600 hover:underline">
//                         Register
//                     </a>
//                 </p>

//                 <GoogleSignInButton callbackUrl={routes.dashboard} />
//             </div>
//         </div>
//     );
// }

'use client';

import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import GoogleSignInButton from '../../../components/GoogleSignInButton';
import routes from '../../../lib/routes';

export default function LoginPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log('Login page - Session status:', status, 'Session:', session);
        
        if (status === 'authenticated' && session) {
            console.log('User authenticated, redirecting to dashboard');
            router.push(routes.dashboard);
        }
    }, [status, session, router]);

    // Show loading while session is being checked
    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    // If already authenticated, don't show login form
    if (status === 'authenticated') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Redirecting to dashboard...</p>
            </div>
        );
    }

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email: formData.email,
                password: formData.password,
            });

            console.log('SignIn result:', result);

            if (result?.error) {
                setError('Invalid credentials. Please try again.');
            } else if (result?.ok) {
                // Force refresh the session
                window.location.href = routes.dashboard;
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div>
                        <label className="text-gray-600 font-medium">Email</label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                            placeholder="Enter your email"
                            className={`w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-4 focus:ring-green-400/40 focus:ring-offset-2 shadow-sm transition-all duration-200 border-gray-300 ${error ? 'border-red-500' : ''} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        />
                    </div>
                    <div>
                        <label className="text-gray-600 font-medium">Password</label>
                        <input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                            placeholder="Enter your password"
                            className={`w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-4 focus:ring-green-400/40 focus:ring-offset-2 shadow-sm transition-all duration-200 border-gray-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-2 rounded-full transition-all duration-300 ease-in-out shadow-md hover:shadow-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="text-sm text-gray-600 text-center mt-4">
                    Don't have an account?{' '}
                    <a href="/auth/register" className="text-blue-600 hover:underline">
                        Register
                    </a>
                </p>

                <GoogleSignInButton callbackUrl={routes.dashboard} />
            </div>
        </div>
    );
}