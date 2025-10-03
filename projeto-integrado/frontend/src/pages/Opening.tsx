import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";

const Opening = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    consent: false,
  });

  const handleStartJourney = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha nome e email.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.consent) {
      toast({
        title: "Consentimento necessário",
        description: "Por favor, aceite os termos para continuar.",
        variant: "destructive",
      });
      return;
    }

    // Salvar no localStorage para envio posterior ao backend Java
    localStorage.setItem("roxedo_user", JSON.stringify({
      name: formData.name,
      email: formData.email,
      consent: formData.consent,
      timestamp: new Date().toISOString(),
    }));

    toast({
      title: "Bem-vindo à escalada!",
      description: "Vamos descobrir seu perfil de investidor.",
    });

    navigate("/quiz");
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full animate-fade-in">
        
        {/* Headline */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white text-center mb-6 md:mb-8 leading-tight">
          Você sabe em que ponto da jornada está como investidor?
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl lg:text-2xl text-white/80 text-center mb-8 md:mb-10 leading-relaxed">
          A maioria <strong>não faz ideia</strong> e por isso continua <strong>presa no vale do desespero</strong>.
        </p>

        {/* Subtexto adicional */}
        <p className="text-base md:text-lg text-white/70 text-center mb-10 md:mb-12 max-w-xl mx-auto leading-relaxed">
          Descubra em 3 minutos seu Perfil da Escalada e entenda se você está começando do zero, preso na mesmice ou já pronto para enxergar a visão do Topo.
        </p>

        {/* Form Card */}
        <div className="bg-[#1A1A1A] border border-white/10 rounded-lg p-6 md:p-8 mb-8 animate-scale-in [animation-delay:300ms]">
          <form onSubmit={handleStartJourney} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white text-sm md:text-base font-medium">
                Nome completo
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-[#2A2A2A] border-white/20 text-white placeholder:text-white/40 focus:border-[#DC2626] h-12 md:h-14 text-base"
                placeholder="Seu nome"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white text-sm md:text-base font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-[#2A2A2A] border-white/20 text-white placeholder:text-white/40 focus:border-[#DC2626] h-12 md:h-14 text-base"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div className="flex items-start space-x-3 pt-2">
              <Checkbox
                id="consent"
                checked={formData.consent}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, consent: checked as boolean })
                }
                className="mt-0.5 border-white/30 data-[state=checked]:bg-[#DC2626] data-[state=checked]:border-[#DC2626]"
                required
              />
              <Label
                htmlFor="consent"
                className="text-xs md:text-sm text-white/70 leading-relaxed cursor-pointer"
              >
                Aceito receber conteúdos e comunicações da Roxedo sobre investimentos e 
                concordo com a Política de Privacidade.
              </Label>
            </div>

            {/* CTA Principal */}
            <Button
              type="submit"
              className="w-full h-14 md:h-16 text-base md:text-lg font-bold bg-[#DC2626] hover:bg-[#DC2626]/90 text-white shadow-xl hover:scale-[1.02] transition-all duration-300 mt-6"
              size="lg"
            >
              Descobrir o meu Perfil
            </Button>
          </form>
        </div>

        {/* Garantia */}
        <p className="text-white/50 text-xs md:text-sm text-center animate-fade-in [animation-delay:400ms]">
          100% gratuito • Resultado imediato • Sem pegadinhas
        </p>

        {/* Decorative elements */}
        <div className="mt-12"></div>

        <Footer />
      </div>
    </div>
  );
};

export default Opening;
