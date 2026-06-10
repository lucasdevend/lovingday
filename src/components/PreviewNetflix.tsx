'use client';

import React, { useState, useEffect } from 'react';
import { Play, Info, Heart, Calendar, Star, ChevronRight, X, Plus, Music } from 'lucide-react';

interface PreviewProps {
  data: {
    coupleName: string;
    specialDate: string;
    musicUrl: string;
    message: string;
    photoUrls: string[];  // ← MUDEI DE "photos" PARA "photoUrls"
    timeline: { title: string; date: string }[];
    paid?: boolean;
    plan?: string;
    expiresAt?: string;
    pixKey?: string;
  };
}

export default function PreviewNetflix({ data }: PreviewProps) {

  const [stage, setStage] = useState<'profiles' | 'intro' | 'main'>('profiles');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [hearts, setHearts] = useState<{ id: number; left: string; delay: string; duration: string; size: number }[]>([]);

  const getPhotoUrl = (photo: any) => {
    if (!photo) return "/images/casal-demo.jpg";
    if (photo instanceof File) return URL.createObjectURL(photo);
    return photo;
  };

  const getYoutubeId = (url: string) => {
    if (!url) return null;
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const getSpotifyId = (url: string) => {
    if (!url) return null;
    const regex = /open\.spotify\.com\/track\/([a-zA-Z0-9]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const youtubeId = getYoutubeId(data.musicUrl);
  const spotifyId = getSpotifyId(data.musicUrl);

  useEffect(() => {
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + '%',
      delay: Math.random() * 5 + 's',
      duration: 5 + Math.random() * 10 + 's',
      size: 10 + Math.random() * 20
    }));
    setHearts(newHearts);

    if (stage === 'intro') {
      const timer = setTimeout(() => setStage('main'), 4000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  if (stage === 'profiles') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#141414] text-white">
        <h1 className="mb-8 text-3xl font-medium text-zinc-400 lg:text-5xl">Quem está assistindo?</h1>
        <div className="flex flex-wrap justify-center gap-8">
          <div onClick={() => setStage('intro')} className="group flex flex-col items-center gap-4 cursor-pointer">
            <div className="relative h-32 w-32 overflow-hidden rounded-md border-4 border-transparent transition-all group-hover:border-white lg:h-40 lg:w-40">
              <img src={(data.photoUrls as string[])?.[0] || ''} className="h-full w-full object-cover" alt="Perfil" />

            </div>
            <span className="text-xl text-zinc-400 group-hover:text-white">{data.coupleName}</span>
          </div>
          <div className="flex flex-col items-center gap-4 opacity-50 cursor-not-allowed">
            <div className="flex h-32 w-32 items-center justify-center rounded-md bg-zinc-800 lg:h-40 lg:w-40"><Plus size={48} /></div>
            <span className="text-xl text-zinc-400">Adicionar Perfil</span>
          </div>
        </div>
      </div>
    );
  }

  if (stage === 'intro') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-6">
          <h1 className="animate-tudum text-6xl font-black italic tracking-tighter text-red-600 lg:text-9xl">LOVINDAY</h1>
          <div className="h-1.5 w-48 overflow-hidden rounded-full bg-zinc-800 lg:w-64">
            <div className="h-full bg-red-600 animate-loading-bar" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#141414] text-white font-sans scrollbar-hide">
      
      {/* Estilos customizados injetados de forma segura */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes tudum { 0% { transform: scale(0.5); opacity: 0; filter: blur(20px); } 100% { transform: scale(1); opacity: 1; filter: blur(0); } }
        @keyframes loading-bar { 0% { width: 0%; } 100% { width: 100%; } }
        @keyframes fall { 0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; } 10% { opacity: 1; } 100% { transform: translateY(110vh) rotate(360deg); opacity: 0; } }
        @keyframes slow-zoom { 0% { transform: scale(1); } 100% { transform: scale(1.15); } }
        .animate-tudum { animation: tudum 1.5s cubic-bezier(0.21, 1.02, 0.73, 1) forwards; }
        .animate-loading-bar { animation: loading-bar 3s ease-in-out infinite; }
        .animate-fall { animation: fall linear infinite; }
        .animate-slow-zoom { animation: slow-zoom 20s linear infinite alternate; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      ` }} />

      {/* Chuva de Corações */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        {hearts.map(heart => (
          <div key={heart.id} className="absolute animate-fall opacity-0" style={{ left: heart.left, animationDelay: heart.delay, animationDuration: heart.duration }}>
            <Heart size={heart.size} className="fill-red-600/40 text-transparent" />
          </div>
        ))}
      </div>

        {/* PLAYER DE MÚSICA - TOPO DIREITO (REVISADO) */}
<div className="fixed top-6 right-6 lg:right-16 z-[100] flex flex-col items-end gap-3">
  <div className="flex items-center gap-4">
    <div className={`flex flex-col items-end transition-all duration-700 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600 mb-1">Nossa História</span>
      <span className="text-xs font-bold text-white/80">Clique no coração para ouvir ❤️</span>
    </div>
    <button 
      onClick={() => setIsPlaying(!isPlaying)}
      className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-500 backdrop-blur-xl ${isPlaying ? 'border-red-600 bg-red-600/20 scale-110 shadow-lg shadow-red-600/40' : 'border-white/20 bg-black/40 hover:border-red-600'}`}
    >
      <Heart size={24} className={`transition-all duration-500 ${isPlaying ? 'fill-red-600 text-red-600' : 'text-white'}`} />
    </button>
  </div>

  {/* MINI PLAYER (Aparece apenas quando clicado, essencial para o som funcionar) */}
  <div className={`overflow-hidden rounded-xl border border-white/10 bg-black/90 shadow-2xl transition-all duration-500 ${isPlaying ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
    <div className="p-2">
      {youtubeId && (
        <iframe 
          width="200" 
          height="112" 
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0&controls=1&modestbranding=1`} 
          allow="autoplay; encrypted-media" 
          className="rounded-lg shadow-inner"
        />
      )}
      {spotifyId && (
        <iframe 
          src={`https://open.spotify.com/embed/track/${spotifyId}?utm_source=generator&theme=0`} 
          width="200" 
          height="80" 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          className="rounded-lg shadow-inner"
        />
      )}
      <p className="mt-1 text-center text-[9px] text-zinc-500 italic">Dê o play acima se o som não iniciar ❤️</p>
    </div>
  </div>
</div>


      {/* BANNER PRINCIPAL */}
      <section className="relative h-[85vh] w-full lg:h-[95vh]">
        <div className="absolute inset-0 overflow-hidden bg-zinc-900">
         <img src={(data.photoUrls as string[])?.[0] || ''} className="h-full w-full object-cover brightness-[0.4] animate-slow-zoom" alt="Banner" />

          <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
        </div>

        <div className="absolute bottom-[15%] left-6 right-6 max-w-5xl space-y-6 lg:left-16">
          <h2 className="text-6xl font-black uppercase italic tracking-tighter text-white drop-shadow-2xl lg:text-9xl break-words leading-[0.9]">{data.coupleName}</h2>
          <div className="flex items-center gap-4 text-sm font-bold text-zinc-300 lg:text-lg">
            <span className="text-green-500">99% relevante</span>
            <span>{new Date(data.specialDate).getFullYear()}</span>
            <span className="border border-zinc-500 px-1 text-[10px]">18+</span>
            <span>1 Temporada</span>
            <span className="flex items-center gap-1"><Star size={16} className="fill-white" /> Favorito</span>
          </div>
          
          <p className="max-w-2xl text-lg text-zinc-300 drop-shadow-md lg:text-xl leading-relaxed">
              {data.message}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="flex items-center gap-2 rounded-md bg-white px-8 py-3 text-lg font-bold text-black transition hover:bg-white/80"><Play size={24} className="fill-black" /> Assistir</button>
            <button className="flex items-center gap-2 rounded-md bg-zinc-500/50 px-8 py-3 text-lg font-bold text-white backdrop-blur-md transition hover:bg-zinc-500/80"><Info size={24} /> Saiba mais</button>
          </div>
        </div>
      </section>

      {/* CONTEÚDO ADICIONAL */}
      <main className="relative z-10 -mt-20 space-y-16 pb-20 px-6 lg:px-16">
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-2xl font-bold">Cenas em Destaque</h3>
            <button onClick={() => setShowAllPhotos(true)} className="text-red-600 font-bold flex items-center gap-1 hover:underline">Ver tudo <ChevronRight size={20} /></button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(data.photoUrls as string[])?.slice(0, 6).map((photo, index) => (

              <div key={index} onClick={() => setSelectedPhoto(index)} className="group relative aspect-video overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 transition duration-500 hover:scale-105 cursor-zoom-in">
                <img src={getPhotoUrl(photo)} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" alt="Cena" />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-8 text-2xl font-bold">Episódios: Nossa Jornada</h3>
          <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide">
            {data.timeline.map((moment, index) => (
              <div key={index} className="min-w-[300px] rounded-xl bg-zinc-900/50 p-6 border border-white/5 backdrop-blur-sm transition hover:bg-zinc-800">
                <div className="mb-4 flex items-center justify-between text-red-600">
                  <span className="text-xs font-black uppercase tracking-widest">Episódio {index + 1}</span>
                  <Calendar size={16} />
                </div>
                <h4 className="mb-2 text-xl font-bold text-white">{moment.title}</h4>
                <p className="text-sm text-zinc-500">{moment.date}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* MODAL VER TUDO */}
      {showAllPhotos && (
        <div className="fixed inset-0 z-[150] bg-black/95 p-8 overflow-y-auto backdrop-blur-xl">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-black italic text-red-600">GALERIA COMPLETA</h2>
            <button onClick={() => setShowAllPhotos(false)} className="bg-white/10 p-3 rounded-full hover:bg-white/20"><X size={32} /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.photoUrls.map((photo, index) => (
              <div key={index} onClick={() => setSelectedPhoto(index)} className="aspect-video rounded-lg overflow-hidden border border-white/10 cursor-pointer hover:scale-105 transition">
                <img src={getPhotoUrl(photo)} className="w-full h-full object-cover" alt="Galeria" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL ZOOM */}
      {selectedPhoto !== null && (
        <div className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4" onClick={() => setSelectedPhoto(null)}>
          <img src={data.photoUrls[selectedPhoto]} className="max-h-full max-w-full object-contain rounded-lg" alt="Zoom" />
          <button className="absolute top-6 right-6 bg-black/50 p-3 rounded-full"><X size={32} /></button>
        </div>
      )}

      {/* PLAYER OCULTO */}
      <div className="pointer-events-none absolute h-[1px] w-[1px] opacity-[0.01] overflow-hidden">
        {isPlaying && (
          <>
            {youtubeId && <iframe width="100" height="100" src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0&controls=0`} allow="autoplay" />}
            {spotifyId && <iframe src={`https://open.spotify.com/embed/track/${spotifyId}?autoplay=1`} width="100" height="100" allow="autoplay; encrypted-media" />}
          </>
        )}
      </div>
    </div>
  );
}
