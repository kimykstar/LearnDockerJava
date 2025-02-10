import axios from 'axios';
import { ExpirationTime } from '../types/timer';

export const requestExpirationTime = async (): Promise<ExpirationTime | object> => {
    try {
        const response = await axios.get<ExpirationTime>(`/api/sandbox/endDate`);
        return response.data;
    } catch (error) {
        console.error(error);
        return {
            maxAge: new Date(0).toString(),
        };
    }
};
