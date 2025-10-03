import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const LevelsCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-[hsl(0,0%,10%)] to-[hsl(0,0%,6.7%)]">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            E você, em que nível está?
          </h2>
          <p className="text-lg md:text-xl text-white/70 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
            A maioria dos investidores está presa no Vale do Desespero sem nem saber.
            Descubra agora o seu nível real e trace sua rota até o topo.
          </p>
          
          <Button
            onClick={() => navigate("/opening")}
            size="lg"
            className="bg-[#DC2626] hover:bg-[#DC2626]/90 text-white text-lg md:text-xl px-8 md:px-12 py-6 md:py-7 font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            Descobrir Meu Nível Agora
            <ArrowRight className="w-6 h-6 ml-3" />
          </Button>

          <p className="text-white/50 text-sm mt-6">
            ⏱️ Leva menos de 3 minutos • 100% gratuito
          </p>
        </div>
      </div>
    </section>
  );
};

export default LevelsCTA;
