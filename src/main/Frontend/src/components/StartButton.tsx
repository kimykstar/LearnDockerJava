import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createHostContainer } from '../api/quiz';
import { LoaderCircle } from 'lucide-react';
type StartButtonProps = {
    setMaxAge: React.Dispatch<React.SetStateAction<number>>;
    startButtonRef: React.MutableRefObject<HTMLButtonElement | null>;
};

const StartButton = (props: StartButtonProps) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { setMaxAge, startButtonRef } = props;

    const handleButtonClick = async () => {
        setLoading(true);
        const endDate = await createHostContainer(navigate);
        const endDateTime = new Date(endDate).getTime();
        if (endDate) {
            setLoading(false);
            setMaxAge(endDateTime);
            sessionStorage.setItem('quiz', '1');
            window.sessionStorage.setItem('endDate', endDateTime.toString());
        }
    };

    return (
        <div className=' bg-Moby-Blue py-4 m-4 rounded-lg'>
            <button
                className='w-full text-white text-xl flex items-center justify-center gap-2 disabled:opacity-70'
                onClick={handleButtonClick}
                disabled={loading}
                ref={startButtonRef}
            >
                {loading ? (
                    <>
                        <LoaderCircle className='w-3 h-3 animate-spin' />
                        <span>loading</span>
                    </>
                ) : (
                    '학습 시작하기'
                )}
            </button>
        </div>
    );
};

export default StartButton;
