import { Client } from 'hivesigner';

const Login = () => {
    const handleHivesignerLogin = () => {
        const client = new Client({
            app: 'demo-app',// Do not change this if chainging please review hivesigner signing permission
            callbackURL: 'http://localhost:5173/auth/hivesigner/callback',//this you callback url where user will be redirected after login on profile page
            scope: ['vote', 'comment']
        });
        const loginUrl = client.getLoginURL();
        window.location.href = loginUrl;
    };

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
