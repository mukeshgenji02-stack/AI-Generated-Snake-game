/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MusicPlayer } from './components/MusicPlayer';
import { SnakeGame } from './components/SnakeGame';
import { Gamepad2 } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-cyan-50 font-mono flex flex-col overflow-hidden relative selection:bg-cyan-500/30">
      {/* Background glow effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-cyan-900/30 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-900/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="flex-none p-6 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-center sm:justify-start">
          <h1 className="text-2xl font-bold tracking-widest text-white flex items-center gap-3 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)] uppercase">
            <Gamepad2 className="w-8 h-8 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-pulse" />
            NeonSnake
          </h1>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 z-10 mb-24 overflow-hidden">
        <SnakeGame />
      </main>

      {/* Music Player Footer (Fixed) */}
      <div className="fixed bottom-0 w-full z-20">
        <MusicPlayer />
      </div>
    </div>
  );
}
