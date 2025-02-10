export type Quiz = {
    id: number;
    title: string;
    content: string | undefined;
    hint: string | undefined;
};

export type SubmitStatus = 'SUCCESS' | 'FAIL';

export type QuizResult = {
    quizResult: SubmitStatus;
};

export type QuizTextAreaProps = {
    updateVisualizationData: () => Promise<void>;
};
