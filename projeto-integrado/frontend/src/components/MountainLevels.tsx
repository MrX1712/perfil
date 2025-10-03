const levels = [
  {
    number: 5,
    name: "ANTIFRÁGIL",
    color: "level-5",
    bgColor: "#DC2626", // Vermelho
    textColor: "#FFFFFF",
    gradient: "gradient-level-5",
    description: "Operar estratégias avançadas de opções",
    features: ["LIPS, Tesourinha, Bigodon", "Gestão ativa semanal", "Operações estruturadas"],
  },
  {
    number: 4,
    name: "SOFISTICADO III",
    color: "level-4",
    bgColor: "#A855F7", // Roxo
    textColor: "#111111",
    gradient: "gradient-level-4",
    description: "Balanceamento Dinâmico semanal",
    features: ["Timing macro refinado", "Dividendo Sintético", "Renda recorrente"],
  },
  {
    number: 3,
    name: "SOFISTICADO II",
    color: "level-3",
    bgColor: "#FB923C", // Laranja
    textColor: "#111111",
    gradient: "gradient-level-3",
    description: "Ajustar Barbell com timing macro",
    features: ["Balanceamento trimestral", "Ativos diversificados", "Indicadores macro"],
  },
  {
    number: 2,
    name: "SOFISTICADO I",
    color: "level-2",
    bgColor: "#FDE047", // Amarelo
    textColor: "#111111",
    gradient: "gradient-level-2",
    description: "Usar seguro de carteira com opções",
    features: ["Estratégia do Pozinho", "Value investing básico", "Disciplina de aportes"],
  },
  {
    number: 1,
    name: "MINIMAL",
    color: "level-1",
    bgColor: "#FFFFFF", // Branco
    textColor: "#111111",
    gradient: "gradient-level-1",
    description: "Compreender lógica Barbell",
    features: ["Tesouro Selic + ETFs", "Proteção + Crescimento", "Primeiros aportes"],
  },
];

const MountainLevels = () => {
  return (
    <section className="relative py-12 md:py-16 lg:py-24 bg-gradient-mountain overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold text-primary-foreground mb-3 md:mb-4 lg:mb-6 animate-fade-in">
            OS 5 NÍVEIS DA ESCALADA
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-primary-foreground/70 animate-fade-in [animation-delay:200ms] px-4">
            Respeite o seu momento como investidor e avance para evoluir!
          </p>
        </div>

        {/* Pirâmide */}
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center gap-3 md:gap-4">
            {levels.map((level, index) => {
              // Larguras decrescentes do topo (pequeno) para a base (grande)
              const widthPercentages = [40, 55, 70, 85, 100];
              const widthPercent = widthPercentages[index];

              return (
                <div
                  key={level.number}
                  className="w-full animate-slide-up"
                  style={{ 
                    animationDelay: `${index * 150}ms`,
                    maxWidth: `${widthPercent}%`,
                  }}
                >
                  <div
                    className="rounded-lg md:rounded-xl lg:rounded-2xl p-4 md:p-7 lg:p-9 border-2 md:border-4 shadow-dramatic hover:scale-105 transition-all duration-300 cursor-pointer"
                    style={{
                      backgroundColor: level.bgColor,
                      borderColor: level.bgColor,
                      color: level.textColor,
                    }}
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 h-full">
                      {/* Número do nível */}
                      <div
                        className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center shadow-lg border-2 md:border-4"
                        style={{
                          backgroundColor: level.textColor,
                          color: level.bgColor,
                          borderColor: level.textColor,
                        }}
                      >
                        <span className="text-xl md:text-3xl lg:text-4xl font-bold">
                          {level.number}
                        </span>
                      </div>

                      {/* Conteúdo */}
                      <div className="flex-1 text-left w-full">
                        <h3 className="text-base md:text-xl lg:text-2xl xl:text-3xl font-bold mb-1.5 md:mb-3 leading-tight">
                          {level.name}
                        </h3>
                        <p className="text-xs md:text-base lg:text-lg opacity-90 mb-2 md:mb-4 leading-snug">
                          {level.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {level.features.map((feature, i) => (
                            <span
                              key={i}
                              className="inline-block px-2.5 py-1.5 md:px-3 md:py-2 rounded-full text-xs md:text-sm font-medium border-2 leading-tight"
                              style={{
                                backgroundColor: `${level.textColor}20`,
                                borderColor: `${level.textColor}40`,
                                color: level.textColor,
                              }}
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Base da pirâmide */}
          <div className="mt-8 md:mt-12 text-center animate-fade-in [animation-delay:1000ms]">
            <div className="inline-block px-6 py-3 rounded-full border-2 border-primary-foreground/30">
              <p className="text-base md:text-lg font-bold text-primary-foreground/60 uppercase tracking-wider">
                Vale do Desespero
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MountainLevels;

