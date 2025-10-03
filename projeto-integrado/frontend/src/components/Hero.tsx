import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/events";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Hero = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Track landing view
    trackEvent('landing_viewed');
  }, []);

  const handleStartQuiz = () => {
    if (!name.trim() || !email.trim()) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, preencha seu nome e email para continuar.",
        variant: "destructive",
      });
      return;
    }

    if (!email.includes("@")) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um email válido.",
        variant: "destructive",
      });
      return;
    }

    // Salvar dados no localStorage
    localStorage.setItem("roxedo_user", JSON.stringify({ name, email }));
    
    // Track CTA clicked
    trackEvent('hero_cta_clicked', { name, email });
    
    navigate("/opening");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0D0D0D] px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Headline */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 md:mb-8 leading-tight animate-fade-in">
          Você sabe em que ponto da jornada está como investidor?
        </h1>
        
        <p className="text-xl md:text-2xl lg:text-3xl text-white/80 mb-8 md:mb-10 leading-relaxed animate-fade-in [animation-delay:100ms]">
          A maioria não faz ideia — e por isso continua presa no vale do desespero.
        </p>

        {/* Subheadline */}
        <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in [animation-delay:200ms]">
          Descubra em 3 minutos seu Perfil da Escalada e entenda se você está começando do zero, preso na mesmice ou já pronto para enxergar com a visão da águia.
        </p>

        {/* Prova/Reforço */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 mb-8 md:mb-10 animate-fade-in [animation-delay:300ms]">
          <p className="text-base md:text-lg text-white/70 leading-relaxed">
            São 5 perfis diferentes (do Medíocre ao Investidor Antifrágil).
            <br className="hidden md:block" />
            Cada um mostra seus pontos fortes, suas fraquezas e o próximo passo na escalada.
            <br className="hidden md:block" />
            <span className="text-white/90 font-semibold">Sem jargão. Sem cobrança. Só clareza.</span>
          </p>
        </div>

        {/* Formulário */}
        <div className="max-w-md mx-auto space-y-4 mb-8 animate-scale-in [animation-delay:400ms]">
          <div>
            <Label htmlFor="hero-name" className="sr-only">Nome</Label>
            <Input
              id="hero-name"
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#DC2626] h-14 text-base md:text-lg"
            />
          </div>
          <div>
            <Label htmlFor="hero-email" className="sr-only">Email</Label>
            <Input
              id="hero-email"
              type="email"
              placeholder="Seu melhor email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#DC2626] h-14 text-base md:text-lg"
            />
          </div>
        </div>

        {/* CTA Principal */}
        <Button
          onClick={handleStartQuiz}
          size="lg"
          className="bg-[#DC2626] hover:bg-[#DC2626]/90 text-white px-12 h-16 text-lg md:text-xl font-bold shadow-2xl hover:scale-105 transition-all w-full sm:w-auto animate-scale-in [animation-delay:500ms]"
        >
          👉 Quero descobrir meu perfil agora
          <ArrowRight className="w-6 h-6 ml-2" />
        </Button>

        {/* Nota de rodapé */}
        <p className="text-white/40 text-sm mt-6 animate-fade-in [animation-delay:600ms]">
          100% gratuito • Resultado imediato • Sem pegadinhas
        </p>
      </div>
    </section>
  );
};

export default Hero;
