import { Flag } from "lucide-react";

interface MountainVisualizationProps {
  currentLevel: number;
}

const MountainVisualization = ({ currentLevel }: MountainVisualizationProps) => {
  const levels = [
    { number: 5, name: "Antifrágil", color: "#DC2626", width: 120 },
    { number: 4, name: "Sofisticado III", color: "#A855F7", width: 200 },
    { number: 3, name: "Sofisticado II", color: "#FB923C", width: 280 },
    { number: 2, name: "Sofisticado I", color: "#FDE047", width: 360 },
    { number: 1, name: "Minimal", color: "#FFFFFF", width: 440 },
  ];

  const getLevelStyle = (levelNumber: number) => {
    if (levelNumber === currentLevel) {
      // Nível atual - colorido
      const levelData = levels.find(l => l.number === levelNumber);
      return {
        backgroundColor: levelData?.color,
        border: `3px solid ${levelData?.color}`,
        color: levelNumber === 1 ? "#111111" : "#111111",
      };
    } else if (levelNumber < currentLevel) {
      // Níveis abaixo - completed (cinza médio)
      return {
        backgroundColor: "#D1D5DB",
        border: "3px solid #9CA3AF",
        color: "#6B7280",
      };
    } else {
      // Níveis acima - inactive (cinza mais escuro)
      return {
        backgroundColor: "#E5E7EB",
        border: "3px solid #D1D5DB",
        color: "#9CA3AF",
      };
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto py-8 md:py-12 px-2">
      {/* Bandeira no topo (apenas se nível 5 alcançado) */}
      {currentLevel === 5 && (
        <div className="absolute -top-6 md:-top-8 left-1/2 -translate-x-1/2 z-20 animate-scale-in">
          <Flag 
            className="w-10 h-10 md:w-12 md:h-12" 
            fill="#DC2626" 
            color="#DC2626"
          />
        </div>
      )}

      {/* Montanha em camadas */}
      <div className="flex flex-col items-center gap-0">
        {levels.map((level, index) => {
          const style = getLevelStyle(level.number);
          const isActive = level.number === currentLevel;

          return (
            <div
              key={level.number}
              className={`relative transition-all duration-500 ${
                isActive ? "animate-scale-in scale-105 z-10" : ""
              }`}
              style={{
                width: `${level.width}px`,
                maxWidth: "95%",
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Camada da montanha */}
              <div
                className={`relative h-16 md:h-20 flex items-center justify-center rounded-t-lg transition-all duration-500 ${
                  isActive ? "shadow-xl" : "shadow-md"
                }`}
                style={{
                  ...style,
                  clipPath: index === 0 
                    ? "polygon(50% 0%, 100% 100%, 0% 100%)" // Topo triangular
                    : undefined,
                }}
              >
                {/* Conteúdo da camada */}
                <div className="text-center px-2 md:px-4">
                  <div
                    className={`text-base md:text-lg lg:text-xl font-bold ${
                      isActive ? "animate-pulse" : ""
                    }`}
                    style={{ color: style.color }}
                  >
                    {level.number}
                  </div>
                  <div
                    className="text-xs md:text-sm font-semibold"
                    style={{ color: style.color }}
                  >
                    {level.name}
                  </div>
                </div>

                {/* Indicador visual se é o nível atual */}
                {isActive && (
                  <div
                    className="absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 w-2 h-2 md:w-3 md:h-3 rounded-full animate-pulse"
                    style={{ backgroundColor: level.color }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Base da montanha */}
      <div className="mt-4 w-full max-w-md mx-auto px-2">
        <div className="h-2 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" />
        <div className="text-center mt-2 text-white/40 text-xs uppercase tracking-wider">
          Vale do Desespero
        </div>
      </div>
    </div>
  );
};

export default MountainVisualization;
