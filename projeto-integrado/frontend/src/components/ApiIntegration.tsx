import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApi } from '@/hooks/useApi';
import { CheckCircle, XCircle, Loader2, RefreshCw } from 'lucide-react';

interface ApiIntegrationProps {
  onQuestionarioSubmit?: (data: any) => void;
}

const ApiIntegration = ({ onQuestionarioSubmit }: ApiIntegrationProps) => {
  const { loading, error, testarConectividade, processarQuestionario } = useApi();
  const [conectividade, setConectividade] = useState<boolean | null>(null);
  const [testando, setTestando] = useState(false);

  const testarConexao = async () => {
    setTestando(true);
    const isConnected = await testarConectividade();
    setConectividade(isConnected);
    setTestando(false);
  };

  useEffect(() => {
    testarConexao();
  }, []);

  const handleSubmitQuestionario = async () => {
    const questionarioExemplo = {
      nome: "Usuário Teste",
      email: "teste@exemplo.com",
      nivel: 5, // ADICIONADO: nível calculado (5 = Investidor Antifrágil)
      pergunta1: "Acima de R$ 200.000",
      pergunta2: "Estudo mais de 4 horas por semana.",
      pergunta3: "Faço gestão ativa, uso opções, balanceio carteira e monto estratégias.",
      pergunta4: "Muito alto — busco estratégias mais complexas para potencializar ganhos.",
      pergunta5: "Sim, opero semanalmente ou diariamente.",
      pergunta6: "Uso opções tanto para proteção quanto para gerar renda ou ganhos avançados.",
      pergunta7: "Maior peso em renda variável e estratégias sofisticadas.",
      pergunta8: "Buscar ganhos exponenciais com proteção e inteligência.",
      pergunta9: "",
      pergunta10: ""
    };

    const resultado = await processarQuestionario(questionarioExemplo);
    if (resultado && onQuestionarioSubmit) {
      onQuestionarioSubmit(resultado);
    }
  };

  return (
      <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Status da API Backend</h3>
            <Button
                onClick={testarConexao}
                disabled={testando}
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/10"
            >
              {testando ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
              )}
              Testar Conexão
            </Button>
          </div>

          <div className="flex items-center gap-3">
            {conectividade === null ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-yellow-400" />
                  <span className="text-white/70">Verificando conectividade...</span>
                </>
            ) : conectividade ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-green-400">Backend conectado</span>
                  <Badge variant="secondary" className="bg-green-400/20 text-green-400">
                    Online
                  </Badge>
                </>
            ) : (
                <>
                  <XCircle className="w-5 h-5 text-red-400" />
                  <span className="text-red-400">Backend desconectado</span>
                  <Badge variant="secondary" className="bg-red-400/20 text-red-400">
                    Offline
                  </Badge>
                </>
            )}
          </div>

          {error && (
              <div className="p-3 bg-red-400/20 border border-red-400/30 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
          )}

          {conectividade && (
              <div className="pt-4 border-t border-white/10">
                <Button
                    onClick={handleSubmitQuestionario}
                    disabled={loading}
                    className="w-full bg-[hsl(0,74%,51%)] hover:bg-[hsl(0,74%,61%)] text-white"
                >
                  {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Processando...
                      </>
                  ) : (
                      'Testar Envio de Questionário'
                  )}
                </Button>
              </div>
          )}

          <div className="text-xs text-white/50 space-y-1">
            <p>• Backend: http://localhost:8080</p>
            <p>• Frontend: http://localhost:5173</p>
            <p>• CORS configurado para desenvolvimento</p>
          </div>
        </div>
      </Card>
  );
};

export default ApiIntegration;