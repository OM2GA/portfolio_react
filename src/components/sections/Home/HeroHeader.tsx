export function HeroHeader() {
  return (
    <>
      <div className="space-y-0 flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#d0bcff] leading-none uppercase">
          Développeur
        </h2>
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-none uppercase">
          Front-End
        </h2>
        <h1 className="text-2xl md:text-3xl font-light tracking-[0.3em] text-[#d0bcff]/70 mt-4 uppercase">
          Maxence Coste
        </h1>
      </div>
      <div className="h-px w-40 bg-gradient-to-r from-transparent via-[#d0bcff] to-transparent" />
      <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl font-light">
        Passionné par la création multimédia et l'innovation numérique, je souhaite
        mettre en œuvre mes compétences dans la conception et le développement de
        projets visuels et interactifs. Je suis prêt à relever les défis qui me
        permettront de progresser et de réaliser de nombreux projets. Mon objectif
        est de m’impliquer à 100% dans des projets alliant créativité et technologie.
      </p>
    </>
  );
}
