import { NodeProps } from '../../types/visualization';

export const BaseNode = ({ label, icon: Icon, gridRow, gridColumn }: NodeProps) => {
    return (
        <div
            className='flex flex-col items-center gap-1'
            style={{
                gridRowStart: gridRow,
                gridColumnStart: gridColumn,
            }}
        >
            <span className='text-sm'>{label}</span>
            <Icon size={64} />
        </div>
    );
};
