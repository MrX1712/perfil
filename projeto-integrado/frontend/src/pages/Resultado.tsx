import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, AlertCircle, Home } from "lucide-react";
import MountainVisualization from "@/components/MountainVisualization";
import MountainLevels from "@/components/MountainLevels";
import EventCTA from "@/components/EventCTA";
import Footer from "@/components/Footer";
import { trackEvent } from "@/lib/events";

interface ProfileLevel {
  level: number;
  name: string;
  shortDescription: string;
  color: string;
  validation: string;
  nextStep: string;
  features: string[];
}

const profileLevels: ProfileLevel[] = [
  {
    level: 1,
    name: "Medíocre",
    shortDescription: "O início da jornada",
    color: "#FFFFFF",
    validation: "Reconhecer que você está no vale já é o primeiro passo para subir.",
    nextStep: "Construa sua reserva de emergência e comece a estudar investimentos básicos. A montanha se sobe um degrau de cada vez.",
    features: [
      "Foco em reserva de emergência (6 meses de despesas)",
      "Educação financeira: entenda juros compostos",
      "Primeiros investimentos em renda fixa (Tesouro Direto, CDBs)",
      "Desenvolva disciplina e consistência"
    ]
  },
  {
    level: 2,
    name: "Sofisticado I",
    shortDescription: "Diversificação inteligente",
    color: "#FDE047",
    validation: "Você já entende o básico. Agora é hora de expandir seu conhecimento sem medo.",
    nextStep: "Comece a diversificar entre renda fixa e variável. Estude ações de qualidade e fundos imobiliários.",
    features: [
      "Diversificação: 70% renda fixa, 30% renda variável",
      "Primeiros passos em ações blue chips",
      "Estudo de fundamentos: balanços e indicadores",
      "Gestão básica de risco e stop loss"
    ]
  },
  {
    level: 3,
    name: "Sofisticado II",
    shortDescription: "Proteção e potencialização",
    color: "#FB923C",
    validation: "Você domina o intermediário. É hora de proteger sua carteira contra crises.",
    nextStep: "Aprenda opções para proteção (puts) e geração de renda (calls cobertas). Balance sua carteira mensalmente.",
    features: [
      "Uso de opções para proteção (protective puts)",
      "Estratégias de geração de renda (covered calls)",
      "Balanceamento ativo trimestral",
      "Entendimento profundo de ciclos econômicos"
    ]
  },
  {
    level: 4,
    name: "Sofisticado III",
    shortDescription: "Estratégias avançadas",
    color: "#A855F7",
    validation: "Você está próximo do topo. Estratégias complexas agora fazem sentido para você.",
    nextStep: "Implemente a Barbell Strategy (80% seguro, 20% alto risco) e domine spreads de opções.",
    features: [
      "Barbell Strategy: 80% ativos seguros, 20% assimetria positiva",
      "Spreads de opções (bull call, bear put)",
      "Gestão ativa com proteção sistemática",
      "Preparação para cisnes negros"
    ]
  },
  {
    level: 5,
    name: "Investidor Antifrágil",
    shortDescription: "Antifragilidade total",
    color: "#DC2626",
    validation: "Você atingiu o topo da escalada. Sua carteira é antifrágil — se beneficia do caos.",
    nextStep: "Mantenha a disciplina. Revise, ajuste e aproveite crises como oportunidades. Você chegou ao topo Roxedo.",
    features: [
      "Maestria total em opções e derivativos",
      "Carteira antifrágil: lucra com volatilidade",
      "Proteção completa contra crises sistêmicas",
      "Capacidade de aproveitar cisnes negros como oportunidades"
    ]
  }
];

