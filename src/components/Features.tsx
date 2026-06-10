const features = [
  {
    icon: "🎵",
    title: "Música Especial",
    description:
      "Adicione a música que marcou a história de vocês.",
  },
  {
    icon: "📸",
    title: "Galeria de Fotos",
    description:
      "Até 5 momentos especiais em um só lugar.",
  },
  {
    icon: "🗓️",
    title: "Linha do Tempo",
    description:
      "Registre os momentos mais importantes do relacionamento.",
  },
  {
    icon: "✨",
    title: "Texto com IA",
    description:
      "Uma mensagem emocionante criada especialmente para vocês.",
  },
  {
    icon: "📱",
    title: "100% Responsivo",
    description:
      "Perfeito em celulares, tablets e computadores.",
  },
  {
    icon: "🔗",
    title: "Link Exclusivo",
    description:
      "Compartilhe uma página única criada para o casal.",
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32">
      <div className="text-center">
        <h2 className="text-5xl font-bold">
          Tudo que torna sua história especial
        </h2>

        <p className="mt-4 text-zinc-400">
          Uma experiência criada para emocionar.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="
              rounded-3xl
              border
              border-zinc-800
              bg-zinc-950/50
              p-8
              transition-all
              duration-300
              hover:border-red-500/40
              hover:bg-zinc-900
            "
          >
            <div className="text-4xl">
              {feature.icon}
            </div>

            <h3 className="mt-5 text-2xl font-bold">
              {feature.title}
            </h3>

            <p className="mt-3 text-zinc-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}