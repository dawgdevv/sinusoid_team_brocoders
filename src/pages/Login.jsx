// Login.jsx
import { KeychainSDK } from 'keychain-sdk';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');

    const handleKeychainLogin = async () => {
        try {
            const keychain = new KeychainSDK(window);

            // Check if Keychain is installed
            const isKeychainInstalled = await keychain.isKeychainInstalled();

            if (!isKeychainInstalled) {
                throw new Error('Please install Hive Keychain first');
            }

            // Generate random string for login challenge
            const loginMessage = JSON.stringify({
                login: Math.random().toString(36).substring(2),
                timestamp: Date.now()
            });

            // Request login with Keychain
            const login = await keychain.login({
                username: username,// Empty username lets user choose account
                message: loginMessage,
                method: 'Posting',
                title: 'Login to DTIX'
            });

            if (login && login.success) {
                // Store login data
                localStorage.setItem('hive_username', login.data.username);
                localStorage.setItem('hive_publicKey', login.data.publicKey);

                // Navigate to profile
                navigate('/profile');
            } else {
                throw new Error('Login failed');
            }

        } catch (err) {
            console.error('Login error:', err);
            setError(err.message || 'Failed to login');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-300">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                        {error}
                    </div>
                )}
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleKeychainLogin}
                    className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
                >
                    Login with Hive Keychain
                </button>
                <p className="mt-4 text-sm text-center text-gray-600">
                    Please make sure you have Hive Keychain installed
                </p>
            </div>
        </div>
    );
};

export default Login;