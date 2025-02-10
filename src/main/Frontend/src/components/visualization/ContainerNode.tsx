import {
    ContainerNodeProps,
    DOCKER_CONTAINER_STATUS,
    Image,
    Container,
} from '../../types/visualization';
import { Popover } from 'flowbite-react';
import ContainerPopover from '../popover/ContainerPopover';
import ImagePopover from '../popover/ImagePopover';

const STATUS_COLORS = {
    [DOCKER_CONTAINER_STATUS.EXITED]: 'bg-Stopped-Status-Color',
    [DOCKER_CONTAINER_STATUS.RESTARTING]: 'bg-Restarting-Status-Color',
    [DOCKER_CONTAINER_STATUS.RUNNING]: 'bg-Running-Status-Color',
    [DOCKER_CONTAINER_STATUS.CREATED]: 'bg-Stopped-Status-Color',
    [DOCKER_CONTAINER_STATUS.PAUSED]: 'bg-Stopped-Status-Color',
    [DOCKER_CONTAINER_STATUS.STOPPED]: 'bg-Stopped-Status-Color',
    [DOCKER_CONTAINER_STATUS.DEAD]: 'bg-Stopped-Status-Color',
};

const isContainer = (element: Image | Container): element is Container => {
    return (element as Container).status !== undefined;
};

const ContainerNode = ({
    label,
    icon: Icon,
    gridRow,
    gridColumn,
    containerData,
}: ContainerNodeProps) => {
    return (
        <div
            className='border-gray-300 border-2 relative'
            style={{
                gridRowStart: gridRow,
                gridColumnStart: gridColumn,
            }}
        >
            <div className='absolute -translate-y-20 -translate-x-8 flex flex-col items-center gap-2'>
                <span className='text-sm'>{label}</span>
                <Icon size={64} />
            </div>
            <div className='flex flex-col h-full'>
                {containerData?.map((element) => (
                    <Popover
                        trigger='hover'
                        content={
                            isContainer(element) ? (
                                <ContainerPopover container={element} />
                            ) : (
                                <ImagePopover image={element} />
                            )
                        }
                        key={element.id}
                    >
                        <div
                            className='relative border-4 rounded m-1 text-[10px] min-w-[4rem] max-w-[8rem]'
                            style={{
                                borderColor: element.color,
                            }}
                        >
                            {isContainer(element) ? (
                                <>
                                    <span
                                        className={`absolute -top-1 -right-1  inline-flex h-2 w-2 rounded-full ${STATUS_COLORS[element.status]} opacity-75 animate-ping`}
                                    ></span>
                                    <span
                                        className={`absolute -top-1 -right-1 inline-flex rounded-full h-2 w-2 ${STATUS_COLORS[element.status]}`}
                                    ></span>

                                    <div className='truncate'>{element.name}</div>
                                </>
                            ) : (
                                <div className='truncate'>{element.name}</div>
                            )}
                        </div>
                    </Popover>
                ))}
            </div>
        </div>
    );
};

export default ContainerNode;
