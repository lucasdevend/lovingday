export default function Pricing() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32">
      <div className="text-center">
        <h2 className="text-5xl font-bold">
          Escolha seu plano
        </h2>

        <p className="mt-4 text-zinc-400">
          Surpreenda quem você ama em poucos minutos.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-10">
          <h3 className="text-3xl font-bold">
            Presente Especial
          </h3>

          <p className="mt-6 text-6xl font-bold">
            R$ 9,90
          </p>

          <p className="mt-2 text-zinc-400">
            válido por 5 dias
          </p>

          <ul className="mt-8 space-y-4 text-zinc-300">
            <li>✔ Até 5 fotos</li>
            <li>✔ Música personalizada</li>
            <li>✔ Linha do tempo</li>
            <li>✔ Mensagem com IA</li>
            <li>✔ Link compartilhável</li>
          </ul>

          <button className="mt-10 w-full rounded-2xl bg-zinc-800 py-4 font-bold transition hover:bg-zinc-700">
            Escolher Plano
          </button>
        </div>

        <div className="relative rounded-3xl border border-red-500 bg-gradient-to-b from-red-950/40 to-zinc-950 p-10">
          
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-red-600 px-4 py-2 text-sm font-bold">
            MAIS ESCOLHIDO
          </div>

          <h3 className="text-3xl font-bold">
            Vitalício
          </h3>

          <p className="mt-6 text-6xl font-bold">
            R$ 29,90
          </p>

          <p className="mt-2 text-zinc-400">
            acesso permanente
          </p>

          <ul className="mt-8 space-y-4 text-zinc-300">
            <li>✔ Tudo do plano anterior</li>
            <li>✔ Página permanente</li>
            <li>✔ Edição futura</li>
            <li>✔ Atualizações gratuitas</li>
            <li>✔ URL exclusiva</li>
          </ul>

          <button className="mt-10 w-full rounded-2xl bg-red-600 py-4 font-bold transition hover:bg-red-700">
            Escolher Plano
          </button>
        </div>

      </div>
    </section>
  );
}