import { Image } from '../../types/visualization';
import { Tooltip } from 'flowbite-react';
import { IMAGEID_PREFIX_INDEX } from '../../constant/visualization';

type ImagePopoverProps = {
    image: Image;
};

const ImagePopover = ({ image }: ImagePopoverProps) => {
    const { id, name } = image;
    const filteredId = id.slice(IMAGEID_PREFIX_INDEX);

    return (
        <ul className='p-2 bg-gray-50 rounded-lg shadow-md border border-gray-200'>
            <li className='mb-2'>
                <div className='text-xs font-semibold text-gray-500 mb-1'>ID</div>
                <Tooltip trigger='hover' content={filteredId}>
                    <div className='w-[200px] truncate overflow-hidden text-ellipsis whitespace-nowrap text-sm p-2 bg-white border border-gray-300 rounded-md'>
                        {filteredId}
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
        </ul>
    );
};
export default ImagePopover;
