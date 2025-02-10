import { SidebarState } from '../types/sidebar';

export const updateSidebarState = (states: Array<SidebarState>, quizNumber: number) => {
    states.forEach((state) => {
        const currentQuizNum = Number(state.path.split('/').slice(-1));
        if (state.pageType === 'quiz' && currentQuizNum <= quizNumber) {
            state.solved = true;
        }
    });
};
