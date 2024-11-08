// Profile.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import hive from '@hiveio/hive-js';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const username = localStorage.getItem('hive_username');
        if (!username) {
            navigate('/login');
            return;
        }

        // Fetch user data from Hive blockchain
        hive.api.getAccounts([username], (err, result) => {
            if (err) {
                console.error('Error fetching user info:', err);
                setError(err.message || 'Failed to fetch user information');
                setLoading(false);
                return;
            }

            if (result && result.length > 0) {
                setUser(result[0]);
            } else {
                setError('Account not found');
            }
            setLoading(false);
        });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('hive_username');
        localStorage.removeItem('hive_publicKey');
        navigate('/login');
    };

    if (loading) {
        return <div>Loading user information...</div>;
    }

    if (error) {
        return (
            <div>
                <p>Error: {error}</p>
                <button onClick={handleLogout}>Back to Login</button>
            </div>
        );
    }

    if (!user) {
        return <div>No user information available. Please try logging in again.</div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-300">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>
                <div className="mb-4">
                    <strong>Username:</strong> {user.name}
                </div>
                <div className="mb-4">
                    <strong>Reputation:</strong> {hive.formatter.reputation(user.reputation)}
                </div>
                <div className="mb-4">
                    <strong>Balance:</strong> {user.balance}
                </div>
                <div className="mb-4">
                    <strong>Voting Power:</strong> {user.voting_power}
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;