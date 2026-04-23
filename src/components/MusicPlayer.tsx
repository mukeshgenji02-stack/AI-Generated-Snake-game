import { useMusicPlayer } from '../hooks/useMusicPlayer';
import { Play, Pause, SkipForward, SkipBack, Music2, Volume2 } from 'lucide-react';

export const MusicPlayer = () => {
  const { 
    currentTrack, 
    isPlaying, 
    togglePlay, 
    playNext, 
    playPrev, 
    audioRef, 
    handleEnded 
  } = useMusicPlayer();

  return (
    <div className="bg-black/80 backdrop-blur-xl border-t border-cyan-500/20 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_-10px_30px_rgba(6,182,212,0.05)] relative overflow-hidden">
      {/* Visualizer glow background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-fuchsia-900/20 pointer-events-none opacity-50" />
      
      <audio 
        ref={audioRef} 
        onEnded={handleEnded}
        className="hidden"
      />

      {/* Track Info */}
      <div className="flex items-center gap-4 w-full sm:w-1/3 min-w-[200px] z-10">
        <div className="w-12 h-12 rounded-md bg-gradient-to-br from-cyan-500 to-fuchsia-500 p-[1px] shadow-[0_0_15px_rgba(217,70,239,0.3)] shrink-0">
          <div className="w-full h-full bg-black rounded-md flex items-center justify-center">
            {isPlaying ? (
              <div className="flex flex-col justify-end items-center gap-[2px] h-4 w-4 overflow-hidden p-0.5">
                  <div className="flex items-end gap-[2px] h-full">
                    <span className="w-[3px] bg-cyan-400 animate-pulse rounded-sm h-full"></span>
                    <span className="w-[3px] bg-fuchsia-400 animate-pulse rounded-sm h-3/4 opacity-80" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-[3px] bg-cyan-400 animate-pulse rounded-sm h-2/4 opacity-90" style={{ animationDelay: '0.4s' }}></span>
                  </div>
              </div>
            ) : (
              <Music2 className="w-5 h-5 text-white/50" />
            )}
          </div>
        </div>
        <div className="flex flex-col overflow-hidden min-w-0">
          <p className="font-semibold text-white truncate text-sm">
            {currentTrack.title}
          </p>
          <p className="text-xs text-white/50 uppercase tracking-wider truncate">AI Generated Audio</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 z-10 w-full sm:w-auto">
        <button 
          onClick={playPrev}
          className="p-2 text-white/70 hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all"
        >
          <SkipBack className="w-5 h-5" />
        </button>
        
        <button 
          onClick={togglePlay}
          className="p-3 bg-white text-black rounded-full hover:scale-105 hover:bg-cyan-100 transition-all shadow-[0_0_15px_rgba(255,255,255,0.4)]"
        >
          {isPlaying ? <Pause className="w-6 h-6" fill="currentColor" /> : <Play className="w-6 h-6 ml-0.5" fill="currentColor" />}
        </button>

        <button 
          onClick={playNext}
          className="p-2 text-white/70 hover:text-fuchsia-400 hover:drop-shadow-[0_0_8px_rgba(217,70,239,0.8)] transition-all"
        >
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      {/* Volume / Extra Placeholder */}
      <div className="hidden sm:flex items-center justify-end w-1/3 min-w-[200px] z-10 text-white/40">
        <Volume2 className="w-5 h-5 ml-auto" />
      </div>
    </div>
  );
};
