'use client';

import { Scene3D } from '@/components/game/Scene3D';

export default function Home() {
  return (
    <main className="relative w-full h-screen bg-slate-900">
      <Scene3D />

      {/* UI Overlay */}
      <div className="absolute top-6 left-6 z-10 p-6 bg-slate-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 pointer-events-none select-none">
        <h1 className="text-3xl font-black tracking-tight text-white mb-1">Skylines</h1>
        <p className="text-sm font-medium text-blue-200/80 uppercase tracking-widest">Focus & Build</p>
      </div>
    </main>
  );
}
