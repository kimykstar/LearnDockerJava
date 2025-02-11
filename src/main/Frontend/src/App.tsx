import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LandingPage from './components/staticpages/LandingPage';
import WhatIsDockerPage from './components/staticpages/DockerPage';
import WhatIsDockerImagePage from './components/staticpages/DockerImagePage';
import DockerContainerLifeCyclePage from './components/staticpages/DockerContainerLifeCyclePage';
import DockerContainerPage from './components/staticpages/DockerContainerPage';
import ErrorPage from './components/ErrorPage';
import { Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useRef, useState } from 'react';
import { QuizPage } from './components/quiz/QuizPage';
import { Alert } from 'flowbite-react';
import { useAlert } from './hooks/useAlert';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSidebar } from './hooks/useSidebar';
import { TimerModal } from './components/modals/TimerModal';
import { handleBeforeUnload } from './handlers/handler';
import GoogleRedirection from './oauth/GoogleRedirection.tsx';

const queryClient = new QueryClient();
const App = () => {
    const { openAlert, message, showAlert } = useAlert();
    const { sidebarStates, setSidebarStates } = useSidebar();
    const [openTimerModal, setOpenTimerModal] = useState(false);
    const startButtonRef = useRef<HTMLButtonElement | null>(null);
    const { dockerImageStates, dockerContainerStates } = sidebarStates;

    useEffect(() => {
        AOS.init({
            duration: 500,
        });

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <div className='w-full overflow-x-hidden overflow-y-hidden'>
                <Alert
                    color='failure'
                    className={`fixed left-1/2 -translate-x-1/2 top-6 z-50 transition-all duration-500 ease-in-out ${
                        openAlert ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
                    }`}
                >
                    {message}
                </Alert>
                <Header />
                <div className='flex font-pretendard'>
                    <Sidebar
                        startButtonRef={startButtonRef}
                        setOpenTimerModal={setOpenTimerModal}
                        dockerImageStates={dockerImageStates}
                        dockerContainerStates={dockerContainerStates}
                    />
                    <div className='ml-[17rem] mt-16 px-12 py-6 w-[calc(100vw-17rem)] overflow-y-auto z-0'>
                        <Routes>
                            <Route
                                path='/'
                                element={<LandingPage startButtonRef={startButtonRef} />}
                            />
                            <Route
                                path='/login/google'
                                element={<GoogleRedirection/>}
                            />

                            <Route path='/what-is-docker' element={<WhatIsDockerPage />} />
                            <Route
                                path='/what-is-docker-image'
                                element={<WhatIsDockerImagePage />}
                            />
                            <Route
                                path='/what-is-docker-container'
                                element={<DockerContainerPage />}
                            />
                            <Route
                                path='/what-is-container-lifecycle'
                                element={<DockerContainerLifeCyclePage />}
                            />
                            <Route
                                path='/quiz/:quizId'
                                element={
                                    <QuizPage
                                        showAlert={showAlert}
                                        sidebarStates={sidebarStates}
                                        setSidebarStates={setSidebarStates}
                                    />
                                }
                            />
                            <Route path='/error/:id' element={<ErrorPage />} />
                            <Route path='*' element={<ErrorPage />} />
                        </Routes>
                    </div>
                </div>
            </div>
            <TimerModal openTimerModal={openTimerModal} setOpenTimerModal={setOpenTimerModal} />
        </QueryClientProvider>
    );
};

export default App;
