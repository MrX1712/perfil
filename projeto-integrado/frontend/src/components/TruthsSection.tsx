const truths = [
  {
    number: 1,
    title: "Mercados Turbulentos",
    description: "Os mercados são mais turbulentos e muito mais arriscados do que parecem. É possível prever a volatilidade! 80%/20%",
  },
  {
    number: 2,
    title: "O Jogo Real",
    description: "Não é um número maior de compradores e vendedores que movimentam o mercado.",
  },
  {
    number: 3,
    title: "Timing é Fundamental",
    description: "O timing do mercado é fundamental. Os grandes ganhos e perdas se concentram em pequenos intervalos de tempo!",
  },
  {
    number: 4,
    title: "Estimativa Possível",
    description: "Tentar prever preços é perigoso, mas é possível estimar quando se expor ao mercado!",
  },
  {
    number: 5,
    title: "Seguros Inteligentes",
    description: "Seguros a preços justos dão lucro e não prejuízo.",
  },
];

const TruthsSection = () => {
  return (
    <section className="relative py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4 animate-fade-in">
              AS 5 VERDADES DO MERCADO
            </h2>
            <p className="text-xl text-muted-foreground animate-fade-in [animation-delay:200ms]">
              O xadrez invisível que poucos enxergam
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {truths.map((truth, index) => (
              <div
                key={truth.number}
                className="group relative bg-card border-2 border-border rounded-xl p-6 hover:border-accent transition-all duration-300 animate-scale-in shadow-lg hover:shadow-glow-purple"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-level-3 rounded-full flex items-center justify-center shadow-glow-purple">
                  <span className="text-2xl font-bold text-accent-foreground">
                    {truth.number}
                  </span>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-gradient-purple transition-colors">
                    {truth.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {truth.description}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Carteira 360 Card - Destacada */}
            <div className="md:col-span-2 lg:col-span-3 bg-gradient-hero rounded-xl p-8 text-center shadow-dramatic animate-scale-in [animation-delay:600ms]">
              <h3 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                VOCÊ NUNCA MAIS VAI OPERAR DO MESMO JEITO
              </h3>
              <p className="text-xl text-primary-foreground/80 mb-6">
                A Carteira 360 permite operar com paz de espírito
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-primary-foreground/10 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="text-primary-foreground font-semibold">Maximiza Retorno Geométrico</span>
                </div>
                <div className="bg-primary-foreground/10 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="text-primary-foreground font-semibold">Rompe o Paradoxo Risco-Retorno</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TruthsSection;
