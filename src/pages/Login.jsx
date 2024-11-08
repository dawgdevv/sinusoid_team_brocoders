// Login.jsx
import { KeychainSDK } from 'keychain-sdk';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleKeychainLogin = async () => {
        setLoading(true);
        setError(null);

        try {
            const keychain = new KeychainSDK(window);

            // Check if Keychain is installed
            const isKeychainInstalled = await keychain.isKeychainInstalled();

            if (!isKeychainInstalled) {
                throw new Error('Please install Hive Keychain browser extension first');
            }

            // Generate random string for login challenge
            const loginMessage = JSON.stringify({
                type: 'login',
                app: 'DTIX',
                timestamp: Date.now()
            });

            // Request login with Keychain
            const login = await keychain.login({
                username: 'bluegreenred', // Empty username lets user choose account
                message: loginMessage,
                method: 'Posting',
                title: 'Login to DTIX',
                // Add error handling options
                check: true,
                signedMessageId: 'login'
            });

            if (login?.success && login?.data?.username) {
                // Store login data
                localStorage.setItem('hive_username', login.data.username);
                localStorage.setItem('hive_publicKey', login.data.publicKey);
                localStorage.setItem('hive_method', 'keychain');

                // Navigate to profile
                navigate('/profile');
            } else {
                throw new Error(login?.error || 'Login failed. Please try again.');
            }

        } catch (err) {
            console.error('Login error:', err);
            setError(err.message || 'Failed to login. Please make sure Hive Keychain is installed and unlocked.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-300">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login with Hive</h2>
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                        {error}
                    </div>
                )}
                <button
                    onClick={handleKeychainLogin}
                    disabled={loading}
                    className={`w-full bg-black text-white py-2 px-4 rounded-md transition-colors ${loading ? 'bg-gray-500 cursor-not-allowed' : 'hover:bg-green-600'
                        }`}
                >
                    {loading ? 'Connecting...' : 'Login with Hive Keychain'}
                </button>
                <p className="mt-4 text-sm text-center text-gray-600">
                    Please install Hive Keychain browser extension if you haven&apos;t already
                </p>
                <a
                    href="https://chrome.google.com/webstore/detail/hive-keychain/jcacnejopjdphbnjgfaaobbfafkihpep"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-sm text-center block text-blue-600 hover:text-blue-800"
                >
                    Get Hive Keychain Extension
                </a>
            </div>
        </div>
    );
};

export default Login;