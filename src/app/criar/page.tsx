"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { Calendar, Music, Heart, Image as ImageIcon, Sparkles, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";

export default function CriarPage() {
  const [step, setStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  // Estados dos Dados
  const [coupleName, setCoupleName] = useState("");
  const [specialDate, setSpecialDate] = useState("");
  const [musicUrl, setMusicUrl] = useState("");
  const [message, setMessage] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [timeline, setTimeline] = useState<{ title: string; date: string }[]>([]);
  
  // Estados Auxiliares
  const [momentTitle, setMomentTitle] = useState("");
  const [momentDate, setMomentDate] = useState("");
  const totalSteps = 7;

  // --- FUNÇÕES DE LÓGICA ---

  const canContinue = () => {
    switch (step) {
      case 1: return coupleName.trim().length > 2;
      case 2: return specialDate !== "";
      case 3: return musicUrl.trim().length > 5;
      case 4: return photos.length > 0;
      case 5: return timeline.length > 0;
      case 6: return message.trim().length > 10;
      default: return true;
    }
  };

  const getYoutubeEmbedUrl = (url: string) => {
    const match = url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const getSpotifyEmbedUrl = (url: string ) => {
    const match = url?.match(/open\.spotify\.com\/track\/([^?]+)/);
    return match ? `https://open.spotify.com/embed/track/${match[1]}` : null;
  };

  const generateMessage = ( ) => {
    setMessage(`${coupleName || "Meu amor"},
Desde ${specialDate || "o nosso primeiro momento especial"}, nossa história começou a ganhar forma de um jeito único.
Cada risada, cada conversa, cada detalhe e cada memória que construímos juntos fazem parte de algo que eu guardo com muito carinho.
Esta página é apenas uma pequena forma de mostrar o quanto a nossa história é importante para mim.
Com amor ❤️`);
  };

        const handleSave = async () => {
    if (!coupleName) return alert("Por favor, coloque o nome do casal!");
    setIsSaving(true);

    // Suas configurações oficiais do Cloudinary
    const CLOUD_NAME = "ddzghdejh"; 
    const UPLOAD_PRESET = "lovin-preset"; 

    // Gera o link amigável (slug)
    const slug = coupleName.toLowerCase().trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    try {
      console.log("📸 Enviando fotos para o Cloudinary...");
      
      // 1. Upload das fotos (Cloudinary)
      const photoUrls = await Promise.all(
        photos.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", UPLOAD_PRESET);

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            { method: "POST", body: formData }
           );

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || "Erro no upload");
          }
          
          const data = await response.json();
          return data.secure_url; 
        })
      );

      console.log("📝 Fotos enviadas! Salvando dados no Firebase...");

      // 2. Salva no Firebase Firestore
      await setDoc(doc(db, "stories", slug), {
        coupleName,
        specialDate,
        musicUrl,
        message,
        timeline,
        photoUrls, 
        createdAt: new Date().toISOString(),
        paid: false,
      });

          console.log("🎉 Sucesso total!");
            alert("História criada com sucesso! ❤️");

            // ✅ REDIRECIONAR PARA CHECKOUT EM VEZ DE IR DIRETO PARA A HISTÓRIA
          router.push(`/checkout?id=${slug}`);


    } catch (error: any) {
      console.error("Erro detalhado:", error);
      alert("Houve um problema: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };



  return (
    <main className="min-h-screen bg-black text-white selection:bg-red-600">
      <div className="mx-auto max-w-4xl px-6 py-12 lg:py-20">

        {/* Barra de Progresso Estilizada */}
        <div className="mb-12">
          <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-zinc-500">
            <span>Progresso da Jornada</span>
            <span className="text-red-600">{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
            <div 
              className="h-full bg-red-600 transition-all duration-500 shadow-[0_0_15px_rgba(220,38,38,0.5)]" 
              style={{ width: `${(step / totalSteps) * 100}%` }} 
            />
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-950/50 p-8 md:p-12 backdrop-blur-sm">
          
          {/* PASSO 1: NOME */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h1 className="text-4xl font-black tracking-tighter md:text-5xl">Quem são as estrelas?</h1>
              <p className="mt-4 text-zinc-400">Digite o nome do casal para começarmos a produção.</p>
              <input
                value={coupleName}
                onChange={(e) => setCoupleName(e.target.value)}
                className="mt-10 w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 text-xl outline-none focus:border-red-600 transition"
                placeholder="Ex: Bruno e Ana"
              />
            </div>
          )}

          {/* PASSO 2: DATA */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h1 className="text-4xl font-black tracking-tighter md:text-5xl">O dia da estreia</h1>
              <p className="mt-4 text-zinc-400">Quando a história de vocês começou oficialmente?</p>
              <div className="relative mt-10">
                <Calendar className="absolute left-5 top-5 text-zinc-500" size={24} />
                <input
                  type="date"
                  value={specialDate}
                  onChange={(e) => setSpecialDate(e.target.value)}
                  className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 pl-14 text-xl outline-none focus:border-red-600 transition color-scheme-dark"
                />
              </div>
            </div>
          )}

          {/* PASSO 3: MÚSICA */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h1 className="text-4xl font-black tracking-tighter md:text-5xl">Trilha Sonora</h1>
              <p className="mt-4 text-zinc-400">Cole o link da música que define vocês (Spotify ou YouTube).</p>
              <div className="relative mt-10">
                <Music className="absolute left-5 top-5 text-zinc-500" size={24} />
                <input
                  value={musicUrl}
                  onChange={(e) => setMusicUrl(e.target.value)}
                  className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 pl-14 text-xl outline-none focus:border-red-600 transition"
                  placeholder="Link da música..."
                />
              </div>
              {(getYoutubeEmbedUrl(musicUrl) || getSpotifyEmbedUrl(musicUrl)) && (
                <div className="mt-8 rounded-2xl border border-zinc-800 bg-black/40 p-4 animate-in zoom-in-95 duration-300">
                  <p className="mb-4 text-xs font-bold uppercase text-zinc-500">Prévia Carregada</p>
                  {getYoutubeEmbedUrl(musicUrl) && <iframe className="h-48 w-full rounded-xl" src={getYoutubeEmbedUrl(musicUrl)!} allowFullScreen />}
                  {getSpotifyEmbedUrl(musicUrl) && <iframe src={getSpotifyEmbedUrl(musicUrl)!} width="100%" height="152" className="rounded-xl" allow="encrypted-media" />}
                </div>
              )}
            </div>
          )}

          {/* PASSO 4: FOTOS */}
          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h1 className="text-4xl font-black tracking-tighter md:text-5xl">Cenas do Filme</h1>
              <p className="mt-4 text-zinc-400">Selecione até 5 fotos que marcaram a jornada de vocês.</p>
              <label className="mt-10 flex h-48 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-zinc-800 bg-zinc-900/30 transition hover:border-red-600 hover:bg-red-600/5 group">
                <ImageIcon className="text-zinc-600 group-hover:text-red-500 transition" size={48} />
                <span className="mt-4 font-bold text-zinc-400">Clique para selecionar</span>
                <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => setPhotos(Array.from(e.target.files || []).slice(0, 5))} />
              </label>
              {photos.length > 0 && (
                <div className="mt-8 grid grid-cols-5 gap-4">
                  {photos.map((p, i) => (
                    <div key={i} className="aspect-square overflow-hidden rounded-xl border border-zinc-800 shadow-xl">
                      <img src={URL.createObjectURL(p)} className="h-full w-full object-cover" alt="" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* PASSO 5: TIMELINE */}
          {step === 5 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h1 className="text-4xl font-black tracking-tighter md:text-5xl">Episódios Marcantes</h1>
              <p className="mt-4 text-zinc-400">Adicione os capítulos principais da história de vocês.</p>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <input value={momentTitle} onChange={(e) => setMomentTitle(e.target.value)} placeholder="Título do momento" className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 outline-none focus:border-red-600" />
                <input type="date" value={momentDate} onChange={(e) => setMomentDate(e.target.value)} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 outline-none focus:border-red-600" />
              </div>
              <button onClick={() => { if(momentTitle && momentDate) { setTimeline([...timeline, { title: momentTitle, date: momentDate }]); setMomentTitle(""); setMomentDate(""); } }} className="mt-4 w-full rounded-xl bg-white py-3 font-bold text-black hover:bg-zinc-200 transition">
                + Adicionar Momento
              </button>
              <div className="mt-8 space-y-3">
                {timeline.map((item, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl bg-zinc-900 p-4 border border-zinc-800">
                    <span className="font-bold">{item.title}</span>
                    <span className="text-zinc-500 text-sm">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PASSO 6: MENSAGEM */}
          {step === 6 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h1 className="text-4xl font-black tracking-tighter md:text-5xl">Créditos Finais</h1>
              <p className="mt-4 text-zinc-400">Escreva uma mensagem especial para fechar com chave de ouro.</p>
              <button onClick={generateMessage} className="mt-8 flex items-center gap-2 rounded-xl bg-red-600/10 px-4 py-2 text-sm font-bold text-red-500 border border-red-600/20 hover:bg-red-600/20 transition">
                <Sparkles size={16} /> IA: Sugerir Mensagem
              </button>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={6} className="mt-4 w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 text-lg outline-none focus:border-red-600 transition" placeholder="Escreva aqui..." />
            </div>
          )}

          {/* PASSO 7: RESUMO */}
          {step === 7 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
              <Heart className="mx-auto text-red-600 animate-pulse" size={64} fill="currentColor" />
              <h1 className="mt-6 text-4xl font-black tracking-tighter md:text-5xl">Tudo pronto!</h1>
              <p className="mt-4 text-zinc-400">Sua história foi produzida com sucesso. Vamos publicar?</p>
              <div className="mt-10 rounded-2xl bg-zinc-900/50 p-8 border border-zinc-800 text-left space-y-4">
                <p className="flex items-center gap-3 text-zinc-300"><span className="text-red-500 font-bold">Casal:</span> {coupleName}</p>
                <p className="flex items-center gap-3 text-zinc-300"><span className="text-red-500 font-bold">Estreia:</span> {specialDate}</p>
                <p className="flex items-center gap-3 text-zinc-300"><span className="text-red-500 font-bold">Mídia:</span> {photos.length} fotos e trilha sonora</p>
              </div>
            </div>
          )}

          {/* Navegação de Passos */}
          <div className="mt-16 flex items-center justify-between border-t border-zinc-900 pt-8">
            <button 
              disabled={step === 1 || isSaving} 
              onClick={() => setStep(step - 1)} 
              className="flex items-center gap-2 text-zinc-500 hover:text-white disabled:opacity-0 transition font-bold"
            >
              <ArrowLeft size={20} /> Voltar
            </button>

            <button
              disabled={!canContinue() || isSaving}
              onClick={() => step < totalSteps ? setStep(step + 1) : handleSave()}
              className="flex items-center gap-3 rounded-2xl bg-red-600 px-10 py-5 text-lg font-black transition-all hover:scale-105 hover:bg-red-700 hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] disabled:opacity-40 disabled:hover:scale-100"
            >
              {isSaving ? (
                <> <Loader2 className="animate-spin" size={24} /> Salvando... </>
              ) : (
                <> {step === totalSteps ? "Publicar Minha História" : "Próximo Passo"} <ArrowRight size={20} /> </>
              )}
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}
