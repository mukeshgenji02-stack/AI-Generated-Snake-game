import { useState, useRef, useEffect, useCallback } from 'react';

export const TRACKS = [
  { id: 1, title: 'Neon Drive [AI Gen]', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 2, title: 'Cyber Sync [AI Gen]', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 3, title: 'Pixel Pursuit [AI Gen]', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
];

export const useMusicPlayer = () => {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Synchronize play state when track changes
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = TRACKS[currentTrackIndex].url;
            audioRef.current.load();
            if (isPlaying) {
                audioRef.current.play().catch(e => {
                    console.error("Auto-play prevented", e);
                    setIsPlaying(false);
                });
            }
        }
    }, [currentTrackIndex]);

    const togglePlay = useCallback(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play().then(() => {
                    setIsPlaying(true);
                }).catch(e => {
                    console.error("Play prevented", e);
                    setIsPlaying(false);
                });
            }
        }
    }, [isPlaying]);

    const playNext = useCallback(() => {
        setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
        setIsPlaying(true);
    }, []);

    const playPrev = useCallback(() => {
        setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
        setIsPlaying(true);
    }, []);

    const handleEnded = useCallback(() => {
        playNext();
    }, [playNext]);

    return {
        currentTrack: TRACKS[currentTrackIndex],
        isPlaying,
        togglePlay,
        playNext,
        playPrev,
        audioRef,
        handleEnded
    };
};
