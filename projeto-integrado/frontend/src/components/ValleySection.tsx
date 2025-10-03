import valleyImage from "@/assets/valley-despair.jpg";

const ValleySection = () => {
  return (
    <section className="relative py-24 bg-primary overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${valleyImage})` }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-primary" />
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-8 animate-fade-in">
            O VALE DO DESESPERO
          </h2>
          
          <div className="space-y-6 text-primary-foreground/80 text-lg md:text-xl">
            <p className="animate-fade-in [animation-delay:200ms]">
              Você sente. A angústia do investidor comum.
            </p>
            
            <p className="animate-fade-in [animation-delay:400ms]">
              O colapso civilizacional parece iminente. <br />
              O desalinhamento interno te paralisa.
            </p>
            
            <p className="text-2xl md:text-3xl font-bold text-primary-foreground mt-8 animate-scale-in [animation-delay:600ms]">
              Mas a defesa é o melhor ataque.
            </p>
            
            <p className="text-xl text-level-1 font-semibold animate-fade-in [animation-delay:800ms]">
              E hoje, você vai sair do vale.
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16">
          {[
            { title: "80%", subtitle: "Safe Bets", description: "Proteção sólida" },
            { title: "20%", subtitle: "High-risk Bets", description: "Crescimento explosivo" },
            { title: "0%", subtitle: "Mid-risk Bets", description: "Barbell Strategy" }
          ].map((item, index) => (
            <div 
              key={index}
              className="bg-card/5 backdrop-blur-sm border border-primary-foreground/10 rounded-lg p-6 text-center animate-slide-up"
              style={{ animationDelay: `${(index + 1) * 200}ms` }}
            >
              <div className="text-4xl font-bold text-level-1 mb-2">{item.title}</div>
              <div className="text-lg font-semibold text-primary-foreground mb-2">{item.subtitle}</div>
              <div className="text-sm text-primary-foreground/60">{item.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValleySection;
