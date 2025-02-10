import { useState, useEffect } from 'react';
import dropDownImage from '../assets/dropDown.svg';
import StartButton from './StartButton';
import { SidebarSectionProps, SidebarState } from '../types/sidebar';
import TimerArea from './TimerArea';
import PageInfoArea from './PageInfoArea';
import { Check } from 'lucide-react';

const links = [
    { title: 'Home', path: '/', pageType: 'education' },
    { title: 'Docker란?', path: '/what-is-docker', pageType: 'education' },
];

const SidebarSection = ({ title, links }: SidebarSectionProps) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <>
            <div className='mx-4 mt-2 flex items-center  border-b-2 border-gray-400 text-xl'>
                <p>{title}</p>
                <button onClick={toggleDropdown}>
                    <img
                        src={dropDownImage}
                        className={`transition-transform duration-300 ${isOpen ? '' : 'rotate-180'}`}
                        style={{ width: '2em', height: '2em' }}
                    />
                </button>
            </div>
            {isOpen && (
                <ul>
                    {links.map((link) => {
                        return (
                            <li className='mx-4 mt-2 hover:text-Moby-Blue' key={link.path}>
                                <div className='flex justify-between'>
                                    <PageInfoArea
                                        path={link.path}
                                        title={link.title}
                                        pageType={link.pageType}
                                    />
                                    {link.pageType === 'quiz' && link.solved && (
                                        <Check className='ml-1 text-green-500' />
                                    )}
                                </div>
                                <hr className='mt-1' />
                            </li>
                        );
                    })}
                </ul>
            )}
        </>
    );
};

type SidebarProps = {
    dockerImageStates: Array<SidebarState>;
    dockerContainerStates: Array<SidebarState>;
    setOpenTimerModal: React.Dispatch<React.SetStateAction<boolean>>;
    startButtonRef: React.MutableRefObject<HTMLButtonElement | null>;
};

const Sidebar = ({
    setOpenTimerModal,
    startButtonRef,
    dockerImageStates,
    dockerContainerStates,
}: SidebarProps) => {
    const [maxAge, setMaxAge] = useState<number>(0);
    const endDate = window.sessionStorage.getItem('endDate');
    useEffect(() => {
        setMaxAge(Number(endDate));
    }, []);

    return (
        <nav className='fixed h-[calc(100vh-4rem)] w-[17rem] bg-gray-100 mt-16 flex flex-col justify-between'>
            <div className='flex-grow'>
                {links.map((link) => {
                    const { path, title, pageType } = link;
                    return (
                        <div
                            className='flex mx-4 mt-2 pb-2 border-b-2 border-gray-400 text-xl hover:text-Moby-Blue  justify-between'
                            key={path}
                        >
                            <PageInfoArea path={path} title={title} pageType={pageType} />
                        </div>
                    );
                })}
                <SidebarSection title='Docker Image 학습' links={dockerImageStates} />
                <SidebarSection title='Docker Container 학습' links={dockerContainerStates} />
            </div>
            <div className='sticky bottom-0'>
                {maxAge ? (
                    <TimerArea
                        expirationTime={maxAge}
                        setMaxAge={setMaxAge}
                        setOpenTimerModal={setOpenTimerModal}
                    />
                ) : (
                    <StartButton startButtonRef={startButtonRef} setMaxAge={setMaxAge} />
                )}
            </div>
        </nav>
    );
};

export default Sidebar;
