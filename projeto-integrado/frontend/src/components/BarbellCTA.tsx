import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Calculator, TrendingUp, Shield, Target } from "lucide-react";

const BarbellCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[hsl(0,0%,6.7%)] to-[hsl(0,0%,10%)]">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Título principal */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Já conhece sua Estratégia Barbell?
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            A metodologia que protege 80% do seu patrimônio e captura ganhos exponenciais com os outros 20%.
          </p>
        </div>

        {/* Grid de benefícios */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: Shield,
              title: "80% Protegido",
              description: "Ativos conservadores que te blindam contra crises",
            },
            {
              icon: TrendingUp,
              title: "20% Agressivo",
              description: "Exposição assimétrica para ganhos exponenciais",
            },
            {
              icon: Target,
              title: "0% Medíocre",
              description: "Zero exposição a ativos de risco médio",
            },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={index}
                className="bg-white/5 backdrop-blur-sm border-white/10 p-6 hover:bg-white/10 transition-all animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#DC2626]/20 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-[#DC2626]" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-white/70 text-sm">{item.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* CTA Principal */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8 md:p-12 text-center animate-scale-in">
          <Calculator className="w-16 h-16 text-[#DC2626] mx-auto mb-6" />
          
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Descubra se sua carteira está antifrágil
          </h3>
          
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Use nossa <strong className="text-white">Calculadora Barbell 360</strong> gratuita 
            e veja o diagnóstico completo da sua carteira em menos de 3 minutos.
          </p>

          <Button
            onClick={() => navigate("/calculadora-barbell")}
            size="lg"
            className="bg-[#DC2626] hover:bg-[#DC2626]/90 text-white text-lg md:text-xl px-8 md:px-12 py-6 md:py-7 font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <Calculator className="w-6 h-6 mr-3" />
            Calcular Minha Carteira Agora
          </Button>

          <p className="text-white/50 text-sm mt-6">
            ⚡ Grátis • ⏱️ 3 minutos • 📊 Diagnóstico completo
          </p>
        </Card>
      </div>
    </section>
  );
};

export default BarbellCTA;
