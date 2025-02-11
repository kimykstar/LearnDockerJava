import { Container } from '../../types/visualization';
import { Tooltip } from 'flowbite-react';

type ContainerPopoverProps = {
    container: Container;
};

const ContainerPopover = ({ container }: ContainerPopoverProps) => {
    const { id, name, image, status } = container;

    return (
        <ul className='p-2 bg-gray-50 rounded-lg shadow-md border border-gray-200'>
            <li className='mb-2'>
                <div className='text-xs font-semibold text-gray-500 mb-1'>ID</div>
                <Tooltip trigger='hover' content={id}>
                    <div className='w-[200px] truncate overflow-hidden text-ellipsis whitespace-nowrap text-sm p-2 bg-white border border-gray-300 rounded-md'>
                        {id}
                    </div>
                </Tooltip>
            </li>
            <li className='mb-2'>
                <div className='text-xs font-semibold text-gray-500 mb-1'>Name</div>
                <Tooltip trigger='hover' content={name}>
                    <div className='w-[200px] truncate overflow-hidden text-ellipsis whitespace-nowrap text-sm p-2 bg-white border border-gray-300 rounded-md'>
                        {name}
                    </div>
                </Tooltip>
            </li>
            <li className='mb-2'>
                <div className='text-xs font-semibold text-gray-500 mb-1'>Image</div>
                <Tooltip trigger='hover' content={image}>
                    <div className='w-[200px] truncate overflow-hidden text-ellipsis whitespace-nowrap text-sm p-2 bg-white border border-gray-300 rounded-md'>
                        {image}
                    </div>
                </Tooltip>
            </li>
            <li className='mb-2'>
                <div className='text-xs font-semibold text-gray-500 mb-1'>Status</div>
                <div className='w-[200px] truncate overflow-hidden text-ellipsis whitespace-nowrap text-sm p-2 bg-white border border-gray-300 rounded-md'>
                    {status}
                </div>
            </li>
        </ul>
    );
};

export default ContainerPopover;
