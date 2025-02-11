import lifeCylceImage from '../../assets/containerLifeCycle.png';

const DockerContainerLifeCyclePage = () => {
    return (
        <div className='w-full mb-12'>
            <h1 className='text-3xl font-bold'>Container 생명주기에 대해서 알아볼까요?</h1>
            <img
                src={lifeCylceImage}
                className='mt-4'
                data-aos='fade-left'
                alt='container lifecycle'
            ></img>
            <div className='mt-10'>
                <div data-aos='fade-left'>
                    <h2 className='text-2xl font-bold'>Container의 상태</h2>
                    <div className='bg-Moby-Blue text-black mt-4 bg-opacity-15 rounded-lg shadow-md p-2'>
                        <p className='py-2'>
                            컨테이너는{' '}
                            <span className='font-bold text-blue-800'>
                                생성, 실행, 중지 등 다양한 상태를 가지며, Docker 명령어를 통해
                                상태를 전환
                            </span>
                            할 수 있습니다.
                        </p>
                    </div>

                    <h3 className='text-xl font-bold mt-10'>1. Created</h3>
                    <div className='bg-Moby-Blue mt-2 bg-opacity-15 rounded-lg p-2'>
                        <p className='py-1'>
                            도커 이미지로부터 도커 컨테이너가 생성된 상태이며 컨테이너가 실행된
                            상태는 아닙니다.
                        </p>
                    </div>

                    <h3 className='text-xl font-bold mt-10'>2. Running</h3>
                    <div className='bg-Moby-Blue mt-2 bg-opacity-15 rounded-lg p-2'>
                        <p className='py-1'>
                            docker start 또는 docker run 명령어로 시작된, 실행 중인 컨테이너입니다.
                        </p>
                    </div>

                    <h3 className='text-xl font-bold mt-10'>3. Stopped</h3>
                    <div className='bg-Moby-Blue mt-2 bg-opacity-15 rounded-lg p-2'>
                        <p className='py-1'>
                            컨테이너의 실행이 중지된 상태로 컨테이너의 모든 프로세스가 종료되고,
                            컨테이너가 더 이상 실행되지 않습니다.
                        </p>
                    </div>

                    <h3 className='text-xl font-bold mt-10'>4. Paused</h3>
                    <div className='bg-Moby-Blue mt-2 bg-opacity-15 rounded-lg p-2'>
                        <p className='py-1'>컨테이너 내부의 모든 프로세스가 일시 중단된 상태입니다.</p>
                    </div>

                    <h3 className='text-xl font-bold mt-10'>5. Deleted</h3>
                    <div className='bg-Moby-Blue mt-2 bg-opacity-15 rounded-lg p-2'>
                        <p className='py-1'>Docker 컨테이너가 삭제된 상태입니다.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DockerContainerLifeCyclePage;
