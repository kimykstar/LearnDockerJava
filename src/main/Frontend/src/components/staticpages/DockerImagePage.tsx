const WhatIsDockerImagePage = () => {
    return (
        <div className='w-full mb-12' data-aos='fade-left'>
            <div className='flex-col'>
                <h1 className='text-3xl font-bold'>Docker Image란 무엇일까요?</h1>
                <div className='bg-Moby-Blue text-black mt-4 bg-opacity-15 rounded-lg shadow-md p-2'>
                    <p className='mb-5'>
                        이미지는{' '}
                        <span className='font-bold text-blue-800'>
                            컨테이너 실행에 필요한 파일, 바이너리, 라이브러리, 설정 등을 모두 포함한
                            표준화된 패키지
                        </span>
                        입니다.
                    </p>
                    <p>이미지에는 두 가지 중요한 원칙이 있습니다:</p>
                    <ol className='m-2'>
                        <li>
                            <p className='font-bold text-blue-800'>1. 이미지는 불변성을 가집니다</p>
                            <p className='mt-0.5 mb-2 ml-4 '>
                                이미지가 생성되면 수정할 수 없습니다. 새 이미지를 만들거나 그 위에
                                변경 사항을 추가할 수 있을 뿐입니다.
                            </p>
                        </li>
                        <li>
                            <span className='font-bold text-blue-800'>
                                2. 이미지는 레이어로 구성됩니다
                            </span>
                            <p className='mt-0.5 mb-2 ml-4 '>
                                각 레이어는 파일을 추가, 제거 또는 수정하는 일련의 파일 시스템 변경
                                사항을 나타냅니다.
                            </p>
                        </li>
                    </ol>
                    <p className='mt-5'>
                        예를 들어, Python 앱을 구축하는 경우 Python 이미지를 기반으로 시작하여
                        애플리케이션의 종속성을 설치하거나 코드를 추가하는 새로운 레이어들을 만들 수
                        있습니다.
                    </p>
                    <div className='border border-slate-600 p-1 rounded-md text-Moby-Blue mt-2 inline-block text-xs'>
                        <a
                            href='https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/'
                            rel='noopener noreferrer'
                            target='_blank'
                        >
                            더 알아보기
                        </a>
                    </div>
                </div>
            </div>
            <div className='flex-col w-full mt-12'>
                <h1 className='text-3xl font-bold'>Docker Image명령어</h1>
                <p className='mt-4'>Docker에서 Image를 조작하는 명령에 대해서 알아봅시다!</p>
                <div className='flex-col mt-6'>
                    <h2 className='text-2xl font-bold'>1. 이미지 가져오기</h2>
                    <div className='rounded-md w-full border border-black p-4 mt-2'>
                        <code className='text-sm font-bold'>
                            docker pull [Image ID | Image Name]
                        </code>
                    </div>
                    <p className='mt-2 ml-4'>
                        Docker Image를 Docker Registry로부터 가져와 local에 저장합니다.
                    </p>
                </div>
                <div className='flex-col mt-6'>
                    <h2 className='text-2xl font-bold'>2. 이미지 확인하기</h2>
                    <div className='rounded-md w-full border border-black p-4 mt-2'>
                        <code className='text-sm font-bold'>docker image ls</code>
                    </div>
                    <p className='mt-2 ml-4'>
                        Local에 저장된 Docker Image들의 목록을 한번에 확인할 수 있습니다.
                        <br />
                        <span className='text-sm'>
                            Aliases:{' '}
                            <code className='bg-gray-200 rounded-sm pl-1 pr-2'>
                                <i>docker images</i>
                            </code>{' '}
                            ,{' '}
                            <code className='bg-gray-200 rounded-sm  pl-1 pr-2'>
                                <i>docker image list</i>
                            </code>
                        </span>
                    </p>
                    <div className='rounded-md w-full border border-black p-4 mt-4'>
                        <code className='text-sm font-bold'>
                            docker inspect [Image Name | Image ID]
                        </code>
                    </div>
                    <p className='mt-2 ml-4'>
                        Local에 저장된 Docker Image 중 특정 Image의 정보를 확인할 수 있습니다.
                    </p>
                </div>
                <div className='flex-col mt-6'>
                    <h2 className='text-2xl font-bold'>3. 이미지 삭제하기</h2>
                    <div className='rounded-md w-full border border-black p-4 mt-2'>
                        <code className='text-sm font-bold'>
                            docker image rm [Image ID | Image Name]
                        </code>
                    </div>
                    <p className='mt-2 ml-4'>
                        Local에 저장된 특정 Docker Image를 삭제합니다.
                        <br />
                        <span className='text-sm'>
                            Aliases:{' '}
                            <code className='bg-gray-200 rounded-sm pl-1 pr-2'>
                                <i>docker rmi</i>
                            </code>{' '}
                            ,{' '}
                            <code className='bg-gray-200 rounded-sm pl-1 pr-2'>
                                <i>docker image remove</i>
                            </code>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WhatIsDockerImagePage;
