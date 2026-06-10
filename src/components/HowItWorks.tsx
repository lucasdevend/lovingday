export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Envie suas fotos",
      desc: "Escolha até 5 fotos que marcaram a história de vocês.",
    },
    {
      number: "02",
      title: "Escolha a música",
      desc: "Adicione uma música especial do Spotify ou YouTube.",
    },
    {
      number: "03",
      title: "Compartilhe a surpresa",
      desc: "Receba um link exclusivo para emocionar quem você ama.",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-32">
      <div className="text-center">
        <h2 className="text-5xl font-bold">
          Crie em menos de 5 minutos
        </h2>

        <p className="mt-4 text-zinc-400">
          Simples, rápido e inesquecível.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.number}
            className="
              rounded-3xl
              border
              border-zinc-800
              bg-zinc-950/50
              p-8
              backdrop-blur
              transition-all
              duration-300
              hover:border-red-500/40
              hover:translate-y-[-5px]
            "
          >
            <div className="text-5xl font-bold text-red-500">
              {step.number}
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              {step.title}
            </h3>

            <p className="mt-4 text-zinc-400">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}