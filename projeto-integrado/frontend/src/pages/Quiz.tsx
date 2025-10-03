import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useApi } from "@/hooks/useApi";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { trackEvent } from "@/lib/events";
import Footer from "@/components/Footer";

interface Question {
  id: string;
  text: string;
  type: string;
  options: string[];
  weight: number;
  dimension: string;
}

const questions: Question[] = [
  {
    id: "Q01",
    text: "Qual é o valor aproximado que você tem disponível para investir hoje?",
    type: "multi",
    options: [
      "Acima de R$ 200.000",
      "Entre R$ 50.000 e R$ 200.000",
      "Entre R$ 5.000 e R$ 50.000",
      "Até R$ 5.000"
    ],
    weight: 1.0,
    dimension: "patrimonio"
  },
  {
    id: "Q02",
    text: "Com que frequência você estuda investimentos atualmente?",
    type: "multi",
    options: [
      "Estudo mais de 4 horas por semana.",
      "Estudo entre 1 a 2 horas por semana.",
      "Estudo algumas horas por mês.",
      "Raramente ou nunca estudo."
    ],
    weight: 1.0,
    dimension: "estudo"
  },
  {
    id: "Q03",
    text: "Como você avalia sua prática de investimentos hoje?",
    type: "multi",
    options: [
      "Faço gestão ativa, uso opções, balanceio carteira e monto estratégias.",
      "Já invisto também em ações, fundos imobiliários, ETFs e começo a usar opções.",
      "Invisto de forma básica, principalmente renda fixa e alguns fundos.",
      "Nunca investi ou só aplico em poupança/renda fixa."
    ],
    weight: 1.0,
    dimension: "manejo"
  },
  {
    id: "Q04",
    text: "Quanto de risco você se sente confortável para assumir nos seus investimentos?",
    type: "multi",
    options: [
      "Muito alto – busco estratégias mais complexas para potencializar ganhos.",
      "Alto – estou disposto a aceitar oscilações fortes por retornos maiores.",
      "Moderado – aceito pequenas oscilações para ganhar mais no longo prazo.",
      "Pouquíssimo - prefiro perder pouco a ganhar muito."
    ],
    weight: 1.0,
    dimension: "apetite_risco"
  },
  {
    id: "Q05",
    text: "Você já executa operações como compra e venda de ativos regularmente?",
    type: "multi",
    options: [
      "Sim, opero semanalmente ou diariamente.",
      "Sim, uma vez por mês ou mais.",
      "Raramente.",
      "Não."
    ],
    weight: 1.0,
    dimension: "operacoes"
  },
  {
    id: "Q06",
    text: "Você já conhece e/ou usa alguma estratégia com opções financeiras?",
    type: "multi",
    options: [
      "Uso opções tanto para proteção quanto para gerar renda ou ganhos avançados.",
      "Já usei opções para proteger minha carteira.",
      "Conheço, mas nunca operei.",
      "Não conheço nada sobre opções."
    ],
    weight: 1.0,
    dimension: "opcoes"
  },
  {
    id: "Q07",
    text: "Você já tem alguma diversificação entre renda fixa e renda variável?",
    type: "multi",
    options: [
      "Maior peso em renda variável e estratégias sofisticadas.",
      "Equilíbrio entre renda fixa e variável.",
      "Principalmente renda fixa, mas comecei a diversificar.",
      "Só renda fixa."
    ],
    weight: 1.0,
    dimension: "diversificacao"
  },
  {
    id: "Q08",
    text: "Qual o seu objetivo principal agora?",
    type: "multi",
    options: [
      "Buscar ganhos exponenciais com proteção e inteligência.",
      "Construir renda e blindar minha carteira contra crises.",
      "Aprender a diversificar melhor e dar o próximo passo.",
      "Aprender o básico e montar uma reserva segura."
    ],
    weight: 1.0,
    dimension: "objetivo"
  }
];

const calculateProfile = (answers: Record<string, number>) => {
  const totalQuestions = Object.keys(answers).length;
  const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
  const averageScore = totalScore / totalQuestions;

  if (averageScore >= 3.5) return 5;
  if (averageScore >= 2.8) return 4;
  if (averageScore >= 2.2) return 3;
  if (averageScore >= 1.5) return 2;
  return 1;
};

