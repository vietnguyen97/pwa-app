import { AlertTitle, Alert, Snackbar, Button, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

export const AppVersionMonitor = () => {
    let isCheckingUpdates = false;
    const currentVersionTag = useRef('');
    const lastVersionTag = useRef('');
    const timer = useRef<ReturnType<typeof setInterval>>();

    const [openAlert, setOpenAlert] = useState(false);

    const { location } = window;

    const handleNotice = (versionTag: string) => {
        currentVersionTag.current = versionTag;
        setOpenAlert(true);
    };

    const handleRefresh = () => {
        lastVersionTag.current = currentVersionTag.current;
        location.reload();
    };

    const getVersionTag = async (isCache = false) => {
        try {
            const response = await fetch('/', {
                cache: !isCache ? 'no-cache' : 'default',
                method: 'HEAD',
            });
            return response.headers.get('etag') || response.headers.get('last-modified');
        } catch {
            return null;
        }
    };

    const checkForUpdates = async () => {
        const versionTag = await getVersionTag();
        if (!versionTag) {
            return;
        }

        if (lastVersionTag.current !== versionTag) {
            clearInterval(timer.current);
            handleNotice(versionTag);
        }
    };

    const start = async () => {
        if (!lastVersionTag.current) {
            const currentVersionTag = await getVersionTag(true);
            if (!currentVersionTag) {
                return;
            }
            lastVersionTag.current = currentVersionTag;
        }

        timer.current = setInterval(checkForUpdates, 1 * 1000);
    };

    const stop = () => {
        clearInterval(timer.current);
        timer.current = undefined;
    };

    const handleVisibilitychange = () => {
        if (document.hidden) {
            stop();
        } else if (!isCheckingUpdates) {
            isCheckingUpdates = true;
            checkForUpdates().finally(() => {
                isCheckingUpdates = false;
                start();
            });
        }
    };

    useEffect(() => {
        /* Mounted */
        start();
        document.addEventListener('visibilitychange', handleVisibilitychange);

        /* UnMounted */
        return () => {
            stop();
            document.removeEventListener('visibilitychange', handleVisibilitychange);
        };
    }, []);

    return (
        <Snackbar
            open={openAlert}
            onClose={() => setOpenAlert(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert
                sx={{
                    borderRadius: '8px',
                    backgroundColor: "red",
                    border: `1px solid red`,
                }}
            >
                <AlertTitle sx={{ color: "red" }}>"A New Version Update Notification"</AlertTitle>
                <Typography variant="body2" sx={{ color: "red" }}>
                    {('A new version is available. Please press Update to receive latest version.')}
                </Typography>
                <Button variant="contained" color="primary" size="small" onClick={handleRefresh} sx={{ mt: 2 }}>
                    {('Update')}
                </Button>
            </Alert>
        </Snackbar>
    );
};

 