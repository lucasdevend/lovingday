export default function Navbar() {
    return (
        <nav className="fixed top-0 z-[100] w-full px-8 py-6">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
                <h1 className="text-4xl font-bold tracking-tight">
                    Lovin<span className="text-red-500">Day</span>
                </h1>

                <button className="rounded-xl bg-red-600 px-6 py-3 font-medium hover:bg-red-700">
                    Criar Minha História
                </button>
            </div>
        </nav>
    );
}