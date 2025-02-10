import { BookOpen, CircleHelp, Plug, Terminal, TrendingUp, View } from 'lucide-react';
import VisualizationGif from '../../assets/visualization-demo.gif';
import QuizPageImage from '../../assets/quiz-page-red-box.png';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

type LucideSvgIcon = typeof View;
type IntroCardProps = { title: string; description: string; Icon: LucideSvgIcon };
type DetailedCardProps = {
    title: string;
    subTitle: string;
    Icon: LucideSvgIcon;
    children: ReactElement;
    className?: string;
};

const LandingPage = ({
    startButtonRef,
}: {
    startButtonRef: React.MutableRefObject<HTMLButtonElement | null>;
}) => {
    return (
        <div className='w-full'>
            <Banner startButtonRef={startButtonRef} />

            <FeatureIntro />
            <hr />

            <StudyGuide />
            <hr />

            <QuizPageGuide />
            <hr />

            <VisualizationGuide />
        </div>
    );
};

const Banner = ({
    startButtonRef,
}: {
    startButtonRef: React.MutableRefObject<HTMLButtonElement | null>;
}) => {
    const navigate = useNavigate();

    return (
        <div className='bg-neutral-100 rounded-lg'>
            <div className='container mx-auto px-10 py-16'>
                <div className='max-w-3xl'>
                    <h1 className='text-4xl font-bold mb-6'>Docker를 쉽고 재미있게 배워보세요!</h1>
                    <p className='text-xl mb-8'>
                        실전 같은 환경에서 직접 실습하며 Docker의 개념과 사용법을 익혀보세요.
                        <br />
                        단계별 학습과 실시간 시각화로 더욱 효과적인 학습 경험을 제공합니다.
                    </p>
                    <button
                        className='bg-Moby-Blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors'
                        onClick={() => {
                            startButtonRef.current?.click();
                            navigate('/what-is-docker');
                        }}
                    >
                        지금 시작하기
                    </button>
                </div>
            </div>
        </div>
    );
};

const FeatureIntro = () => (
    <div className='container mx-auto px-4 py-16'>
        <h2 className='text-3xl mb-6'>기능 소개</h2>
        <div className='flex flex-col md:flex-row gap-8'>
            <IntroCard
                title={'단계별 학습'}
                description={
                    '기초 개념부터 실전 활용까지 체계적으로 학습하세요. 퀴즈를 통해 학습 내용을 점검하고 실력을 향상시킬 수 있습니다.'
                }
                Icon={TrendingUp}
            />
            <IntroCard
                title={'사용자별 도커 실습 환경 제공'}
                description={
                    '실제 Docker 환경에서 직접 명령어를 실행하고 결과를 확인하세요. 별도의 설치나 설정 없이 바로 학습을 시작할 수 있습니다.'
                }
                Icon={Plug}
            />
            <IntroCard
                title={'실시간 시각화'}
                description={
                    '컨테이너와 이미지의 상태 변화를 실시간으로 시각화하여 보여줍니다. 추상적인 개념을 직관적으로 이해할 수 있습니다.'
                }
                Icon={View}
            />
        </div>
    </div>
);

const IntroCard = ({ title, description, Icon }: IntroCardProps) => {
    return (
        <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
            <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4'>
                <Icon className='w-6 h-6 text-blue-600' />
            </div>
            <h3 className='text-xl font-semibold mb-3'>{title}</h3>
            <p className='text-gray-600'>{description}</p>
        </div>
    );
};

const StudyGuide = () => (
    <div className='container mx-auto px-4 py-16'>
        <h2 className='text-3xl mb-6'>학습 방법</h2>
        <div className='flex flex-col gap-12'>
            <DetailedCard
                title='학습 페이지'
                subTitle='Docker의 기본 개념과 CLI 사용법을 학습하세요'
                Icon={BookOpen}
            >
                <ol className='space-y-4 list-decimal list-inside'>
                    <li className='text-gray-700'>
                        <strong>Docker란?</strong>, <strong>Docker Image란?</strong>,{' '}
                        <strong>Docker Container란?</strong>,{' '}
                        <strong>Docker Container 생명주기</strong> 페이지에 접근하세요.
                    </li>
                    <li className='text-gray-700'>Docker의 개념과 사용법을 익혀보세요.</li>
                    <li className='text-gray-700'>
                        더 자세한 내용이나 옵션을 알고 싶다면, link된 Docker 공식 문서를 참고하세요.
                    </li>
                </ol>
            </DetailedCard>

            <DetailedCard
                title='퀴즈 페이지'
                subTitle='샌드박스 환경에서 퀴즈를 풀며 Docker 명령어를 실습하세요'
                Icon={Terminal}
            >
                <ol className='space-y-4 list-decimal list-inside'>
                    <li className='text-gray-700'>
                        Sidebar의 <strong>학습 시작하기</strong> 버튼을 눌러 세션을 받아주세요.
                        세션을 할당받으면 타이머가 시작됩니다.
                    </li>
                    <li className='text-gray-700'>
                        첫번째 문제인 <strong>Image 가져오기</strong> 페이지에 접근하세요.
                    </li>
                    <li className='text-gray-700'>
                        문제를 읽고, 명령창에 docker 명령어를 입력하세요.
                    </li>
                    <li className='text-gray-700'>
                        docker 명령어를 입력했을 때, docker Image와 Container의 변화가 시각적으로
                        나타나는 것을 확인해보세요.
                    </li>
                    <li className='text-gray-700'>
                        <strong>Image 목록 확인하기</strong>, <strong>Container 실행하기</strong>,{' '}
                        <strong>Container 생성 및 실행하기</strong>,
                        <strong>Container 목록 확인하기</strong> 문제는 답안란에 정답을 입력해야
                        합니다.
                    </li>
                    <li className='text-gray-700'>채점 버튼을 눌러 통과 여부를 확인하세요.</li>
                    <li className='text-gray-700'>다음 버튼을 눌러 다음 문제로 이동합니다.</li>
                </ol>
            </DetailedCard>
        </div>
    </div>
);

