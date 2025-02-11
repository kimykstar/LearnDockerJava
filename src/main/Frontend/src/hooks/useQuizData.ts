import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { requestQuizData } from '../api/quiz';

export const useQuizData = (quizId: string) => {
    const navigate = useNavigate();

    const {
        data: quizData,
        isPending,
        isError,
    } = useQuery({
        queryKey: ['quiz', quizId],
        queryFn: () => requestQuizData(quizId, navigate),
        staleTime: Infinity, // 데이터를 항상 fresh하게 유지
        gcTime: Infinity, // 캐시를 영구적으로 유지
    });

    return {
        id: quizData?.id ?? 0,
        title: quizData?.title ?? '',
        content: quizData?.content ?? '',
        hint: quizData?.hint ?? '',
        isPending,
        isError,
    };
};
