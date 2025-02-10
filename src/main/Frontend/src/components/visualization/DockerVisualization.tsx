import { Laptop, Server, Container, Database, Cloud } from 'lucide-react';
import { BaseNode } from './BaseNode';
import ContainerNode from './ContainerNode';
import { DockerVisualizationProps } from '../../types/visualization';
import { ArrowAnimation } from './ArrowAnimation';

const DockerVisualization = ({
    animationState,
    elements,
    dockerOperation,
    onAnimationComplete,
}: DockerVisualizationProps) => {
    const { images, containers } = elements;
    const initBaseNodes = [
        {
            label: 'client',
            icon: Laptop,
            gridColumn: 1,
            gridRow: 3,
        },
        {
            label: 'docker engine',
            icon: Server,
            gridColumn: 3,
            gridRow: 3,
        },

        {
            label: 'registry',
            icon: Cloud,
            gridColumn: 7,
            gridRow: 4,
        },
    ];

    return (
        <div
            className='grid w-[55%] border rounded-lg border-gray-300'
            style={{
                gridTemplateColumns: '1fr 0.5fr 1fr 0.5fr 1fr 0.5fr 1fr',
                gridTemplateRows: 'repeat(5, 1fr)',
            }}
        >
            {initBaseNodes.map(({ label, icon, gridRow, gridColumn }) => (
                <BaseNode
                    key={label}
                    label={label}
                    icon={icon}
                    gridColumn={gridColumn}
                    gridRow={gridRow}
                />
            ))}
            <ContainerNode
                key='containers'
                label='containers'
                icon={Container}
                gridRow={2}
                gridColumn={5}
                containerData={containers}
            />
            <ContainerNode
                key='images'
                label='images'
                icon={Database}
                gridRow={4}
                gridColumn={5}
                containerData={images}
            />

            <ArrowAnimation
                key={animationState.key}
                isVisible={animationState.isVisible}
                onComplete={onAnimationComplete}
                dockerOperation={dockerOperation}
            />
        </div>
    );
};

export default DockerVisualization;
