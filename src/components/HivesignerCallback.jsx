import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


const HivesignerCallback = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const accessToken = urlParams.get('access_token');

        if (accessToken) {
            console.log('Hivesigner access token:', accessToken);
            localStorage.setItem('hivesigner_token', accessToken);
            navigate('/profile');
        } else {
            console.error('No access token found');
            navigate('/login');
        }
    }, [navigate, location]);

    return <div>Processing Hivesigner login...</div>;
};

export default HivesignerCallback;
