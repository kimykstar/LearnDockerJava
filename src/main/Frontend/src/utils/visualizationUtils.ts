import { Visualization } from '../types/visualization';
import { COLORS } from '../constant/visualization';
import { DOCKER_OPERATIONS } from '../types/visualization';
import { IMAGEID_PREFIX_INDEX } from '../constant/visualization';

export const setColorToElements = (prevElements: Visualization, newElements: Visualization) => {
    const initImages = updateImageColors(prevElements, newElements);
    const initContainers = updateContainerColors(prevElements, newElements);

    return { initImages, initContainers };
};

export const updateImageColors = (prevElements: Visualization, newElements: Visualization) => {
    const { images: prevImages } = prevElements;
    const { images: newImages } = newElements;
    return newImages.map((newImage) => {
        const prevImage = prevImages.find((img) => img.id === newImage.id);
        if (prevImage && Object.keys(prevImage).includes('color')) {
            return prevImage;
        }
        const newData = {
            ...newImage,
            color: getNotUsedColor(prevElements),
        };
        prevImages.push(newData);
        return newData;
    });
};

const getNotUsedColor = (prevElements: Visualization) => {
    const { images } = prevElements;
    const notUsedColors = COLORS.filter((color) => {
        return !images.some((image) => image.color === color);
    });
    return notUsedColors[0];
};

export const updateContainerColors = (prevElements: Visualization, newElements: Visualization) => {
    const { images: coloredImages } = prevElements;
    const { containers } = newElements;
    return containers.map((container) => {
        const image = coloredImages.find((image) => {
            return compareImageId(image.id, container.image) || image.name === container.image;
        });
        return {
            ...container,
            color: image?.color,
        };
    });
};

const compareImageId = (imageId: string, containerImage: string) => {
    const containerImageLen = containerImage.length;
    return (
        imageId.slice(IMAGEID_PREFIX_INDEX, IMAGEID_PREFIX_INDEX + containerImageLen) ===
        containerImage
    );
};

const isChangedContainerStatus = (prevElements: Visualization, newElements: Visualization) => {
    const { containers: prevContainers } = prevElements;
    const { containers: currentContainers } = newElements;
    return prevContainers.some((prevContainer) => {
        const matchedContainer = currentContainers.find(
            (currentContainer) => currentContainer.id === prevContainer.id
        );
        if (!matchedContainer) {
            throw new Error('isChangedContainerStatus함수 undefined 에러');
        }
        return matchedContainer.status !== prevContainer.status;
    });
};

export const getDockerOperation = (prevElements: Visualization, newElements: Visualization) => {
    const { images: newImages, containers: newContainers } = newElements;
    const { images: prevImages, containers: prevContainers } = prevElements;
    if (newImages.length > prevImages.length && newContainers.length === prevContainers.length)
        return DOCKER_OPERATIONS.IMAGE_PULL;
    if (newImages.length < prevImages.length) return DOCKER_OPERATIONS.IMAGE_DELETE;
    if (prevImages.length === newImages.length && prevContainers.length < newContainers.length)
        return DOCKER_OPERATIONS.CONTAINER_CREATE;
    if (prevImages.length < newImages.length && prevContainers.length < newContainers.length)
        return DOCKER_OPERATIONS.CONTAINER_RUN;
    if (prevContainers.length > newContainers.length) return DOCKER_OPERATIONS.CONTAINER_DELETE;
    if (isChangedContainerStatus(prevElements, newElements))
        return DOCKER_OPERATIONS.CONTAINER_STATUS_CHANGED;
};
