import { ArrowProps } from '../../types/visualization';

export const Arrow = ({
    icon: Icon,
    className,
    gridColumn,
    gridRow,
    isVisible = false,
    onAnimationEnd,
}: ArrowProps) => {
    return (
        <div
            style={{
                gridColumnStart: gridColumn,
                gridRowStart: gridRow,
            }}
            className={`
                ${className}
                ${isVisible ? 'opacity-100' : 'opacity-0'}
            `}
            onAnimationEnd={onAnimationEnd}
        >
            <Icon size={48} />
        </div>
    );
};
