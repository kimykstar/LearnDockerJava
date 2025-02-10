import { useEffect } from 'react';
import axios from 'axios';


const GoogleRedirection = () => {

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get('code') as string;

        axios.post('http://localhost:3000/api/login/google', {
            code: code
        });
        location.href='http://localhost:3000';
    }, []);


    return <></>
}

export default GoogleRedirection;