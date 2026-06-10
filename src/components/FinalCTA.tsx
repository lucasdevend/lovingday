import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-40">
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/10 blur-[180px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <h2 className="text-5xl font-bold md:text-7xl">
          Sua história merece
          <br />
          algo inesquecível.
        </h2>

        <p className="mx-auto mt-8 max-w-2xl text-xl text-zinc-400">
          Transforme fotos, músicas e memórias em uma experiência
          exclusiva que ficará marcada para sempre.
        </p>

                <Link
                    href="/criar"
                    className="
                    mt-12
                    inline-block
                    rounded-2xl
                    bg-red-600
                    px-12
                    py-5
                    text-xl
                    font-bold
                    transition-all
                    duration-300
                    hover:scale-105
                    hover:bg-red-700">
                    Criar Minha História
                </Link>

                <p className="mt-6 text-sm text-zinc-500">
                    Leva menos de 5 minutos.
                </p>
        </div>
    </section>
  );
}