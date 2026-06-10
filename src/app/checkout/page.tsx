'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Heart, Check, ArrowRight, ShieldCheck, Star, Zap, Lock, Copy, Check as CheckIcon, Clock, Infinity } from 'lucide-react';
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type PlanType = 'temporary' | 'permanent' | null;

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();
  const [coupleName, setCoupleName] = useState('Sua História');
  const [selectedPlan, setSelectedPlan] = useState<PlanType>(null);
  const [pixKey, setPixKey] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPixSection, setShowPixSection] = useState(false);

  // Gerar chave PIX aleatória
  const generatePixKey = () => {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  };

  useEffect(() => {
    const fetchCoupleName = async () => {
      if (!id) return;
      const docRef = doc(db, "stories", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCoupleName(docSnap.data().coupleName);
      }
    };
    fetchCoupleName();
  }, [id]);

  const selectPlan = (plan: PlanType) => {
    setSelectedPlan(plan);
    setPixKey(generatePixKey());
    setShowPixSection(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmPayment = async () => {
  if (!id || typeof id !== 'string') {
    alert('ID inválido');
    return;
  }
  
  setLoading(true);
  try {
    const docRef = doc(db, "stories", id);
    
    // Calcular data de expiração
    let expiresAt: string | null = null;
    if (selectedPlan === 'temporary') {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 5);
      expiresAt = futureDate.toISOString();
    }

    await updateDoc(docRef, {
      paid: true,
      paidAt: new Date().toISOString(),
      plan: selectedPlan,
      expiresAt: expiresAt,
      pixKey: pixKey,
    });
    
    router.push(`/success?id=${id}`);
  } catch (error: any) {
    console.error('Erro ao confirmar pagamento:', error);
    alert('Erro ao processar pagamento. Tente novamente.');
  }
  setLoading(false);
};


  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Efeitos de Fundo */}
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-red-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-red-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl w-full z-10 space-y-10">
        
        {/* Cabeçalho */}
        <div className="text-center space-y-4 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/20 px-4 py-2 rounded-full text-red-500 text-sm font-black uppercase tracking-widest">
            <Zap size={14} className="fill-red-500" /> Escolha seu Plano
          </div>
          <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
            Libere o   

            <span className="text-red-600">acesso</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-md mx-auto">
            Escolha como deseja compartilhar a história de <span className="text-white font-bold">{coupleName}</span>
          </p>
        </div>

        {/* Seleção de Planos */}
        {!showPixSection ? (
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Plano Temporário - 5 Dias */}
            <div
              onClick={() => selectPlan('temporary')}
              className={`rounded-3xl p-8 cursor-pointer transition-all transform hover:scale-105 border-2 ${
                selectedPlan === 'temporary'
                  ? 'bg-red-600/20 border-red-600'
                  : 'bg-zinc-900/40 border-white/5 hover:border-white/10'
              } backdrop-blur-xl`}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="text-orange-500" size={24} />
                    <h3 className="text-2xl font-black">5 Dias</h3>
                  </div>
                  <p className="text-zinc-400 text-sm">Acesso temporário</p>
                </div>
                {selectedPlan === 'temporary' && (
                  <div className="bg-red-600 rounded-full p-2">
                    <Check className="text-white" size={20} />
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-8">
                <p className="flex items-center gap-3 text-zinc-300 text-sm">
                  <Check className="text-green-500" size={18} />
                  Acesso por 5 dias
                </p>
                <p className="flex items-center gap-3 text-zinc-300 text-sm">
                  <Check className="text-green-500" size={18} />
                  Experiência Netflix completa
                </p>
                <p className="flex items-center gap-3 text-zinc-300 text-sm">
                  <Check className="text-green-500" size={18} />
                  Trilha sonora e fotos
                </p>
                <p className="flex items-center gap-3 text-zinc-500 text-sm">
                  <Lock className="text-zinc-600" size={18} />
                  Expira em 5 dias
                </p>
              </div>

              <div className="border-t border-white/5 pt-6">
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Valor</p>
                <p className="text-4xl font-black">R$ 9,90</p>
              </div>
            </div>

            {/* Plano Permanente - Vitalício */}
            <div
              onClick={() => selectPlan('permanent')}
              className={`rounded-3xl p-8 cursor-pointer transition-all transform hover:scale-105 border-2 relative ${
                selectedPlan === 'permanent'
                  ? 'bg-green-600/20 border-green-600'
                  : 'bg-zinc-900/40 border-white/5 hover:border-white/10'
              } backdrop-blur-xl`}
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-600 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                  ⭐ Mais Popular
                </span>
              </div>

              <div className="flex items-start justify-between mb-6 pt-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Infinity className="text-green-500" size={24} />
                    <h3 className="text-2xl font-black">Vitalício</h3>
                  </div>
                  <p className="text-zinc-400 text-sm">Acesso para sempre</p>
                </div>
                {selectedPlan === 'permanent' && (
                  <div className="bg-green-600 rounded-full p-2">
                    <Check className="text-white" size={20} />
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-8">
                <p className="flex items-center gap-3 text-zinc-300 text-sm">
                  <Check className="text-green-500" size={18} />
                  Acesso para sempre
                </p>
                <p className="flex items-center gap-3 text-zinc-300 text-sm">
                  <Check className="text-green-500" size={18} />
                  Experiência Netflix completa
                </p>
                <p className="flex items-center gap-3 text-zinc-300 text-sm">
                  <Check className="text-green-500" size={18} />
                  Trilha sonora e fotos
                </p>
                <p className="flex items-center gap-3 text-green-400 text-sm font-bold">
                  <Infinity className="text-green-500" size={18} />
                  Nunca expira
                </p>
              </div>

              <div className="border-t border-white/5 pt-6">
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Valor</p>
                <div>
                  <span className="text-zinc-500 line-through text-sm">R$ 49,90</span>
                  <p className="text-4xl font-black">R$ 29,90</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Seção de PIX */
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            
            {/* Coluna 1: Instruções */}
            <div className="bg-zinc-900/40 border border-white/5 rounded-3xl p-8 backdrop-blur-xl space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Star className="text-yellow-500 fill-yellow-500" size={20} /> 
                Como Pagar
              </h3>
              
              <ol className="space-y-4">
                {[
                  { num: '1', text: 'Abra seu app de banco' },
                  { num: '2', text: 'Escolha a opção PIX' },
                  { num: '3', text: 'Selecione "Chave Aleatória"' },
                  { num: '4', text: 'Cole a chave abaixo' },
                  { num: '5', text: 'Confirme o pagamento' },
                ].map((item) => (
                  <li key={item.num} className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                      {item.num}
                    </div>
                    <span className="text-zinc-400 pt-1">{item.text}</span>
                  </li>
                ))}
              </ol>

              <div className="pt-4 border-t border-white/5">
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-3">Plano Selecionado</p>
                <p className="text-2xl font-black mb-2">
                  {selectedPlan === 'temporary' ? '5 Dias' : 'Vitalício'}
                </p>
                <p className="text-3xl font-black text-red-600">
                  {selectedPlan === 'temporary' ? 'R$ 9,90' : 'R$ 29,90'}
                </p>
              </div>
            </div>

            {/* Coluna 2: Chave PIX */}
            <div className="bg-gradient-to-b from-red-600 to-red-800 rounded-3xl p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(220,38,38,0.3)]">
              <div>
                <p className="text-white/70 text-sm mb-4 uppercase tracking-widest font-bold">Chave PIX</p>
                
                {/* Box da Chave */}
                <div className="bg-black/30 rounded-2xl p-6 mb-6 border border-white/10 backdrop-blur-sm">
                  <p className="text-white font-mono text-sm break-all leading-relaxed">
                    {pixKey}
                  </p>
                </div>

                {/* Botão Copiar */}
                <button
                  onClick={copyToClipboard}
                  className="w-full bg-white text-red-700 py-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-zinc-100 transition-all mb-4"
                >
                  {copied ? (
                    <>
                      <CheckIcon size={18} /> COPIADO!
                    </>
                  ) : (
                    <>
                      <Copy size={18} /> COPIAR CHAVE
                    </>
                  )}
                </button>
              </div>

              {/* Aviso */}
              <div className="bg-black/30 rounded-xl p-4 border border-white/10 text-xs text-white/70">
                <p className="font-bold mb-1">⏱️ Válido por 24 horas</p>
                <p>Após pagar, clique em "Confirmar Pagamento" abaixo.</p>
              </div>
            </div>
          </div>
        )}

        {/* Botões de Ação */}
        <div className="flex gap-4">
          {showPixSection && (
            <button
              onClick={() => {
                setShowPixSection(false);
                setSelectedPlan(null);
              }}
              className="flex-1 bg-zinc-800 hover:bg-zinc-700 py-5 rounded-2xl font-black text-lg transition-all"
            >
              ← Voltar
            </button>
          )}
          
          {showPixSection && (
            <button
              onClick={handleConfirmPayment}
              disabled={loading}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-zinc-700 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl active:scale-95"
            >
              {loading ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  PROCESSANDO...
                </>
              ) : (
                <>
                  ✓ CONFIRMAR PAGAMENTO <ArrowRight size={20} />
                </>
              )}
            </button>
          )}
        </div>

        {/* Rodapé */}
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-40 grayscale pt-4">
          <span className="text-xs font-bold uppercase tracking-widest">Transação Segura</span>
          <span className="text-xs font-bold uppercase tracking-widest">Dados Protegidos</span>
          <span className="text-xs font-bold uppercase tracking-widest">Suporte 24/7</span>
        </div>

      </div>
    </div>
  );
}
