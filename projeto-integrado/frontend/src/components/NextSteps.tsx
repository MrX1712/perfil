import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { FileText, Table2, CheckSquare, Send } from "lucide-react";
import { trackEvent } from "@/lib/events";

interface Resource {
  icon: typeof FileText;
  title: string;
  description: string;
  link: string;
}

const resources: Resource[] = [
  {
    icon: FileText,
    title: "Ebook 360",
    description: "Guia completo da Carteira 360 com estratégia Barbell detalhada.",
    link: "#ebook-360", // Substitua pelo link real
  },
  {
    icon: Table2,
    title: "Tabela Perfis 0–5",
    description: "Comparativo completo dos 5 níveis da escalada Roxedo.",
    link: "#tabela-perfis", // Substitua pelo link real
  },
  {
    icon: CheckSquare,
    title: "Checklist Antifrágil",
    description: "Lista prática para construir sua carteira antifrágil passo a passo.",
    link: "#checklist-antifragil", // Substitua pelo link real
  },
];

const NextSteps = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMiniPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um email válido.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Track CTA clicked
    trackEvent('cta_clicked', {
      cta: 'mini_plano_email',
      email,
    });

    // Log do evento
    const ctaEvent = {
      event: "cta_clicked",
      email,
      timestamp: new Date().toISOString(),
      cta: "mini_plano_email",
    };
    
    console.log("CTA Event:", ctaEvent);
    
    // Salvar no localStorage para envio ao backend
    const existingEvents = JSON.parse(localStorage.getItem("roxedo_events") || "[]");
    existingEvents.push(ctaEvent);
    localStorage.setItem("roxedo_events", JSON.stringify(existingEvents));

    // Simular envio de email (aqui você integraria com seu backend Java)
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Mini-plano enviado!",
        description: `Enviamos o seu plano personalizado para ${email}. Verifique sua caixa de entrada.`,
      });
      setEmail("");
    }, 1500);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[hsl(0,0%,6.7%)] to-[hsl(0,0%,10%)]">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Título da seção */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Próximos Passos
          </h2>
          <p className="text-white/70 text-lg md:text-xl">
            Recursos essenciais para sua jornada de investimentos
          </p>
        </div>

        {/* Grid de recursos */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <a
                key={index}
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 h-full hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed">
                        {resource.description}
                      </p>
                    </div>
                    <div className="text-white/50 text-xs group-hover:text-white/70 transition-colors">
                      Acessar →
                    </div>
                  </div>
                </Card>
              </a>
            );
          })}
        </div>

        {/* CTA Mini-plano */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8 md:p-10 animate-scale-in">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Receba seu Mini-Plano Personalizado
            </h3>
            <p className="text-white/70 mb-8 text-base md:text-lg">
              Enviaremos um plano de ação personalizado baseado no seu perfil de investidor direto no seu email.
            </p>

            <form onSubmit={handleSendMiniPlan} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Label htmlFor="email-miniplan" className="sr-only">
                    Email
                  </Label>
                  <Input
                    id="email-miniplan"
                    type="email"
                    placeholder="Seu melhor email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#DC2626] h-12 text-base"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#DC2626] hover:bg-[#DC2626]/90 text-white px-8 h-12 text-base font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                >
                  {isLoading ? (
                    "Enviando..."
                  ) : (
                    <>
                      Quero meu mini-plano agora
                      <Send className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>

              <p className="text-white/50 text-xs">
                Ao enviar, você concorda em receber conteúdos educacionais da Roxedo.
              </p>
            </form>
          </div>
        </Card>

        {/* Nota adicional */}
        <div className="text-center mt-8 text-white/40 text-sm">
          <p>
            Todos os recursos são gratuitos e desenvolvidos para acelerar sua escalada.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NextSteps;
