export const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    return '';
};
