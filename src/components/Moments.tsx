const moments = [
  {
    emoji: "❤️",
    title: "Dia dos Namorados",
    description:
      "Surpreenda com uma experiência única e inesquecível.",
  },
  {
    emoji: "💍",
    title: "Pedido de Casamento",
    description:
      "Transforme sua história em um momento emocionante.",
  },
  {
    emoji: "🎂",
    title: "Aniversário de Namoro",
    description:
      "Reviva os momentos mais especiais juntos.",
  },
  {
    emoji: "✈️",
    title: "Primeira Viagem",
    description:
      "Guarde as melhores memórias em um só lugar.",
  },
  {
    emoji: "🏠",
    title: "Nova Fase",
    description:
      "Celebre conquistas e novos começos.",
  },
  {
    emoji: "💌",
    title: "Declaração Especial",
    description:
      "Diga o que sente de uma forma diferente.",
  },
];

export default function Moments() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32">
      <div className="text-center">
        <h2 className="text-5xl font-bold">
          Feito para momentos especiais
        </h2>

        <p className="mt-4 text-zinc-400">
          Qualquer história merece ser lembrada.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {moments.map((moment) => (
          <div
            key={moment.title}
            className="
              group
              rounded-3xl
              border
              border-zinc-800
              bg-zinc-950/50
              p-8
              transition-all
              duration-300
              hover:-translate-y-2
              hover:border-red-500/40
            "
          >
            <div className="text-5xl">
              {moment.emoji}
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              {moment.title}
            </h3>

            <p className="mt-3 text-zinc-400">
              {moment.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}