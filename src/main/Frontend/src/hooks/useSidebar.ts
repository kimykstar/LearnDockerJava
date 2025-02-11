import { dockerImageInitStates, dockerContainerInitStates } from '../constant/sidebarStatus';
import { useState } from 'react';
import { SidebarElementsProps, SidebarState } from '../types/sidebar';
import { updateSidebarState } from '../utils/sidebarUtils';

export const useSidebar = () => {
    const imageStates = [...dockerImageInitStates];
    const containerStates = [...dockerContainerInitStates];
    const getSidebarInitState = (
        imageStates: SidebarState[],
        containerStates: SidebarState[],
        quizNum: number
    ) => {
        updateSidebarState(imageStates, quizNum - 1);

        if (4 <= quizNum && quizNum <= 10) {
            updateSidebarState(containerStates, quizNum - 1);
        }
        return {
            dockerImageStates: imageStates,
            dockerContainerStates: containerStates,
        };
    };
    const { dockerImageStates, dockerContainerStates } = getSidebarInitState(
        imageStates,
        containerStates,
        Number(sessionStorage.getItem('quiz'))
    ) as SidebarElementsProps;
    const [sidebarStates, setSidebarStates] = useState<SidebarElementsProps>({
        dockerImageStates,
        dockerContainerStates,
    });
    return { sidebarStates, setSidebarStates };
};
