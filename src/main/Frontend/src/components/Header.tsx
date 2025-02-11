import mainLogo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { LockKeyholeOpen } from 'lucide-react';

const Header = () => {
    const handleGoogleOAuth = () => {
        const clientId = '275531340468-ulps7hddjvu7v38o8441m2knkdp82via.apps.googleusercontent.com';
        const redirectUri = 'http://localhost:3000/login/google';
        const scope = 'https://www.googleapis.com/auth/userinfo.email';
        const responseType = 'code';
        const authUrl = `http://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

        location.href=authUrl;
    };

    return (
        <header className='fixed w-full h-16 bg-blue-600 flex items-center z-10 justify-between'>
            <Link to='/' className='ml-4 gap-2 flex items-center'>
                <img src={mainLogo} alt='main logo' className='h-12 w-12' />
                <h1 className='font-pretendard font-bold text-white text-2xl'>Learn Docker</h1>
            </Link>
            <LockKeyholeOpen
                onClick={handleGoogleOAuth}
                className='text-white cursor-pointer mr-4'
            />
        </header>
    );
};

export default Header;
