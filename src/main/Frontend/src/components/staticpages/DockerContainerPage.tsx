import DockerContainer2 from '../../assets/docker-container.png';
const DockerContainerPage = () => {
    return (
        <div className='w-full'>
            <div className='flex-col'>
                <h1 className='text-3xl font-bold'>💡Docker Container란 무엇일까요?</h1>
                <div className='flex justify-center' data-aos='fade-left'>
                    <img src={DockerContainer2} className='content-center'></img>
                </div>
                <div className='bg-Moby-Blue mt-4 bg-opacity-15 rounded-lg shadow-md p-2'>
                    <p className='text-black'>
                        <span className='text-lg font-bold'>컨테이너는 무엇인가요❓</span>
                        <br />
                        <div className='mt-1 bg-gray-100 p-4 rounded-md' data-aos='fade-left'>
                            컨테이너는{' '}
                            <span className='text-blue-800 font-bold'>
                                이미지의 실행 가능한 인스턴스
                            </span>
                            로 다른 컨테이너 및 호스트 시스템과 격리된 공간을 제공합니다.
                            <br />
                            Docker API 또는 CLI를 사용하여 컨테이너를{' '}
                            <span className='p-1 text-white bg-blue-400 rounded-md'>
                                생성(Create)
                            </span>
                            ,{' '}
                            <span className='p-1 text-white bg-blue-400 rounded-md'>
                                시작(Start)
                            </span>
                            ,{' '}
                            <span className='p-1 text-white bg-blue-400 rounded-md'>
                                중지(Stop)
                            </span>
                            ,{' '}
                            <span className='p-1 text-white bg-blue-400 rounded-md'>
                                이동(Move)
                            </span>
                            ,{' '}
                            <span className='p-1 text-white bg-blue-400 rounded-md'>
                                삭제(Remove)
                            </span>
                            할 수 있습니다. <br />
                        </div>
                        <br />
                        <span className='text-lg font-bold'>컨테이너의 활용 방법❓</span>
                        <br />
                        <div className='bg-gray-100 p-4 rounded-md' data-aos='fade-left'>
                            <span className='block font-bold mt-2 text-blue-800'>
                                1. 컨테이너의 네트워크 연결
                            </span>
                            <p className='mt-0.5 mb-2 ml-4 '>
                                컨테이너는 하나 이상의 네트워크에 연결할 수 있습니다. 이를 통해
                                컨테이너 간 통신은 물론, 외부 네트워크와의 상호작용도 가능하게
                                합니다.
                            </p>
                            <span className='block font-bold mt-0.5 text-blue-800'>
                                2. 컨테이너와 스토리지 연결
                            </span>
                            <p className='mt-0.5 mb-2 ml-4 '>
                                컨테이너에 스토리지를 연결하여 데이터 저장을 지원할 수 있습니다.
                                예를 들어, 외부 볼륨을 연결하거나 호스트 시스템의 디스크 공간을
                                활용할 수 있습니다.
                            </p>
                            <span className='block font-bold mt-0.5 text-blue-800'>
                                3. 컨테이너로 부터 새로운 이미지 생성
                            </span>
                            <p className='mt-0.5 mb-2 ml-4 '>
                                컨테이너의 상태를 기준으로 새 이미지를 생성할 수 있습니다. 이는
                                컨테이너 사용중 발생한 변경 사항을 새로운 이미지로 저장해 재사용성을
                                높이는 데 유용합니다.
                            </p>
                            <span className='block font-bold mt-0.5 text-blue-800'>
                                4. 컨테이너 격리수준 설정
                            </span>
                            <p className='mt-0.5 mb-2 ml-4 '>
                                컨테이너는 네트워크, 스토리지, 하위 시스템에서 격리 수준을 조장할 수
                                있습니다. 다른 컨테이너 또는 호스트 시스템과의 격리 강도를 필요에
                                따라 설정이 가능하며, 이를 통해 보안과 독립성을 높일 수 있습니다.
                            </p>
                            <span className='block font-bold mt-0.5 text-blue-800'>
                                5. 컨테이너 상태 유지 및 소멸
                            </span>
                            <p className='mt-0.5 mb-2 ml-4 '>
                                영구 저장소에 저장되지 않은 상태 변경 사항은 모두 소멸합니다. 이를
                                통해 컨테이너는 항상 초기화된 상태로 재사용할 수 있는 특성을
                                가집니다.
                            </p>
                        </div>
                        <br />
                        <span className='text-lg font-bold'>
                            컨테이너에 대해 더 알아보고싶다면❓
                        </span>
                        <br />
                        <div className='border border-slate-600 p-1 rounded-md text-Moby-Blue mt-2 inline-block text-xs'>
                            <a
                                href='https://www.docker.com/resources/what-container/'
                                rel='noopener noreferrer'
                                target='_blank'
                            >
                                도커 컨테이너 바로가기
                            </a>
                        </div>
                    </p>
                </div>
            </div>
            <div className='flex-col w-full mt-12'>
                <div className='flex'>
                    <h1 className='text-3xl font-bold'>Docker Container명령어</h1>
                    <div
                        className='border ml-3 border-slate-600 p-1 rounded-md text-Moby-Blue mt-2 inline-block text-xs'
                        data-aos='fade-lef'
                    >
                        <a
                            href='https://docs.docker.com/reference/cli/docker/container/'
                            rel='noopener noreferrer'
                            target='_blank'
                        >
                            컨테이너 명령어 보러가기
                        </a>
                    </div>
                </div>
                <span className='block mt-2'>
                    Docker에서 Container를 조작하는 명령에 대해서 알아봅시다!
                </span>
                <div className='flex-col mt-6' data-aos='fade-left'>
                    <h2 className='text-2xl font-bold'>1. 컨테이너 생성</h2>
                    <div className='rounded-md w-full border border-black p-4 mt-2'>
                        <code className='text-sm font-bold'>
                            docker create [option] [Image ID | Image Name] [명령어]
                        </code>
                    </div>
                    <p className='block mt-2 ml-4'>
                        Image Name 혹은 Image ID에 해당하는 컨테이너를 생성합니다.
                        <br />
                        <span className='text-sm'>
                            Aliases:{' '}
                            <code className='bg-gray-200 rounded-sm pl-1 pr-2'>
                                <i>docker container create</i>
                            </code>{' '}
                        </span>
                        <br />
                        <div className='border border-slate-600 p-1 rounded-md text-Moby-Blue mt-2 inline-block  text-xs'>
                            <a
                                href='https://docs.docker.com/reference/cli/docker/container/create/'
                                rel='noopener noreferrer'
                                target='_blank'
                            >
                                옵션 알아보기
                            </a>
                        </div>
                    </p>
                </div>
                <div className='flex-col mt-6' data-aos='fade-left'>
                    <h2 className='text-2xl font-bold'>2. 컨테이너 실행</h2>
                    <div className='rounded-md w-full border border-black p-4 mt-2'>
                        <code className='text-sm font-bold'>
                            docker start [Container Name | Container ID]
                        </code>
                    </div>
                    <p className='block mt-2 ml-4'>
                        Container Name 혹은 Container ID에 해당하는 컨테이너를 실행합니다.
                        <br />
                        <span className='text-sm'>
                            Aliases:{' '}
                            <code className='bg-gray-200 rounded-sm pl-1 pr-2'>
                                <i>docker container start</i>
                            </code>{' '}
                        </span>
                        <br />
                        <div className='border border-slate-600 p-1 rounded-md text-Moby-Blue mt-2 inline-block  text-xs'>
                            <a
                                href='https://docs.docker.com/reference/cli/docker/container/start/'
                                rel='noopener noreferrer'
                                target='_blank'
                            >
                                옵션 알아보기
                            </a>
                        </div>
                    </p>
                </div>
                <div className='flex-col mt-6' data-aos='fade-left'>
                    <h2 className='text-2xl font-bold'>3. 컨테이너 생성 및 실행</h2>
                    <div className='rounded-md w-full border border-black p-4 mt-2'>
                        <code className='text-sm font-bold'>
                            docker run [option] [Image ID | Image Name]
                        </code>
                    </div>
                    <p className='block mt-2 ml-4'>
                        Container Name 혹은 Container ID에 해당하는 컨테이너를 생성 및 실행합니다.
                        <br />
                        <span className='block text-sm font-bold'>
                            * docker create, docker start를 한번에 실행하는 것과 동일한 동작을
                            하나의 명령어를 통해 실행할 수 있습니다.
                        </span>
                        <span className='text-sm'>
                            Aliases:{' '}
                            <code className='bg-gray-200 rounded-sm pl-1 pr-2'>
                                <i>docker container run</i>
                            </code>{' '}
                        </span>
                        <br />
                        <div className='border border-slate-600 p-1 rounded-md text-Moby-Blue mt-2 inline-block  text-xs'>
                            <a
                                href='https://docs.docker.com/reference/cli/docker/container/run/'
                                rel='noopener noreferrer'
                                target='_blank'
                            >
                                옵션 알아보기
                            </a>
                        </div>
                    </p>
                </div>
                <div className='flex-col mt-6' data-aos='fade-left'>
                    <h2 className='text-2xl font-bold'>4. 컨테이너 재실행</h2>
                    <div className='rounded-md w-full border border-black p-4 mt-2'>
                        <code className='text-sm font-bold'>
                            docker restart [options] [Container Name | Container ID]
                        </code>
                    </div>
                    <p className='block mt-2 ml-4'>
                        Running상태에 해당하는 특정 컨테이너를 재실행 합니다.
                        <br />
                        <span className='text-sm'>
                            Aliases:{' '}
                            <code className='bg-gray-200 rounded-sm pl-1 pr-2'>
                                <i> docker container restart</i>
                            </code>{' '}
                        </span>
                        <br />
                        <div className='border border-slate-600 p-1 rounded-md text-Moby-Blue mt-2 inline-block text-xs'>
                            <a
                                href='https://docs.docker.com/reference/cli/docker/container/restart/'
                                rel='noopener noreferrer'
                                target='_blank'
                            >
                                옵션 알아보기
                            </a>
                        </div>
                    </p>
                </div>
                <div className='flex-col mt-6' data-aos='fade-left'>
                    <h2 className='text-2xl font-bold'>5. 컨테이너 확인하기</h2>
                    <div className='rounded-md w-full border border-black p-4 mt-2'>
                        <code className='text-sm font-bold'>docker ps [option]</code>
                    </div>
                    <p className='block mt-2 ml-4'>
                        <span>로컬에 존재하는 컨테이너들의 목록을 확인합니다.</span>
                        <span className='block text-sm font-bold'>
                            * option설정에 따라 살펴볼 수 있는 Container의 목록이 달라집니다.
                        </span>
                        <span className='text-sm'>
                            Aliases:{' '}
                            <code className='bg-gray-200 rounded-sm pl-1 pr-2'>
                                <i> docker contaner ls</i>
                            </code>{' '}
                        </span>
                        <br />
                        <div className='border border-slate-600 p-1 rounded-md text-Moby-Blue mt-2 inline-block text-xs'>
                            <a
                                href='https://docs.docker.com/reference/cli/docker/container/ls/'
                                rel='noopener noreferrer'
                                target='_blank'
                            >
                                옵션 알아보기
                            </a>
                        </div>
                    </p>
                </div>
                <div className='flex-col mt-6' data-aos='fade-left'>
                    <h2 className='text-2xl font-bold'>6. 컨테이너 삭제하기</h2>
                    <div className='rounded-md w-full border border-black p-4 mt-2'>
                        <code className='text-sm font-bold'>
                            docker rm [Container Name | Container ID]
                        </code>
                    </div>
                    <p className='block mt-2 ml-4'>
                        Container Name 혹은 Container ID에 해당하는 컨테이너를 삭제합니다.
                        <br />
                        <span className='text-sm'>
                            Aliases:{' '}
                            <code className='bg-gray-200 rounded-sm pl-1 pr-2'>
                                <i>docker container rm</i>
                            </code>{' '}
                        </span>
                        <br />
                        <div className='border border-slate-600 p-1 rounded-md text-Moby-Blue mt-2 inline-block text-xs'>
                            <a
                                href='https://docs.docker.com/reference/cli/docker/container/rm/'
                                rel='noopener noreferrer'
                                target='_blank'
                            >
                                옵션 알아보기
                            </a>
                        </div>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DockerContainerPage;
