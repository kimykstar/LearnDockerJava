import { useRef, useState } from 'react';
import { requestVisualizationData } from '../api/quiz';
import { DOCKER_OPERATIONS, AnimationState, DockerOperation } from '../types/visualization';
import { useNavigate } from 'react-router-dom';
import { Visualization } from '../types/visualization';
import {
    setColorToElements,
    updateImageColors,
    updateContainerColors,
    getDockerOperation,
} from '../utils/visualizationUtils';
import { STATE_CHANGE_COMMAND_REGEX } from '../constant/visualization';

const useDockerVisualization = () => {
    const navigate = useNavigate();
    const [elements, setElements] = useState<Visualization>({ images: [], containers: [] });
    const [dockerOperation, setDockerOperation] = useState<DockerOperation>();
    const [animation, setAnimation] = useState<AnimationState>({
        isVisible: false,
        key: 0,
    });
    const elementsRef = useRef<Visualization>({ images: [], containers: [] });

    const handleImageStateLengthChange = (
        prevElements: Visualization,
        newElements: Visualization,
        dockerOperation: DockerOperation
    ) => {
        const updatedImages = updateImageColors(prevElements, newElements);

        elementsRef.current.images = [...updatedImages];
        setDockerOperation(dockerOperation);
        setAnimation((prev) => ({
            isVisible: true,
            key: prev.key + 1,
        }));
    };

    const handleContainerStateLengthChange = (
        newElements: Visualization,
        dockerOperation: DockerOperation
    ) => {
        const prevImages = elementsRef.current;
        const updatedContainers = updateContainerColors(prevImages, newElements);

        elementsRef.current.containers = [...updatedContainers];
        setDockerOperation(dockerOperation);
        setAnimation((prev) => ({
            isVisible: true,
            key: prev.key + 1,
        }));
    };

    const handleElementsStateLengthChange = (newElements: Visualization) => {
        const prevElements = elementsRef.current;
        const { initImages, initContainers } = setColorToElements(prevElements, newElements);

        elementsRef.current.images = [...initImages];
        elementsRef.current.containers = [...initContainers];
        setDockerOperation(DOCKER_OPERATIONS.CONTAINER_RUN);
        setAnimation((prev) => ({
            isVisible: true,
            key: prev.key + 1,
        }));
    };

    const handleContainerStateChange = (newElements: Visualization, command: string) => {
        const prevImages = elementsRef.current;
        const updatedContainers = updateContainerColors(prevImages, newElements);
        const elements = { images: prevImages.images, containers: updatedContainers };

        elementsRef.current.containers = [...updatedContainers];
        setDockerOperation(DOCKER_OPERATIONS.CONTAINER_STATUS_CHANGED);

        if (command.match(STATE_CHANGE_COMMAND_REGEX)) {
            setAnimation((prev) => ({
                isVisible: true,
                key: prev.key + 1,
            }));
        } else {
            setElements(elements);
        }
    };

    const handleTerminalEnterCallback = (data: Visualization, command: string) => {
        const prevElements = elementsRef.current;
        const newElements = data;
        const operation = getDockerOperation(prevElements, newElements);

        switch (operation) {
            case DOCKER_OPERATIONS.IMAGE_PULL:
                handleImageStateLengthChange(prevElements, newElements, operation);
                break;
            case DOCKER_OPERATIONS.IMAGE_DELETE:
                handleImageStateLengthChange(prevElements, newElements, operation);
                break;
            case DOCKER_OPERATIONS.CONTAINER_CREATE:
                handleContainerStateLengthChange(newElements, operation);
                break;
            case DOCKER_OPERATIONS.CONTAINER_RUN:
                handleElementsStateLengthChange(newElements);
                break;
            case DOCKER_OPERATIONS.CONTAINER_DELETE:
                handleContainerStateLengthChange(newElements, operation);
                break;
            case DOCKER_OPERATIONS.CONTAINER_STATUS_CHANGED:
                handleContainerStateChange(newElements, command);
                break;
        }
    };

    const updateVisualizationData = async (command: string) => {
        const data = await requestVisualizationData(navigate);
        if (!data) return;
        handleTerminalEnterCallback(data, command);
    };

    const setInitVisualization = async () => {
        const newElements = await requestVisualizationData(navigate);
        if (!newElements) return;

        const prevElements = elementsRef.current;
        const { initImages, initContainers } = setColorToElements(prevElements, newElements);

        elementsRef.current.images = [...initImages];
        elementsRef.current.containers = [...initContainers];
        setElements({ images: initImages, containers: initContainers });
    };

    const handleAnimationComplete = () => {
        const { images, containers } = elementsRef.current;

        setElements({ images, containers });
        setAnimation((prev) => ({
            isVisible: false,
            key: prev.key,
        }));
    };

    return {
        elements,
        animationState: animation,
        dockerOperation,
        onAnimationComplete: handleAnimationComplete,
        updateVisualizationData,
        handleTerminalEnterCallback,
        setInitVisualization,
    };
};

export default useDockerVisualization;
