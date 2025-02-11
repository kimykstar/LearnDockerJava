import architecture from '../../assets/docker-architecture.webp';
const WhatIsDockerPage = () => {
    return (
        <>
            <h1 className='text-3xl font-bold' data-aos='fade-left'>
                Docker란 무엇일까요?
            </h1>
            <div
                className='bg-Moby-Blue mt-4 bg-opacity-15 rounded-lg shadow-md p-2'
                data-aos='fade-left'
            >
                <p className='text-lg'>
                    Docker는{' '}
                    <span className='font-bold text-blue-800'>
                        애플리케이션을 개발, 제공 및 실행하기 위한 개방형 플랫폼
                    </span>{' '}
                    입니다.
                    <br />
                    Docker 사용자는 개발한{' '}
                    <span className='font-bold text-blue-800'>
                        애플리케이션을 인프라로부터 분리
                    </span>
                    하여 빠르게 제공할 수 있고, 애플리케이션을 관리하는 것과 동일한 방식으로
                    인프라를 관리할 수 있습니다.
                    <br />
                    코드 전달, 테스트 및 배포를 위한 Docker의 방법론을 활용하면 코드 작성 후 배포의
                    시간을 줄일 수 있습니다.
                </p>
            </div>

            <h2 className='text-2xl font-bold mt-12' data-aos='fade-left'>
                Docker는 어떻게 사용할 수 있나요?
            </h2>
            <div
                className='flex-auto bg-Moby-Blue mt-4 bg-opacity-15 rounded-lg shadow-md p-2'
                data-aos='fade-left'
            >
                <h3 className='text-xl font-bold'>빠르고 일관된 애플리케이션을 제공하고 싶을때</h3>
                <p>
                    <br />
                    Docker는 개발자가 애플리케이션과 서비스를 실행하여 테스트할 수 있는{' '}
                    <span className='font-bold text-blue-800'>표준화된 환경</span>을 로컬 컨테이너를
                    통해 제공합니다.
                    <br />
                    이러한 컨테이너는{' '}
                    <span className='font-bold text-blue-800'>지속적 통합(CI)</span> 및{' '}
                    <span className='font-bold text-blue-800'>지속적 배포(CD)</span> 워크플로우에
                    매우 적합합니다.
                </p>
            </div>
            <div
                className='flex-auto bg-Moby-Blue mt-4 bg-opacity-15 rounded-lg shadow-md p-2'
                data-aos='fade-left'
            >
                <h3 className='text-xl font-bold'>반응형 배포 및 확장을 하고 싶을때</h3>
                <p>
                    <br />
                    도커의 컨테이너 기반 플랫폼은{' '}
                    <span className='font-bold text-blue-800'>다양한 환경</span>에서 워크로드에
                    대응할 수 있도록 도와줍니다.
                    <br />
                    개발자가 운영하는 로컬 노트북, 데이터 센터의 물리적 또는 가상 시스템, 클라우드
                    서비스 등 여러 환경에서 도커 컨테이너를 실행할 수 있습니다.
                    <br />
                    Docker는 가볍고 이식성이 뛰어나기에{' '}
                    <span className='font-bold text-blue-800'>워크로드를 동적으로 쉽게 관리</span>할
                    수 있고, 애플리케이션과 서비스를{' '}
                    <span className='font-bold text-blue-800'>실시간에 가깝게 확장하거나 해체</span>
                    할 수 있습니다.
                </p>
            </div>
            <div
                className='flex-auto bg-Moby-Blue mt-4 bg-opacity-15 rounded-lg shadow-md p-2'
                data-aos='fade-left'
            >
                <h3 className='text-xl font-bold'>
                    동일한 하드웨어에서 더 많은 작업을 수행 및 실행하고 싶을때
                </h3>
                <p>
                    <br />
                    도커는 <span className='font-bold text-blue-800'>가볍고 빠릅니다</span>. 기존
                    하이퍼바이저 기반 가상 머신에 비해 실용적이고 비용 효율적인 대안을 제공하므로 더
                    많은 서버 용량을 사용하여 비즈니스 목표를 달성할 수 있습니다.
                    <br />
                    도커는 고밀도 환경과{' '}
                    <span className='font-bold text-blue-800'>더 적은 리소스로 더 많은 작업</span>을
                    수행해야 하는 중소규모 배포 환경에 적합합니다.
                </p>
            </div>

            <h2 className='text-2xl font-bold mt-12' data-aos='fade-left'>
                Docker의 Architecture
            </h2>
            <img className='mt-4' src={architecture} data-aos='fade-left'></img>

            <h3 className='text-2xl font-bold mt-12'>도커 데몬(Docker Daemon)</h3>
            <div
                className='bg-Moby-Blue mt-4 bg-opacity-15 rounded-lg shadow-md p-2'
                data-aos='fade-left'
            >
                <p>
                    <span className='font-bold'>도커 데몬</span>은 Docker API요청에 대해서
                    listening합니다. 또한, Docker Objects에 해당하는 Container, Image, Network,
                    Volume을 관리합니다.
                    <br />
                    또한, 도커 데몬은 다른 도커 데몬과 상호 작용할 수 있습니다.
                </p>
            </div>
            <h3 className='text-2xl font-bold mt-12'>도커 클라이언트(Docker Client)</h3>
            <div
                className='bg-Moby-Blue mt-4 bg-opacity-15 rounded-lg shadow-md p-2'
                data-aos='fade-left'
            >
                <p>
                    <span className='font-bold'>도커 클라이언트</span>는 많은 Docker 사용자가
                    Docker와 상호 작용하는 주요 방법입니다.
                    <br />
                    docker run과 같은 도커 명령어를 입력하면 도커 클라이언트는 Docker Daemon에게
                    해당 명령을 전달합니다. Docker Client는 Docker API를 활용하며, 하나 이상의
                    Docker Daemon과 통신할 수 있습니다.
                </p>
            </div>

            <h3 className='text-2xl font-bold mt-12'>도커 레지스트리(Docker Registries)</h3>
            <div
                className='bg-Moby-Blue mt-4 bg-opacity-15 rounded-lg shadow-md p-2'
                data-aos='fade-left'
            >
                <p>
                    <span className='font-bold'>도커 레지스트리</span>는 Docker Image들을 저장하고
                    있습니다. 대표적으로 누구나 사용할 수 있는 Docker Hub가 있습니다.
                    <br />
                    Docker는 기본적으로 Docker Hub를 통해 이미지를 탐색하도록 설정되어 있습니다.
                    또한, 자신만의 사설 레지스트리를 만들고 활용할 수도 있습니다.
                    <br />
                    docker pull이나 docker run 명령의 경우 이미지를 가져와야 합니다. 필요한 이미지가
                    없는 경우 설정된 레지스트리로부터 해당 이미지를 가져옵니다.
                    <br />
                    자신이 만든 이미지는 docker push 명령을 통해 레지스트리에 등록할 수 있습니다.
                </p>
            </div>

            <h3 className='text-2xl font-bold mt-12'>도커 오브젝트(Docker Objects)</h3>
            <div
                className='bg-Moby-Blue mt-4 mb-12 bg-opacity-15 rounded-lg shadow-md p-2'
                data-aos='fade-left'
            >
                <p>
                    Docker 사용자는 Docker Object들을 생성 및 사용할 수 있습니다. <br />
                    Docker Object에 포함되는 요소들은 다음과 같습니다.
                    <br />
                    <br />
                    1. Image
                    <br />
                    2. Container
                    <br />
                    3. Network
                    <br />
                    4. Volume
                    <br />
                    5. Plugins
                    <br />
                    ... and more!
                </p>
            </div>
        </>
    );
};

export default WhatIsDockerPage;
