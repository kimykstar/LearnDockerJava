import { Button, Modal } from 'flowbite-react';
import { Clock } from 'lucide-react';

type TimerMoalProps = {
    openTimerModal: boolean;
    setOpenTimerModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TimerModal = (props: TimerMoalProps) => {
    const { openTimerModal, setOpenTimerModal } = props;
    return (
        <>
            <Modal show={openTimerModal} size='md' onClose={() => setOpenTimerModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <Clock className='mx-auto mb-4 h-14 w-14 text-green-500'></Clock>
                    <div className='text-center'>
                        <h3 className='mb-5 text-lg font-normal text-gray-600'>
                            학습 종료 시간이 10분 남았습니다.
                        </h3>
                        <Button
                            color='gray'
                            className='w-full bg-sky-400 hover:bg-sky-500'
                            onClick={() => setOpenTimerModal(false)}
                        >
                            확인
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};