const QuizPageGuide = () => {
    const imageAlt = '번호가 매겨진 퀴즈 페이지의 요소';
    return (
        <div className='container mx-auto px-4 py-16'>
            <h2 className='text-3xl mb-6'>퀴즈 페이지 가이드</h2>
            <div className='flex flex-col lg:flex-row gap-8 items-start'>
                <DetailedCard
                    className='basis-2/5'
                    title='페이지 요소 설명'
                    subTitle='퀴즈 페이지에서 상호작용 가능한 요소를 확인하세요.'
                    Icon={CircleHelp}
                >
                    <ol className='space-y-4 list-decimal list-inside'>
                        <li className='text-gray-700'>
                            Docker 학습을 돕는 <strong>문제</strong>입니다. 잘 읽고 문제와 관련된
                            docker 명령어를 명령창에 입력하세요.
                        </li>
                        <li className='text-gray-700'>
                            <strong>명령창</strong>입니다. docker 명령어를 입력하여 실행 결과를
                            확인할 수 있습니다.
                        </li>
                        <li className='text-gray-700'>
                            <strong>컨테이너 목록 영역</strong>입니다. docker 명령어를 입력할 때마다
                            컨테이너의 상태 변화를 확인할 수 있습니다.
                        </li>
                        <li className='text-gray-700'>
                            <strong>이미지 목록 영역</strong>입니다. pull 받은 이미지 목록을 확인할
                            수 있습니다.
                        </li>
                        <li className='text-gray-700'>
                            <strong>답안란</strong>입니다. 답안란이 존재하는 문제는 답을 직접
                            입력해야 채점이 가능합니다.
                        </li>
                        <li className='text-gray-700'>
                            <strong>채점 버튼</strong>입니다. 문제가 요구하는 docker 명령을
                            수행하거나, 답안란에 정답을 입력한 뒤에 채점 버튼을 눌러주세요.
                        </li>
                        <li className='text-gray-700'>
                            <strong>이전 버튼</strong>입니다. 이전 문제로 이동할 수 있습니다.
                        </li>
                        <li className='text-gray-700'>
                            <strong>다음 버튼</strong>입니다. 현재 문제를 통과한 뒤에 다음 문제로
                            이동할 수 있습니다.
                        </li>
                    </ol>
                </DetailedCard>

                <div className='basis-3/5'>
                    <div className='bg-gray-100 rounded-xl overflow-hidden shadow-lg'>
                        <img
                            src={QuizPageImage}
                            alt={imageAlt}
                            className='w-full h-auto object-contain'
                        />
                        <div className='p-4 bg-white'>
                            <p className='text-gray-600 text-center'>{imageAlt}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const VisualizationGuide = () => {
    const imageAlt = '실시간 Docker 명령어 실행 및 상태 변화 시각화 예시';
    return (
        <div className='container mx-auto px-4 py-16'>
            <h2 className='text-3xl mb-6'>실시간 시각화 가이드</h2>
            <div className='flex flex-col lg:flex-row gap-8 items-start'>
                <DetailedCard
                    className='basis-2/5'
                    title='명령어 실행 과정 시각화'
                    subTitle='Docker 명령어를 입력할 때마다 실시간으로 컨테이너와 이미지의 상태 변화를 즉각적으로 확인할 수 있습니다.'
                    Icon={View}
                >
                    <ol className='space-y-4 list-decimal list-inside'>
                        <li className='text-gray-700'>
                            <strong>docker</strong> 명령을 실행하여 상태 변화가 발생하면 화살표
                            애니메이션이 등장합니다.
                        </li>
                        <li className='text-gray-700'>
                            <strong>docker pull</strong> 명령을 실행하면 Image Box가 추가됩니다.
                        </li>
                        <li className='text-gray-700'>
                            <strong>docker run</strong> 명령을 실행하면 Container Box가 생성되며,
                            Image와 Container의 색상은 동일합니다. Container의 실행 상태는 우측 상단
                            Ping 색상으로 확인할 수 있습니다.
                        </li>
                    </ol>
                </DetailedCard>

                <div className='basis-3/5'>
                    <div className='bg-gray-100 rounded-xl overflow-hidden shadow-lg'>
                        <img
                            src={VisualizationGif}
                            alt={imageAlt}
                            className='w-full h-auto object-contain'
                        />
                        <div className='p-4 bg-white'>
                            <p className='text-gray-600 text-center'>{imageAlt}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailedCard = ({ title, subTitle, Icon, children, className }: DetailedCardProps) => {
    return (
        <div className={`bg-white rounded-xl shadow-md overflow-hidden ${className}`}>
            <div className='bg-blue-50 p-6'>
                <div className='flex items-center gap-3 mb-4'>
                    <Icon className='w-8 h-8 text-blue-600' />
                    <h3 className='text-2xl font-semibold'>{title}</h3>
                </div>
                <p className='text-gray-600'>{subTitle}</p>
            </div>

            <div className='p-6'>{children}</div>
        </div>
    );
};

export default LandingPage;
