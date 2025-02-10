import { QuizNodes } from './QuizNodes';
import { VisualizationNodes } from './VisualizationNodes';
import { QuizPageWrapper } from './QuizPageWrapper';
import { SidebarElementsProps } from '../../types/sidebar';

type QuizContentProps = {
    showAlert: (message: string) => void;
    quizId: string;
    sidebarStates: SidebarElementsProps;
    setSidebarStates: React.Dispatch<React.SetStateAction<SidebarElementsProps>>;
    setUserLevel: React.Dispatch<React.SetStateAction<number>>;
};

type QuizPageProps = {
    showAlert: (message: string) => void;
    sidebarStates: SidebarElementsProps;
    setSidebarStates: React.Dispatch<React.SetStateAction<SidebarElementsProps>>;
};

export const QuizContent = ({
    showAlert,
    quizId,
    sidebarStates,
    setSidebarStates,
    setUserLevel,
}: QuizContentProps) => {
    const quizNodes = QuizNodes({
        showAlert,
        quizId,
        sidebarStates,
        setSidebarStates,
        setUserLevel,
    });

    const visualNodes = VisualizationNodes({ showAlert });

    return (
        <>
            {quizNodes.head}
            <div className='flex flex-col gap-3 h-[calc(100vh-10rem)] justify-between'>
                <div className='flex gap-3 flex-1'>
                    {quizNodes.description}
                    {visualNodes.visualization}
                </div>
                <div className='flex flex-col 2xl:flex-row gap-3 2xl:gap-5 flex-1 flex-wrap'>
                    {visualNodes.terminal}
                    {quizNodes.submit}
                </div>
            </div>
        </>
    );
};

export const QuizPage = ({ showAlert, sidebarStates, setSidebarStates }: QuizPageProps) => {
    return (
        <QuizPageWrapper showAlert={showAlert}>
            {(quizId, setUserLevel) => (
                <QuizContent
                    showAlert={showAlert}
                    quizId={quizId}
                    sidebarStates={sidebarStates}
                    setSidebarStates={setSidebarStates}
                    setUserLevel={setUserLevel}
                />
            )}
        </QuizPageWrapper>
    );
};
