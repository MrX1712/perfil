import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Zap, Calendar } from "lucide-react";
import { trackEvent } from "@/lib/events";

interface EventCTAProps {
  currentLevel: number;
  profileName: string;
}

const EventCTA = ({ currentLevel, profileName }: EventCTAProps) => {
  const handleEventClick = () => {
    trackEvent('cta_clicked', {
      cta: 'evento_escalada',
      currentLevel,
      profileName,
    });

    // Log do evento
    const ctaEvent = {
      event: "cta_clicked",
      timestamp: new Date().toISOString(),
      cta: "evento_escalada",
      currentLevel,
      profileName,
    };
    
    console.log("CTA Event:", ctaEvent);
    
    // Salvar no localStorage para envio ao backend
    const existingEvents = JSON.parse(localStorage.getItem("roxedo_events") || "[]");
    existingEvents.push(ctaEvent);
    localStorage.setItem("roxedo_events", JSON.stringify(existingEvents));

    // Redirecionar para o grupo do WhatsApp
    window.open("https://chat.whatsapp.com/IAqgsQUkfyN4KgoNUiCuA0", "_blank");
  };

  // Mensagens e temas personalizados por nível baseados no roteiro real do evento
  const getPersonalizedContent = () => {
    switch (currentLevel) {
      case 1:
        return {
          title: "Você saiu do vale. Agora vamos acelerar sua subida.",
          description: "Estar no nível Medíocre não é ruim — é estar consciente do ponto de partida. No evento A Escalada, você vai sair da névoa e começar a enxergar o caminho.",
          topics: [
            "As 5 Verdades do Mercado — entender as regras reais do jogo",
            "Passo 1: Diversificação Barbell — 80% seguro + 20% alto risco (não ficar no meio)",
            "Como o Analista busca valor — identificar ativos sólidos sem cair em armadilhas",
            "Dominar sem ter milhões — começar com o que você tem hoje"
          ]
        };
      case 2:
        return {
          title: (
            <>
              Você já entende o jogo.<br />
              Hora de dominar as regras.
            </>
          ),
          description: "Como Sofisticado I, você conhece Barbell. No evento A Escalada, você vai aprender quando rebalancear e quando deixar quieto — o que separa amador de profissional.",
          topics: [
            "Passo 2: Balanceamento Dinâmico — monitorar desvios e reajustar na hora certa",
            "Passo 3: Buscar Valor nas 4 Dimensões — empresa, economia, análise técnica e sentimento",
            "A Unidade das 3 Pessoas — ser Analista (verdade), Estrategista (plano) e Trader (execução)",
            "Como usar Backtesting e Monte Carlo para testar suas estratégias"
          ]
        };
      case 3:
        return {
          title: "Você está no meio da montanha. A visão muda daqui.",
          description: "Como Sofisticado II, você já tem proteção básica. No evento A Escalada, vamos refinar seu timing macro e balanceamento ativo — a manutenção que mantém a carteira funcionando.",
          topics: [
            "Passo 4: Opcionalidade — usar opções para proteção, renda e ganhos explosivos",
            "O Estrategista — planejar a carteira ideal usando a Teoria da Cota",
            "Timing de mercado e volatilidade — quando se expor ao risco",
            "Balanceamento trimestral com indicadores macro que realmente importam"
          ]
        };
      case 4:
        return {
          title: "Falta pouco para o topo. Não pare agora.",
          description: "Como Sofisticado III, você opera estratégias avançadas. No evento A Escalada, vamos dominar a unidade entre análise, estratégia e execução — onde a maestria acontece.",
          topics: [
            "Passo 5: Repetir e Melhorar — ciclo permanente de simular, analisar, executar e controlar",
            "O Trader — execução perfeita e relação com assessores e corretoras",
            "Balanceamento semanal e timing macro refinado",
            "Gestão ativa com as 3 Pessoas trabalhando em unidade"
          ]
        };
      case 5:
        return {
          title: "Você chegou ao topo. Agora é manter a altitude.",
          description: "Como Investidor Antifrágil, você domina a estrutura. No evento A Escalada, vamos aprofundar a manutenção ativa — manter a carteira lucrando com caos sem depender de timing perfeito.",
          topics: [
            "Carteira 360 completa — maximização da entropia e retorno geométrico acelerado",
            "Unidade perfeita das 3 Pessoas — análise profunda + plano sólido + execução impecável",
            "Aplicações avançadas de opcionalidade — proteção sistêmica e ganhos em crises",
            "Como dominar a carteira e ter paz de espírito mesmo no colapso"
          ]
        };
      default:
        return {
          title: "Pronto para subir de nível?",
          description: "A diferença entre quem fica no vale e quem chega ao topo é conhecimento ativo. No evento A Escalada, você vai aprender o método completo.",
          topics: [
            "As 5 Verdades do Mercado — as regras reais do xadrez financeiro",
            "Os 5 Passos da Carteira 360 — da teoria à prática",
            "A Unidade das 3 Pessoas — Analista, Estrategista e Trader",
            "Como dominar os investimentos com o que você tem hoje"
          ]
        };
    }
  };

  const content = getPersonalizedContent();

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-[hsl(0,0%,6.7%)]">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Card principal */}
        <Card className="bg-transparent border-none p-6 md:p-8 lg:p-12 animate-scale-in">
          {/* Badge */}
          <div className="flex justify-center mb-8 md:mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#DC2626]/20 border border-[#DC2626]/40">
              <Zap className="w-4 h-4 text-[#DC2626]" fill="#DC2626" />
              <span className="text-white text-sm font-bold">Próximo nível desbloqueado</span>
            </div>
          </div>

          {/* Título personalizado */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 md:mb-8 leading-tight text-center">
            {content.title}
          </h2>

          {/* Descrição personalizada */}
          <p className="text-white/90 text-lg md:text-xl lg:text-2xl mb-8 md:mb-10 leading-relaxed">
            {content.description}
          </p>
          
          {/* O que você vai dominar */}
          <div className="bg-white/5 rounded-lg p-6 md:p-8 border-none mb-8 md:mb-10">
            <p className="text-white text-lg md:text-xl mb-6 font-semibold">
              No evento A Escalada (16/10), você vai dominar:
            </p>
            <ul className="space-y-3">
              {content.topics.map((topic, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#DC2626] mt-2 flex-shrink-0" />
                  <span className="text-white/90 text-base md:text-lg">{topic}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <div className="text-center mb-4 md:mb-6">
            <Button
              onClick={handleEventClick}
              size="lg"
              className="bg-[#DC2626] hover:bg-[#DC2626]/90 text-white px-8 md:px-10 h-12 md:h-14 text-base md:text-lg font-bold shadow-xl hover:scale-105 transition-all w-full sm:w-auto"
            >
              Quero subir de nível
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 ml-2" />
            </Button>
          </div>

          {/* Info do evento */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
              <Calendar className="w-5 h-5 text-white/70" />
              <span className="text-white text-sm font-semibold">
                16 de outubro, 20h • Ao vivo
              </span>
            </div>
            <span className="text-white/60 text-sm">
              Sem gravação
            </span>
          </div>
        </Card>

        {/* Nota final */}
        <div className="text-center mt-2 text-white/50 text-base md:text-lg italic">
          <p>A montanha não se sobe sozinho. Vamos juntos.</p>
        </div>
      </div>
    </section>
  );
};

export default EventCTA;
