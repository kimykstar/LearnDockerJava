export type SidebarSectionProps = {
    title: string;
    links: SidebarState[];
};

export type SidebarElementsProps = {
    dockerImageStates: Array<SidebarState>;
    dockerContainerStates: Array<SidebarState>;
};

export type SidebarState = {
    title: string;
    path: string;
    pageType: string;
    solved?: boolean;
};
