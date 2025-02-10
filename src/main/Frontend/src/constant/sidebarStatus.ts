import { SidebarState } from '../types/sidebar';

export const dockerImageInitStates: SidebarState[] = [
    {
        title: 'Docker image란?',
        path: '/what-is-docker-image',
        pageType: 'education',
    },
    { title: 'image 가져오기', path: '/quiz/1', pageType: 'quiz', solved: false },
    { title: 'image 목록 확인하기', path: '/quiz/2', pageType: 'quiz', solved: false },
    { title: 'image 삭제하기', path: '/quiz/3', pageType: 'quiz', solved: false },
];

export const dockerContainerInitStates: SidebarState[] = [
    {
        title: 'Docker Container란?',
        path: '/what-is-docker-container',
        pageType: 'education',
    },
    {
        title: 'Container의 생명주기',
        path: '/what-is-container-lifecycle',
        pageType: 'education',
    },
    { title: 'Container 생성하기', path: '/quiz/4', pageType: 'quiz', solved: false },
    { title: 'Container 실행하기', path: '/quiz/5', pageType: 'quiz', solved: false },
    { title: 'Container 생성 및 실행하기', path: '/quiz/6', pageType: 'quiz', solved: false },
    { title: 'Container 로그 확인하기', path: '/quiz/7', pageType: 'quiz', solved: false },
    { title: 'Container 목록 확인하기', path: '/quiz/8', pageType: 'quiz', solved: false },
    { title: 'Container 중지하기', path: '/quiz/9', pageType: 'quiz', solved: false },
    { title: 'Container 삭제하기', path: '/quiz/10', pageType: 'quiz', solved: false },
];
