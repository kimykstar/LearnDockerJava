import { Timer } from './Timer';
import StopButton from './StopButton';

type TimerAreaProps = {
    expirationTime: number;
    setMaxAge: React.Dispatch<React.SetStateAction<number>>;
    setOpenTimerModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const TimerArea = ({ expirationTime, setMaxAge, setOpenTimerModal }: TimerAreaProps) => {
    return (
        <div className='p-2'>
            <span className='w-full text-gray-400 text-sm flex justify-center align-middle'>
                남은 학습시간
            </span>
            <Timer
                expirationTime={expirationTime}
                setMaxAge={setMaxAge}
                setOpenTimerModal={setOpenTimerModal}
            />
            <StopButton setMaxAge={setMaxAge} />
        </div>
    );
};

export default TimerArea;
