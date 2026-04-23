import { useSnakeGame } from '../hooks/useSnakeGame';
import { Trophy, RotateCcw } from 'lucide-react';

export const SnakeGame = () => {
  const { snake, food, score, isGameOver, isPaused, resetGame, GRID_SIZE } = useSnakeGame();

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Score Header */}
      <div className="flex gap-8 items-center bg-black/40 px-8 py-4 rounded-full border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
        <div className="flex items-center gap-3">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="text-xl font-bold text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] tracking-widest font-mono">
            SCORE: {score.toString().padStart(4, '0')}
          </span>
        </div>
      </div>

      {/* Game Board */}
      <div className="relative group p-1">
        {/* Glow border background */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        
        <div 
          className="relative bg-black/90 rounded-xl border border-white/10 overflow-hidden shadow-2xl"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
            width: 'min(80vw, 500px)',
            height: 'min(80vw, 500px)',
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
            const x = index % GRID_SIZE;
            const y = Math.floor(index / GRID_SIZE);
            const isHead = snake[0].x === x && snake[0].y === y;
            const isBody = snake.some(s => s.x === x && s.y === y);
            const isFood = food.x === x && food.y === y;

            return (
              <div 
                key={index} 
                className={`
                  w-full h-full border-[0.5px] border-white/[0.02]
                  ${isHead ? 'bg-cyan-300 shadow-[0_0_15px_#22d3ee] z-10 rounded-sm scale-110' : ''}
                  ${isBody && !isHead ? 'bg-cyan-500/80 shadow-[0_0_10px_rgba(6,182,212,0.5)] rounded-sm opacity-90' : ''}
                  ${isFood ? 'bg-fuchsia-500 shadow-[0_0_15px_#d946ef] rounded-full animate-pulse z-10 scale-75' : ''}
                `}
              />
            );
          })}

          {/* Overlays */}
          {isGameOver && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-20">
              <h2 className="text-4xl font-bold text-fuchsia-500 drop-shadow-[0_0_10px_rgba(217,70,239,0.8)] mb-2 uppercase tracking-widest">Game Over</h2>
              <p className="text-white/70 mb-6 font-mono">Final Score: {score}</p>
              <button 
                onClick={resetGame}
                className="flex items-center gap-2 px-6 py-3 bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/50 rounded-lg hover:bg-fuchsia-500/40 hover:scale-105 transition-all shadow-[0_0_15px_rgba(217,70,239,0.3)] font-semibold tracking-wider"
              >
                <RotateCcw className="w-5 h-5" />
                PLAY AGAIN
              </button>
            </div>
          )}

          {isPaused && !isGameOver && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center z-20">
              <h2 className="text-3xl tracking-widest font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] mb-6 uppercase">Paused</h2>
              <p className="text-white/70 animate-pulse font-mono tracking-widest">Press SPACE to resume</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="text-white/40 text-xs sm:text-sm tracking-wide text-center font-mono max-w-sm">
        Use <kbd className="bg-white/10 px-1 rounded">W</kbd><kbd className="bg-white/10 px-1 rounded ml-1">A</kbd><kbd className="bg-white/10 px-1 rounded ml-1">S</kbd><kbd className="bg-white/10 px-1 rounded ml-1">D</kbd> or <kbd className="bg-white/10 px-1 text-lg rounded ml-1">↑↓←→</kbd> to move. <br className="hidden sm:block mt-2"/> <kbd className="bg-white/10 px-2 rounded mt-2 inline-block">SPACE</kbd> to pause.
      </div>
    </div>
  );
};