const Resultado = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { assessmentId } = useParams();
  const [profileData, setProfileData] = useState<ProfileLevel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carregar resultado do localStorage
    const resultData = localStorage.getItem("roxedo_result");
    
    if (!resultData) {
      toast({
        title: "Resultado não encontrado",
        description: "Por favor, complete o questionário primeiro.",
        variant: "destructive",
      });
      navigate("/opening");
      return;
    }

    try {
      const result = JSON.parse(resultData);
      
      // Verificar se o assessmentId bate
      if (result.assessmentId !== assessmentId) {
        toast({
          title: "Resultado inválido",
          description: "Este resultado não corresponde à sua avaliação.",
          variant: "destructive",
        });
        navigate("/opening");
        return;
      }

      // Carregar perfil correspondente
      const profile = profileLevels.find(p => p.level === result.profileLevel);
      
      if (profile) {
        setProfileData(profile);
        
        // Track result viewed
        trackEvent('result_viewed', {
          assessmentId,
          profileLevel: result.profileLevel,
          profileName: profile.name,
        });
      } else {
        throw new Error("Perfil não encontrado");
      }
    } catch (error) {
      console.error("Erro ao carregar resultado:", error);
      toast({
        title: "Erro ao carregar resultado",
        description: "Ocorreu um erro. Por favor, tente novamente.",
        variant: "destructive",
      });
      navigate("/opening");
    } finally {
      setLoading(false);
    }
  }, [assessmentId, navigate, toast]);

  if (loading || !profileData) {
    return (
      <div className="min-h-screen bg-[hsl(0,0%,6.7%)] flex items-center justify-center">
        <div className="text-white text-xl animate-pulse">Calculando seu perfil...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(0,0%,6.7%)] py-6 md:py-8 lg:py-12 px-3 md:px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Botão Home no topo */}
        <div className="flex justify-end mb-6 animate-fade-in">
          <Button
            onClick={() => navigate("/")}
            className="bg-white/10 text-white hover:bg-white/20 border-2 border-white/40"
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </div>
        
        {/* Visualização da Montanha */}
        <div className="mb-12 animate-fade-in">
          <MountainVisualization currentLevel={profileData.level} />
        </div>

        {/* Título principal */}
        <div className="text-center mb-6 md:mb-8 animate-fade-in px-2">
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 md:mb-8 leading-tight">
            Você está no Nível {profileData.level} — {profileData.shortDescription}
          </h1>
          <div 
            className="inline-block px-4 py-2 rounded-full text-sm md:text-base font-bold"
            style={{ 
              backgroundColor: profileData.color,
              color: profileData.level === 1 ? "#111111" : "#111111"
            }}
          >
            {profileData.name}
          </div>
        </div>

        {/* Validação e próximo passo */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 md:p-8 mb-6 animate-scale-in">
          <div className="space-y-6">
            {/* Validação */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-3 flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: profileData.color }}
                />
                Validação
              </h3>
              <p className="text-white/80 text-base md:text-lg leading-relaxed">
                {profileData.validation}
              </p>
            </div>

            {/* Próximo passo */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-3 flex items-center gap-2">
                <ArrowRight className="w-5 h-5" style={{ color: profileData.color }} />
                Próximo passo
              </h3>
              <p className="text-white/80 text-base md:text-lg leading-relaxed">
                {profileData.nextStep}
              </p>
            </div>
          </div>
        </Card>

        {/* O que focar agora */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 md:p-8 mb-6 animate-fade-in">
          <h3 className="text-white text-xl font-bold mb-6">
            O que você deve focar agora:
          </h3>
          <div className="space-y-4">
            {profileData.features.map((feature, index) => (
              <div 
                key={index} 
                className="flex items-start gap-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: `${profileData.color}40` }}
                >
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: profileData.color }}
                  />
                </div>
                <span className="text-white/90 text-sm md:text-base leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </Card>


      </div>

      {/* Os 5 Níveis da Escalada */}
      <MountainLevels />

      {/* CTA Evento A Escalada */}
      <EventCTA currentLevel={profileData.level} profileName={profileData.name} />

      <Footer />
    </div>
  );
};

export default Resultado;