const Quiz = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { processarQuestionario } = useApi();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("roxedo_user");
    if (!userData) {
      toast({
        title: "Acesso negado",
        description: "Por favor, comece pela página de abertura.",
        variant: "destructive",
      });
      navigate("/opening");
      return;
    }

    if (currentQuestion === 0 && Object.keys(answers).length === 0) {
      trackEvent('quiz_started', { timestamp: new Date().toISOString() });
    }

    const question = questions[currentQuestion];
    if (answers[question.id] !== undefined) {
      const optionIndex = 4 - answers[question.id];
      setSelectedOption(optionIndex);
    } else {
      setSelectedOption(null);
    }
  }, [currentQuestion, navigate, toast]);

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = async () => {
    if (selectedOption === null) {
      return;
    }

    const score = 4 - selectedOption;
    const newAnswers = { ...answers, [question.id]: score };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      const profileLevel = calculateProfile(newAnswers);
      const assessmentId = Date.now().toString();

      const result = {
        assessmentId,
        answers: newAnswers,
        profileLevel,
        timestamp: new Date().toISOString(),
      };

      localStorage.setItem("roxedo_result", JSON.stringify(result));

      try {
        const userData = JSON.parse(localStorage.getItem("roxedo_user") || "{}");

        const questionarioData = {
          nome: userData.name || "Usuário",
          email: userData.email || "email@exemplo.com",
          nivel: profileLevel,
          pergunta1: questions[0].options[4 - newAnswers["Q01"]],
          pergunta2: questions[1].options[4 - newAnswers["Q02"]],
          pergunta3: questions[2].options[4 - newAnswers["Q03"]],
          pergunta4: questions[3].options[4 - newAnswers["Q04"]],
          pergunta5: questions[4].options[4 - newAnswers["Q05"]],
          pergunta6: questions[5].options[4 - newAnswers["Q06"]],
          pergunta7: questions[6].options[4 - newAnswers["Q07"]],
          pergunta8: questions[7].options[4 - newAnswers["Q08"]],
          pergunta9: "",
          pergunta10: ""
        };

        console.log("Enviando para API:", questionarioData);
        await processarQuestionario(questionarioData);

        toast({
          title: "Questionário concluído!",
          description: "Seus dados foram salvos com sucesso.",
        });
      } catch (error) {
        console.error("Erro ao enviar para API:", error);
        toast({
          title: "Aviso",
          description: "Resultado salvo localmente.",
          variant: "default"
        });
      }

      trackEvent('quiz_completed', {
        assessmentId,
        profileLevel,
        totalQuestions: questions.length
      });

      setTimeout(() => {
        navigate(`/resultado/${assessmentId}`);
      }, 1500);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const levelColors = [
    "hsl(0, 74%, 51%)",
    "hsl(258, 90%, 66%)",
    "hsl(24, 95%, 61%)",
    "hsl(48, 96%, 63%)",
  ];

  const isNextDisabled = selectedOption === null;

  return (
      <div className="min-h-screen bg-[hsl(0,0%,6.7%)] flex flex-col">
        <div className="bg-white/5 border-b border-white/10 sticky top-0 z-10 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-white/60 text-sm italic">
                Antifragilidade não é sorte, é sistema.
              </p>

              <Button
                  onClick={() => navigate("/")}
                  variant="ghost"
                  size="sm"
                  className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </div>

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white text-base md:text-lg font-semibold">
                A ESCALADA ROXEDO
              </h2>
              <span className="text-white/80 text-sm md:text-base font-medium">
              Etapa {currentQuestion + 1} de {questions.length}
            </span>
            </div>

            <Progress value={progress} className="h-2 bg-white/10" />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 py-8 md:py-12">
          <div className="max-w-3xl w-full">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 md:p-8 mb-6 md:mb-8 animate-fade-in">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-6 md:mb-8 leading-tight">
                {question.text}
              </h3>

              <div className="space-y-3 md:space-y-4">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleOptionSelect(index)}
                        className={`w-full text-left p-4 md:p-6 rounded-lg border-2 transition-all duration-300 ${
                            selectedOption === index
                                ? "bg-white/10 shadow-lg scale-[1.02]"
                                : "bg-white/5 hover:bg-white/10 hover:border-white/30"
                        }`}
                        style={{
                          borderColor: selectedOption === index ? levelColors[index] : "hsl(0 0% 100% / 0.2)",
                        }}
                    >
                      <div className="flex items-center gap-3 md:gap-4">
                        <div
                            className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                selectedOption === index
                                    ? "border-transparent"
                                    : "border-white/40"
                            }`}
                            style={{
                              backgroundColor: selectedOption === index ? levelColors[index] : "transparent",
                            }}
                        >
                          {selectedOption === index && (
                              <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-white rounded-full"></div>
                          )}
                        </div>

                        <span className="text-white text-sm md:text-base lg:text-lg flex-1">
                      {option}
                    </span>
                      </div>
                    </button>
                ))}
              </div>
            </Card>

            <div className="flex items-center justify-between gap-4">
              <Button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  variant="ghost"
                  className="text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                  size="lg"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">Voltar</span>
              </Button>

              <Button
                  onClick={handleNext}
                  disabled={isNextDisabled}
                  className="bg-[hsl(0,74%,51%)] hover:bg-[hsl(0,74%,61%)] text-white px-6 md:px-8 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[hsl(0,74%,51%)]"
                  size="lg"
              >
                {currentQuestion === questions.length - 1 ? "Finalizar" : "Próximo"}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
  );
};

export default Quiz;