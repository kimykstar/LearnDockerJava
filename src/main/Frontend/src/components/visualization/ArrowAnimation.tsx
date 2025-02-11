import { Arrow } from './Arrow';
import { MoveRight, MoveDownRight, MoveLeft, MoveUpRight, MoveUp } from 'lucide-react';
import { AnimationProps, DOCKER_OPERATIONS } from '../../types/visualization';

export const ArrowAnimation = ({ isVisible, onComplete, dockerOperation }: AnimationProps) => {
    switch (dockerOperation) {
        case DOCKER_OPERATIONS.IMAGE_PULL:
            return (
                <>
                    <Arrow
                        className={isVisible ? 'animate-showAndHideFirst' : ''}
                        icon={MoveRight}
                        gridColumn={2}
                        gridRow={3}
                        isVisible={isVisible}
                    />
                    <Arrow
                        className={isVisible ? 'relative top-28 animate-showAndHideSecond' : ''}
                        icon={MoveDownRight}
                        gridColumn={4}
                        gridRow={3}
                        isVisible={isVisible}
                    />
                    <Arrow
                        className={isVisible ? 'relative left-4 animate-showAndHideThird' : ''}
                        icon={MoveRight}
                        gridColumn={6}
                        gridRow={4}
                        isVisible={isVisible}
                    />
                    <Arrow
                        className={isVisible ? 'relative left-4 animate-showAndHideFourth' : ''}
                        icon={MoveLeft}
                        gridColumn={6}
                        gridRow={4}
                        isVisible={isVisible}
                        onAnimationEnd={onComplete}
                    />
                </>
            );

        case DOCKER_OPERATIONS.IMAGE_DELETE:
            return (
                <>
                    <Arrow
                        className={isVisible ? 'animate-showAndHideFirst' : ''}
                        icon={MoveRight}
                        gridColumn={2}
                        gridRow={3}
                        isVisible={isVisible}
                    />
                    <Arrow
                        className={isVisible ? 'relative top-28 animate-showAndHideSecond' : ''}
                        icon={MoveDownRight}
                        gridColumn={4}
                        gridRow={3}
                        isVisible={isVisible}
                        onAnimationEnd={onComplete}
                    />
                </>
            );

        case DOCKER_OPERATIONS.CONTAINER_CREATE:
            return (
                <>
                    <Arrow
                        className={isVisible ? 'animate-showAndHideFirst' : ''}
                        icon={MoveRight}
                        gridColumn={2}
                        gridRow={3}
                        isVisible={isVisible}
                    />
                    <Arrow
                        className={isVisible ? 'relative top-28 animate-showAndHideSecond' : ''}
                        icon={MoveDownRight}
                        gridColumn={4}
                        gridRow={3}
                        isVisible={isVisible}
                    />
                    <Arrow
                        className={isVisible ? 'relative left-4 animate-showAndHideThird' : ''}
                        icon={MoveUp}
                        gridColumn={5}
                        gridRow={3}
                        isVisible={isVisible}
                        onAnimationEnd={onComplete}
                    />
                </>
            );
        case DOCKER_OPERATIONS.CONTAINER_DELETE:
            return (
                <>
                    <Arrow
                        className={isVisible ? 'animate-showAndHideFirst' : ''}
                        icon={MoveRight}
                        gridColumn={2}
                        gridRow={3}
                        isVisible={isVisible}
                    />
                    <Arrow
                        className={isVisible ? 'relative top-28 animate-showAndHideSecond' : ''}
                        icon={MoveUpRight}
                        gridColumn={4}
                        gridRow={2}
                        isVisible={isVisible}
                        onAnimationEnd={onComplete}
                    />
                </>
            );
        case DOCKER_OPERATIONS.CONTAINER_RUN:
            return (
                <>
                    <Arrow
                        className={isVisible ? 'animate-showAndHideFirst' : ''}
                        icon={MoveRight}
                        gridColumn={2}
                        gridRow={3}
                        isVisible={isVisible}
                    />
                    <Arrow
                        className={isVisible ? 'relative top-28 animate-showAndHideSecond' : ''}
                        icon={MoveDownRight}
                        gridColumn={4}
                        gridRow={3}
                        isVisible={isVisible}
                    />
                    <Arrow
                        className={isVisible ? 'relative left-4 animate-showAndHideThird' : ''}
                        icon={MoveRight}
                        gridColumn={6}
                        gridRow={4}
                        isVisible={isVisible}
                    />
                    <Arrow
                        className={isVisible ? 'relative left-4 animate-showAndHideFourth' : ''}
                        icon={MoveLeft}
                        gridColumn={6}
                        gridRow={4}
                        isVisible={isVisible}
                    />
                    <Arrow
                        className={isVisible ? 'animate-showAndHideFifth' : ''}
                        icon={MoveRight}
                        gridColumn={2}
                        gridRow={3}
                        isVisible={isVisible}
                    />
                    <Arrow
                        className={isVisible ? 'relative top-28 animate-showAndHideSixth' : ''}
                        icon={MoveDownRight}
                        gridColumn={4}
                        gridRow={3}
                        isVisible={isVisible}
                    />
                    <Arrow
                        className={isVisible ? 'relative left-4 animate-showAndHideSeventh' : ''}
                        icon={MoveUp}
                        gridColumn={5}
                        gridRow={3}
                        isVisible={isVisible}
                        onAnimationEnd={onComplete}
                    />
                </>
            );
        case DOCKER_OPERATIONS.CONTAINER_STATUS_CHANGED:
            return (
                <>
                    <Arrow
                        className={isVisible ? 'animate-showAndHideFirst' : ''}
                        icon={MoveRight}
                        gridColumn={2}
                        gridRow={3}
                        isVisible={isVisible}
                    />
                    <Arrow
                        className={isVisible ? 'relative top-28 animate-showAndHideSecond' : ''}
                        icon={MoveUpRight}
                        gridColumn={4}
                        gridRow={2}
                        isVisible={isVisible}
                        onAnimationEnd={onComplete}
                    />
                </>
            );
        default:
            return null;
    }
};
