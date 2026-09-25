/*
  A seção mais curta da página, de propósito: uma faixa verde-garrafa,
  a xícara desenhada saindo pela borda de cima e a marca de xícara no "papel".
*/

function Xicara({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 200" className={className} aria-hidden="true" overflow="visible">
      {/* vapor: sobe devagar (some com "reduzir movimento") */}
      <g fill="none" stroke="var(--color-papel)" strokeWidth="3" strokeLinecap="round" opacity="0.85">
        <path className="vapor" style={{ animationDelay: '0s' }} d="M82,62 C70,46 94,36 82,18 C74,6 86,-4 84,-10" />
        <path className="vapor" style={{ animationDelay: '-1.3s' }} d="M108,58 C96,40 122,32 108,12 C100,0 112,-10 110,-18" />
        <path className="vapor" style={{ animationDelay: '-2.6s' }} d="M134,62 C122,46 146,38 134,20 C126,8 138,-2 136,-8" />
      </g>
      <g filter="url(#rabisco)" stroke="var(--color-cafe)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
        {/* pires */}
        <ellipse cx="110" cy="178" rx="98" ry="16" fill="var(--color-papel)" />
        <ellipse cx="110" cy="174" rx="54" ry="7" fill="none" strokeWidth="1.8" opacity="0.6" />
        {/* asa */}
        <path d="M168,98 C204,94 204,142 160,146" fill="none" strokeWidth="9" stroke="var(--color-cafe)" />
        <path d="M168,98 C204,94 204,142 160,146" fill="none" strokeWidth="4" stroke="var(--color-papel)" />
        {/* corpo */}
        <path d="M40,80 L180,80 C178,134 156,172 110,172 C64,172 42,134 40,80 Z" fill="var(--color-papel)" />
        {/* friso rosa */}
        <path d="M44,100 C80,106 140,106 176,100" fill="none" stroke="var(--color-rosa)" strokeWidth="7" />
        {/* boca com café */}
        <ellipse cx="110" cy="80" rx="70" ry="13" fill="var(--color-papel)" />
        <ellipse cx="110" cy="81" rx="60" ry="8.5" fill="#5b3a28" strokeWidth="1.6" />
      </g>
    </svg>
  )
}

export function Cafe() {
  return (
    <section className="relative mt-24 bg-verde text-papel md:mt-[8vw]" aria-labelledby="titulo-cafe">
      {/* marca de xícara no papel */}
      <svg viewBox="0 0 200 200" className="pointer-events-none absolute top-6 right-[6vw] w-40 opacity-30 md:w-56" aria-hidden="true">
        <g filter="url(#rabisco)" fill="none" stroke="var(--color-verde-escuro)" strokeLinecap="round">
          <path d="M100,22 C150,20 180,56 178,100 C176,150 140,178 98,176 C52,174 22,142 24,98 C26,62 50,30 88,23" strokeWidth="9" />
          <path d="M40,120 C44,150 70,170 104,172" strokeWidth="4" />
        </g>
      </svg>

      <div className="relative mx-auto grid max-w-[1600px] items-end gap-6 px-4 pb-10 md:grid-cols-[auto_1fr] md:gap-[4vw] md:px-[8vw] md:pb-12">
        <Xicara className="-mt-20 w-44 md:-mt-28 md:w-60" />
        <div className="md:pb-2">
          <h2 id="titulo-cafe" className="font-titulo text-[2.5rem] leading-[1.02] md:text-[3.6vw]">
            O cafezinho vem junto.
          </h2>
          <p className="mt-3 max-w-[30rem] text-[1.12rem]">Enquanto faz a unha, tem café e conversa boa.</p>
        </div>
      </div>
    </section>
  )
}
