import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { requestQuizAccessability } from '../../api/quiz';
import { HttpStatusCode } from 'axios';

type QuizPageWrapperProps = {
    children: (
        quizId: string,
        setUserLevel: React.Dispatch<React.SetStateAction<number>>
    ) => React.ReactNode;
    showAlert: (message: string) => void;
};

export const QuizPageWrapper = ({ children, showAlert }: QuizPageWrapperProps) => {
    const { quizId } = useParams<{ quizId: string }>();
    const quizNumber = Number(quizId);
    const [userLevel, setUserLevel] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        const validateQuiz = async () => {
            if (Number.isNaN(quizNumber) || quizNumber < 1 || quizNumber > 10) {
                navigate('/error/404');
                return;
            }

            const accessStatus = await requestQuizAccessability(quizNumber);

            if (!accessStatus) {
                return;
            }
            if (accessStatus === HttpStatusCode.Forbidden) {
                showAlert('이전 퀴즈를 먼저 완료해주세요.');
                navigate('/');
                return;
            }
            if (accessStatus === HttpStatusCode.Unauthorized) {
                showAlert('학습 시작 버튼을 먼저 눌러주세요.');
                navigate('/');
                return;
            }

            if (userLevel < quizNumber) {
                setUserLevel(quizNumber);
            }
        };

        validateQuiz();
    }, [quizNumber, navigate, showAlert]);

    if (userLevel < quizNumber) {
        return null;
    }

    return <div className='h-[calc(100vh-7rem)]'>{children(quizId as string, setUserLevel)}</div>;
};
