'use client';

import Link from "next/link";
import { Play, ChevronDown, Star, Bell, X } from "lucide-react";
import { useState, useEffect } from "react";

// Dados das avaliações
const reviews = [
  { name: "Marina Silva", comment: "Que surpresa incrível! Meu namorado chorou de emoção. Recomendo demais!", rating: 5 },
  { name: "Carlos Oliveira", comment: "Perfeito para pedir em casamento. A experiência Netflix é sensacional!", rating: 5 },
  { name: "Beatriz Santos", comment: "Simples, lindo e muito romântico. Valeu cada centavo!", rating: 5 },
  { name: "Felipe Costa", comment: "Minha namorada amou! A trilha sonora deixou tudo perfeito.", rating: 5 },
  { name: "Juliana Ferreira", comment: "Fácil de criar, resultado profissional. Muito bom mesmo!", rating: 5 },
  { name: "Ricardo Alves", comment: "Surpreendi minha esposa no aniversário. Ela não parou de sorrir!", rating: 5 },
  { name: "Amanda Rocha", comment: "Adorei! Compartilhei com todas as minhas amigas. Virou febre!", rating: 5 },
  { name: "Bruno Martins", comment: "Que forma criativa de declarar amor! Muito original!", rating: 5 },
  { name: "Gabriela Lima", comment: "Meu marido ficou de boca aberta. Melhor investimento ever!", rating: 5 },
  { name: "Lucas Pereira", comment: "Recomendei para meu melhor amigo. Ele também adorou!", rating: 5 },
];

// Dados para notificações ao vivo
const notifications = [
  "Igor acabou de criar uma história",
  "Marina publicou sua história de amor",
  "Carlos confirmou o pagamento",
  "Beatriz compartilhou no WhatsApp",
  "Felipe criou uma surpresa especial",
  "Juliana está criando sua história",
  "Ricardo publicou sua declaração",
  "Amanda compartilhou com amigos",
  "Bruno criou uma página exclusiva",
  "Gabriela finalizou seu presente",
];

// FAQ
const faqs = [
  {
    question: "Como funciona?",
    answer: "Você preenche um formulário com fotos, músicas, datas especiais e uma mensagem. Nós criamos uma página estilo Netflix com tudo isso. Você compartilha o link com quem você ama!"
  },
  {
    question: "Quanto custa?",
    answer: "Oferecemos dois planos: R$ 9,90 por 5 dias ou R$ 29,90 para acesso vitalício. Escolha o que faz mais sentido para você!"
  },
  {
    question: "Posso editar depois?",
    answer: "Por enquanto, você cria uma vez e compartilha. Se precisar mudar algo, você cria uma nova história. Estamos trabalhando em edição futura!"
  },
  {
    question: "Quanto tempo expira?",
    answer: "Depende do plano: 5 dias (R$ 9,90) ou nunca expira (R$ 29,90). Você escolhe quando compra!"
  },
  {
    question: "Posso compartilhar em redes sociais?",
    answer: "Sim! Você recebe um link único que pode compartilhar no WhatsApp, Instagram, Facebook ou qualquer rede social."
  },
  {
    question: "Meus dados são seguros?",
    answer: "Sim! Usamos criptografia de ponta a ponta e servidores seguros. Seus dados de pagamento nunca são armazenados."
  },
];

export default function Hero() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  // Notificações ao vivo
  useEffect(() => {
    const interval = setInterval(() => {
      const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
      setNotification(randomNotification);
      setShowNotification(true);

      // Esconde a notificação após 4 segundos
      setTimeout(() => setShowNotification(false), 4000);
    }, 10000); // A cada 10 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative flex min-h-screen items-center justify-center px-6 text-center overflow-hidden">
        
        {/* Efeitos de Brilho de Fundo */}
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/10 blur-[220px]" />
        <div className="absolute bottom-0 left-1/2 h-[400px] w-[900px] -translate-x-1/2 rounded-full bg-red-500/10 blur-[180px]" />

        <div className="relative z-20 max-w-6xl">
          <h1 className="text-5xl font-extrabold leading-tight md:text-7xl">
            Transforme sua história
            de amor em uma experiência
            <span className="text-red-400">
              inesquecível
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-xl text-zinc-400">
            Crie uma página exclusiva com fotos,
            músicas, momentos especiais e uma
            mensagem única para quem você ama.
          </p> 

          <div className="mt-12 flex flex-col justify-center gap-6 sm:flex-row items-center">
            <Link
              href="/criar"
              className="
              w-full sm:w-auto
              rounded-2xl
              bg-red-600
              px-10
              py-5
              text-lg
              font-bold
              transition-all
              duration-300
              hover:scale-105
              hover:bg-red-700
              hover:shadow-[0_0_40px_rgba(239,68,68,0.6)]"
            >
              Criar Minha História
            </Link>

            <Link 
              href="/preview" 
              target="_blank"
              className="
              w-full sm:w-auto
              flex items-center justify-center gap-3 
              rounded-2xl 
              bg-white/10 
              px-10 
              py-5 
              text-lg
              font-bold 
              text-white 
              backdrop-blur-md 
              transition-all 
              duration-300
              hover:bg-white/20
              hover:scale-105"
            >
              <Play className="fill-white" size={20} />
              Ver Demonstração
            </Link>
          </div>
        </div>
      </section>

      {/* AVALIAÇÕES */}
      <section className="relative py-20 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-4">
            Histórias que Tocaram Corações ❤️
          </h2>
          <p className="text-center text-zinc-400 mb-16">Veja o que nossos clientes dizem sobre suas experiências</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {reviews.map((review, index) => (
              <div key={index} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-xl hover:border-red-600/50 transition-all">
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-zinc-300 text-sm mb-4">"{review.comment}"</p>
                <p className="font-bold text-white">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-20 px-6 bg-black">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-16">
            Perguntas Frequentes
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden backdrop-blur-xl">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 hover:bg-zinc-800/50 transition-all"
                >
                  <span className="font-bold text-lg text-white text-left">{faq.question}</span>
                  <ChevronDown 
                    size={24} 
                    className={`text-red-600 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                  />
                </button>
                
                {openFaq === index && (
                  <div className="px-6 pb-6 text-zinc-400 border-t border-zinc-800">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOTIFICAÇÃO AO VIVO */}
      {showNotification && notification && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-red-600 text-white rounded-2xl px-6 py-4 shadow-2xl flex items-center gap-3 max-w-sm">
            <Bell size={20} className="animate-bounce" />
            <div>
              <p className="font-bold text-sm">{notification}</p>
              <p className="text-xs text-red-100">agora</p>
            </div>
            <button 
              onClick={() => setShowNotification(false)}
              className="ml-auto hover:bg-red-700 p-1 rounded-full transition-all"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
