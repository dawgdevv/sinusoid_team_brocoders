import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Client } from 'hivesigner';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('hivesigner_token');
        if (!token) {
            navigate('/login');
            return;
        }

        const client = new Client({
            app: 'DTIX',
            accessToken: token
        });

        client.me((err, result) => {
            setLoading(false);
            if (err) {
                console.error('Error fetching user info:', err);
                setError(err.error_description || 'Failed to fetch user information');
            } else {
                setUser(result.account);
            }
        });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('hivesigner_token');
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
                    <strong>Reputation:</strong> {user.reputation}
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
