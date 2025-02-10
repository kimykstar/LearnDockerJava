import { useParams } from 'react-router-dom';

const ErrorPage = () => {
    const { id } = useParams();
    const statusCode = id ? parseInt(id) : 404;

    const errorMessages: Record<number, string> = {
        403: 'Forbidden',
        404: 'Page not found',
        500: 'Internal server error',
    };

    const message =
        statusCode && statusCode in errorMessages ? errorMessages[statusCode] : 'Unhandled error';

    return (
        <div className='w-full flex flex-col items-center justify-start font-pretendard'>
            <h1 className='font-bold text-5xl text-gray-950'>{statusCode}</h1>
            <p className='font-medium text-2xl text-gray-700'>{message}</p>
        </div>
    );
};

export default ErrorPage;
