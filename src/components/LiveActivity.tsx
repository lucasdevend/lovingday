const activities = [
  "❤️ Nova história criada agora",
  "🎵 Música adicionada recentemente",
  "✨ Mensagem gerada por IA",
  "📸 5 fotos enviadas",
  "💍 Momento especial registrado",
];

export default function LiveActivity() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="mb-10 text-center text-4xl font-bold">
        Histórias acontecendo agora
      </h2>

      <div className="grid gap-4">
        {activities.map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 backdrop-blur"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}