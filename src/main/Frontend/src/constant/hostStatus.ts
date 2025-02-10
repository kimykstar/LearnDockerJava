export const HOST_STATUS = {
    STARTING: 'STARTING',
    READY: 'READY',
} as const;

export type HostStatus = (typeof HOST_STATUS)[keyof typeof HOST_STATUS];
