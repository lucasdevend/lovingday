const testimonials = [
  {
    name: "André San",
    text: "Mulher amou",
  },
  {
    name: "Jana Santos",
    text: "Gostei muito, recomendo.",
  },
  {
    name: "Gabriel Pereira",
    text: "Vale apena, super em conta",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32">
      <div className="text-center">
        <h2 className="text-5xl font-bold">
          Criado para emocionar
        </h2>

        <p className="mt-4 text-zinc-400">
            Clientes e casais mencionam a experiência como algo inesquecível.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {testimonials.map((item) => (
          <div
            key={item.name}
            className="
              rounded-3xl
              border
              border-zinc-800
              bg-zinc-950/50
              p-8
              transition-all
              duration-300
              hover:border-red-500/40
            "
          >
            <div className="mb-4 text-xl">
              ⭐⭐⭐⭐⭐
            </div>

            <p className="text-zinc-300 leading-relaxed">
              "{item.text}"
            </p>

            <div className="mt-6 text-sm text-zinc-500">
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}