export default function Stats() {
  return (
    <section className="grid grid-cols-2 gap-10 border-t border-red-900/30 py-20 md:grid-cols-4">
      <div className="text-center">
        <h3 className="text-5xl font-bold">250+</h3>
        <p className="text-zinc-400">Histórias Criadas</p>
      </div>

      <div className="text-center">
        <h3 className="text-5xl font-bold">5000+</h3>
        <p className="text-zinc-400">Fotos Compartilhadas</p>
      </div>

      <div className="text-center">
        <h3 className="text-5xl font-bold">1000+</h3>
        <p className="text-zinc-400">Músicas Adicionadas</p>
      </div>

      <div className="text-center">
        <h3 className="text-5xl font-bold">98%</h3>
        <p className="text-zinc-400">Casais Felizes</p>
      </div>
    </section>
  );
}