// Login.jsx
import { Client } from 'hivesigner';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Check if we're in callback mode (have query parameters)
        if (location.search) {
            const urlParams = new URLSearchParams(location.search);
            const accessToken = urlParams.get('access_token');

            if (accessToken) {
                console.log('Hivesigner access token:', accessToken);
                localStorage.setItem('hivesigner_token', accessToken);
                navigate('/profile');
            } else {
                console.error('No access token found');
            }
        }
    }, [navigate, location]);

    const handleHivesignerLogin = () => {
        const client = new Client({
            app: 'demo-app',
            callbackURL: import.meta.env.VITE_CALLBACK_URL,  // Updated callback URL
            scope: ['vote', 'comment']
        });
        const loginUrl = client.getLoginURL();
        window.location.href = loginUrl;
    };

    // Show loading state if processing callback
    if (location.search) {
        return <div>Processing Hivesigner login...</div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-300">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <button
                    onClick={handleHivesignerLogin}
                    className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-green-600 "
                >
                    Log in with Hivesigner
                </button>
            </div>
        </div>
    );
};

export default Login;