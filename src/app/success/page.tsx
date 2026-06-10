'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Heart, Share2, Copy, Check as CheckIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');
  const [coupleName, setCoupleName] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCoupleName = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      try {
        const docRef = doc(db, "stories", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCoupleName(docSnap.data().coupleName);
        }
      } catch (error) {
        console.error('Erro ao buscar nome do casal:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoupleName();
  }, [id]);

  const storyUrl = typeof window !== 'undefined' ? `${window.location.origin}/${id}` : '';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(storyUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    const message = `Olá! 💕 Criei uma surpresa especial para você no LovinDay. Veja aqui: ${storyUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message )}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin h-12 w-12 border-4 border-red-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p>Finalizando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-green-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-green-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-2xl w-full z-10 space-y-10 text-center">
        
        <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="flex justify-center">
            <div className="text-6xl animate-bounce">🎉</div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter">
            Pagamento   
            <span className="text-green-500">Confirmado!</span>
          </h1>
          <p className="text-zinc-400 text-lg">
            A história de <span className="text-white font-bold">{coupleName}</span> está pronta para ser compartilhada. 💕
          </p>
        </div>

        <div className="bg-gradient-to-b from-green-600/20 to-green-800/20 border border-green-600/30 rounded-3xl p-8 space-y-6 backdrop-blur-xl">
          
          <div>
            <p className="text-zinc-400 text-sm uppercase tracking-widest font-bold mb-3">Seu link exclusivo</p>
            <div className="bg-black/50 rounded-2xl p-4 border border-white/10 flex items-center justify-between gap-4">
              <p className="text-white font-mono text-sm truncate">{storyUrl}</p>
              <button
                onClick={copyToClipboard}
                className="bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-all flex-shrink-0"
              >
                {copied ? (
                  <CheckIcon className="text-green-500" size={18} />
                ) : (
                  <Copy className="text-white" size={18} />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <button
              onClick={shareWhatsApp}
              className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl active:scale-95"
            >
              <Share2 size={20} /> COMPARTILHAR NO WHATSAPP
            </button>
            <button
              onClick={() => router.push(`/${id}`)}
              className="w-full bg-white/10 hover:bg-white/20 py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all"
            >
              <Heart size={20} /> VER MINHA HISTÓRIA
            </button>
          </div>
        </div>

        <div className="text-center text-sm text-zinc-500 space-y-2">
          <p>✓ Seu link nunca expira</p>
          <p>✓ Compartilhe quantas vezes quiser</p>
          <p>✓ Acesso vitalício garantido</p>
        </div>

      </div>
    </div>
  );
}