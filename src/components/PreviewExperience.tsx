export default function PreviewExperience() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32">
      <div className="mb-16 text-center">
        <h2 className="text-5xl font-bold">
          Veja como ficará a surpresa
        </h2>

        <p className="mt-4 text-zinc-400">
          Uma experiência exclusiva criada para o casal.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl">
        <div className="relative h-[600px]">

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />

            <img
                src="/images/casal-demo.jpg"
                alt="casal"
                className="h-full w-full object-cover"
            />

          <div className="absolute bottom-0 z-20 p-12">
            <h3 className="text-6xl font-bold">
                Nossa História
            </h3>

            <p className="mt-4 text-zinc-300">
                14 de Fevereiro de 2022
                O dia em que tudo começou
            </p>

            <div className="mt-8 flex gap-4">
              <button className="rounded-xl bg-white px-8 py-4 font-bold text-black">
                Entrar
              </button>

              <button className="rounded-xl bg-zinc-700/60 px-8 py-4">
                Ver História
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 p-10 md:grid-cols-4">
          <div className="rounded-2xl bg-zinc-900 p-6">
            <h4 className="font-bold">🎵 Música</h4>
            <p className="mt-2 text-zinc-400">
              Música favorita do casal
            </p>
          </div>

          <div className="rounded-2xl bg-zinc-900 p-6">
            <h4 className="font-bold">📸 Fotos</h4>
            <p className="mt-2 text-zinc-400">
              Até 5 fotos especiais
            </p>
          </div>

          <div className="rounded-2xl bg-zinc-900 p-6">
            <h4 className="font-bold">🗓️ Linha do Tempo</h4>
            <p className="mt-2 text-zinc-400">
              Datas importantes
            </p>
          </div>

          <div className="rounded-2xl bg-zinc-900 p-6">
            <h4 className="font-bold">✨ IA</h4>
            <p className="mt-2 text-zinc-400">
              Mensagem personalizada
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}