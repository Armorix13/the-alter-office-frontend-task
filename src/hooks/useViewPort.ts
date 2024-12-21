import { useState, useRef, useEffect } from 'react';

const useVideoInViewport = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [_isInViewport, setIsInViewport] = useState<boolean>(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries: IntersectionObserverEntry[]) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        videoRef.current?.play();
                        setIsInViewport(true);
                    } else {
                        videoRef.current?.pause();
                        setIsInViewport(false);
                    }
                });
            },
            { threshold: 0.5 }
        );
        if (videoRef.current) {
            observer.observe(videoRef.current);
        }
        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    return { videoRef };
};

export default useVideoInViewport;
