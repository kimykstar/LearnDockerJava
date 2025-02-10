import { useEffect, useState } from 'react';
import { HOUR, MINUTE, SECOND } from '../constant/timer';
import { requestReleaseSession } from '../api/quiz';

const parseTime = (time: number) => {
    const hour = Math.floor(time / HOUR);
    time %= HOUR;
    const minute = Math.floor(time / MINUTE);
    time %= MINUTE;
    const second = Math.floor(time / 1000);

    return `${String(hour).padStart(2, '0')} : ${String(minute).padStart(2, '0')} : ${String(second).padStart(2, '0')}`;
};

type TimerProps = {
    expirationTime: number;
    setMaxAge: React.Dispatch<React.SetStateAction<number>>;
    setOpenTimerModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Timer = (props: TimerProps) => {
    const { expirationTime, setMaxAge, setOpenTimerModal } = props;
    const [leftTime, setLeftTime] = useState(expirationTime - new Date().getTime());
    useEffect(() => {
        const timer = setInterval(() => setLeftTime(leftTime - SECOND), SECOND);
        if (leftTime <= SECOND) {
            requestReleaseSession();
            clearInterval(timer);
            setMaxAge(0);
            window.sessionStorage.removeItem('endDate');
        }
        if (10 * MINUTE <= leftTime && leftTime <= 10 * MINUTE + SECOND) {
            setOpenTimerModal(true);
        }

        if (leftTime < 0) clearInterval(timer);

        return () => {
            clearInterval(timer);
        };
    }, [leftTime]);

    return (
        <>
            <span className='flex justify-center align-middle font-bold text-Moby-Blue text-3xl content-center mb-2'>
                {parseTime(leftTime)}
            </span>
        </>
    );
};
