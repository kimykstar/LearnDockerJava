import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestHostStatus } from '../api/quiz';
import { HostStatus, HOST_STATUS } from '../constant/hostStatus';

type UseHostStatusProps = {
    setInitVisualization: () => Promise<void>;
};

export const useHostStatus = ({ setInitVisualization }: UseHostStatusProps) => {
    const navigate = useNavigate();
    const [hostStatus, setHostStatus] = useState<HostStatus>(HOST_STATUS.STARTING);

    useEffect(() => {
        const initializeHostStatus = async () => {
            const response = await requestHostStatus(navigate);

            if (!response) {
                return;
            }

            setHostStatus(response);

            if (response === HOST_STATUS.READY) {
                setInitVisualization();
                return;
            }
        };

        initializeHostStatus();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return hostStatus;
};
