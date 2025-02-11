import { Button, Modal } from 'flowbite-react';
import { CircleCheckBig, CircleAlert } from 'lucide-react';
import { SubmitStatus } from '../../types/quiz';

type ModalProps = {
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
    submitResult: SubmitStatus;
    handleNextButtonClick: () => void;
};

type ModalContentProps = {
    setOpenModal: (open: boolean) => void;
    handleNextButtonClick?: () => void;
};

const CorrectModalContent = ({ setOpenModal, handleNextButtonClick }: ModalContentProps) => (
    <div className='text-center'>
        <CircleCheckBig className='mx-auto mb-4 h-14 w-14 text-green-500' />
        <h3 className='mb-5 text-lg font-normal text-gray-600'>정답입니다!</h3>
        <div className='flex justify-center gap-4'>
            <Button color='gray' onClick={() => setOpenModal(false)}>
                문제로 돌아가기
            </Button>
            <Button
                className='bg-sky-400 hover:bg-sky-500'
                onClick={() => {
                    setOpenModal(false);
                    if (handleNextButtonClick) {
                        handleNextButtonClick();
                    }
                }}
            >
                다음 문제 풀기
            </Button>
        </div>
    </div>
);

const WrongModalContent = ({ setOpenModal }: ModalContentProps) => (
    <div className='text-center'>
        <CircleAlert className='mx-auto mb-4 h-14 w-14 text-red-600' />
        <h3 className='mb-5 text-lg font-normal text-gray-600'>오답입니다!</h3>
        <div className='flex justify-center gap-4'>
            <Button color='gray' onClick={() => setOpenModal(false)}>
                문제 다시 풀기
            </Button>
        </div>
    </div>
);

export const QuizSubmitResultModal = ({
    openModal,
    setOpenModal,
    submitResult,
    handleNextButtonClick,
}: ModalProps) => {
    return (
        <>
            <Modal show={openModal} size='md' onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    {submitResult === 'SUCCESS' ? (
                        <CorrectModalContent
                            setOpenModal={setOpenModal}
                            handleNextButtonClick={handleNextButtonClick}
                        />
                    ) : (
                        <WrongModalContent setOpenModal={setOpenModal} />
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
};
