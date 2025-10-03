import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Home, Trash2, Plus, X, Edit2, Calculator } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface Ativo {
  id: string;
  nome: string;
  valor: number;
  tipo: string;
  categoria: "conservador" | "agressivo";
}

const CalculadoraBarbell = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [ativos, setAtivos] = useState<Ativo[]>([]);
  const [nomeAtivo, setNomeAtivo] = useState("");
  const [valorAtivo, setValorAtivo] = useState("");
  const [tipoAtivo, setTipoAtivo] = useState("");
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [isExemplo, setIsExemplo] = useState(false);

  const tiposAtivos = [
    { value: "pos|conservador", label: "Renda Fixa Pós (CDI, Selic)" },
    { value: "pre|conservador", label: "Renda Fixa Pré (Tesouro Pré)" },
    { value: "ipca|conservador", label: "Renda Fixa Inflação (Tesouro IPCA)" },
    { value: "credito|conservador", label: "Crédito Privado (CDB, LCI, Debêntures)" },
    { value: "acoes|agressivo", label: "Ações (BOVA11, Ações, FIIs)" },
    { value: "multi|agressivo", label: "Multimercado/Fundos" },
  ];

  const adicionarAtivo = () => {
    if (!nomeAtivo || !valorAtivo || !tipoAtivo) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para adicionar o ativo.",
        variant: "destructive",
      });
      return;
    }

    const valor = parseFloat(valorAtivo);
    if (valor <= 0) {
      toast({
        title: "Valor inválido",
        description: "O valor deve ser maior que zero.",
        variant: "destructive",
      });
      return;
    }

    const [tipo, categoria] = tipoAtivo.split("|") as [string, "conservador" | "agressivo"];

    if (editandoId) {
      // Editando
      setAtivos(ativos.map(a => 
        a.id === editandoId 
          ? { ...a, nome: nomeAtivo, valor, tipo, categoria }
          : a
      ));
      setEditandoId(null);
    } else {
      // Adicionando novo
      const novoAtivo: Ativo = {
        id: Date.now().toString(),
        nome: nomeAtivo,
        valor,
        tipo,
        categoria,
      };
      setAtivos([...ativos, novoAtivo]);
    }

    limparFormulario();
  };

  const limparFormulario = () => {
    setNomeAtivo("");
    setValorAtivo("");
    setTipoAtivo("");
  };

  const editarAtivo = (id: string) => {
    const ativo = ativos.find(a => a.id === id);
    if (ativo) {
      setNomeAtivo(ativo.nome);
      setValorAtivo(ativo.valor.toString());
      setTipoAtivo(`${ativo.tipo}|${ativo.categoria}`);
      setEditandoId(id);
    }
  };

  const removerAtivo = (id: string) => {
    setAtivos(ativos.filter(a => a.id !== id));
  };

  const limparCarteira = () => {
    setAtivos([]);
    limparFormulario();
    setEditandoId(null);
    setIsExemplo(false);
  };

  const carregarExemplo = () => {
    const exemplos: Ativo[] = [
      { id: "1", nome: "Tesouro Selic", valor: 50000, tipo: "pos", categoria: "conservador" },
      { id: "2", nome: "CDB Banco XYZ", valor: 30000, tipo: "credito", categoria: "conservador" },
      { id: "3", nome: "BOVA11", valor: 15000, tipo: "acoes", categoria: "agressivo" },
      { id: "4", nome: "Bitcoin", valor: 5000, tipo: "acoes", categoria: "agressivo" },
    ];
    setAtivos(exemplos);
    setIsExemplo(true);
  };

  const totalInvestido = ativos.reduce((sum, a) => sum + a.valor, 0);
  const totalConservador = ativos.filter(a => a.categoria === "conservador").reduce((sum, a) => sum + a.valor, 0);
  const totalAgressivo = ativos.filter(a => a.categoria === "agressivo").reduce((sum, a) => sum + a.valor, 0);

  const percConservador = totalInvestido > 0 ? (totalConservador / totalInvestido) * 100 : 0;
  const percAgressivo = totalInvestido > 0 ? (totalAgressivo / totalInvestido) * 100 : 0;

  // Diagnóstico
  const getDiagnostico = () => {
    if (totalInvestido === 0) return null;

    if (percConservador >= 75 && percConservador <= 85 && percAgressivo >= 15 && percAgressivo <= 25) {
      return {
        tipo: "sucesso",
        titulo: "✓ Carteira Antifrágil",
        texto: "Parabéns! Sua carteira está bem balanceada no modelo Barbell (80% conservador / 20% agressivo)."
      };
    } else if (percConservador > 85) {
      return {
        tipo: "alerta",
        titulo: "⚠️ Muito Conservadora",
        texto: `Sua carteira está ${percConservador.toFixed(0)}% em ativos conservadores. Considere aumentar exposição a ativos agressivos para capturar oportunidades assimétricas.`
      };
    } else if (percAgressivo > 25) {
      return {
        tipo: "alerta",
        titulo: "⚠️ Muito Agressiva",
        texto: `Sua carteira está ${percAgressivo.toFixed(0)}% em ativos agressivos. Você está exposto demais ao risco. Aumente sua proteção com ativos conservadores.`
      };
    } else {
      return {
        tipo: "info",
        titulo: "💡 Ajuste Necessário",
        texto: "Sua carteira precisa de rebalanceamento para atingir o modelo Barbell ideal (80% conservador / 20% agressivo)."
      };
    }
  };

  const diagnostico = getDiagnostico();

  // Dados para gráficos
  const dadosAtual = [
    { name: "Conservador", value: totalConservador, color: "#28a745" },
    { name: "Agressivo", value: totalAgressivo, color: "#DC2626" },
  ].filter(d => d.value > 0);

  const dadosIdeal = [
    { name: "Conservador 80%", value: 80, color: "#28a745" },
    { name: "Agressivo 20%", value: 20, color: "#DC2626" },
  ];

  return (
    <div className="min-h-screen bg-[hsl(0,0%,6.7%)] py-8 px-4">
      <div className="container mx-auto max-width-6xl">
        {/* Header */}
        <Card className="bg-primary text-primary-foreground p-6 md:p-8 mb-8 relative">
          <Button
            onClick={() => navigate("/")}
            className="absolute top-4 right-4 bg-white/10 text-white hover:bg-white/20 border-2 border-white/40"
            size="sm"
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>

          <div className="pr-20">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 flex items-center gap-3">
              <Calculator className="w-8 h-8" />
              Calculadora Barbell 360
            </h1>
            <p className="text-white/70 text-base md:text-lg">
              Ferramenta educacional para entender o conceito Barbell aplicado à sua carteira
            </p>
          </div>
        </Card>

        {/* Formulário */}
        <Card className="bg-white p-6 md:p-8 border-2 border-white/20 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold">Adicione seus ativos</h2>
            {ativos.length > 0 && (
              <Button
                onClick={limparCarteira}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Limpar Tudo
              </Button>
            )}
          </div>

          <div className="grid gap-4 mb-4">
            <div>
              <Label htmlFor="nome">Nome do ativo</Label>
              <Input
                id="nome"
                value={nomeAtivo}
                onChange={(e) => setNomeAtivo(e.target.value)}
                placeholder="ex: Tesouro Selic, BOVA11"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="valor">Valor investido (R$)</Label>
              <Input
                id="valor"
                type="number"
                value={valorAtivo}
                onChange={(e) => setValorAtivo(e.target.value)}
                placeholder="0.00"
                step="0.01"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="tipo">Tipo de ativo</Label>
              <Select value={tipoAtivo} onValueChange={setTipoAtivo}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecione o tipo de ativo" />
                </SelectTrigger>
                <SelectContent>
                  {tiposAtivos.map((tipo) => (
                    <SelectItem key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={adicionarAtivo}
              className="flex-1 bg-[#DC2626] hover:bg-[#DC2626]/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              {editandoId ? "Salvar Alterações" : "Adicionar Ativo"}
            </Button>
            {editandoId && (
              <Button
                onClick={() => {
                  setEditandoId(null);
                  limparFormulario();
                }}
                variant="outline"
              >
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
            )}
          </div>
        </Card>

        {/* Empty State ou Lista de Ativos */}
        {ativos.length === 0 ? (
          <Card className="bg-white p-12 text-center">
            <h3 className="text-xl font-bold mb-4">Adicione seus ativos para começar</h3>
            <p className="text-muted-foreground mb-6">
              Insira os investimentos que você tem hoje para descobrir se sua carteira está antifrágil.
            </p>
            <div className="bg-muted p-6 rounded-lg">
              <p className="text-sm text-muted-foreground mb-4">Não tem ativos ainda?</p>
              <Button onClick={carregarExemplo} className="bg-[#DC2626] hover:bg-[#DC2626]/90">
                📊 Ver carteira de exemplo
              </Button>
            </div>
          </Card>
        ) : (
          <>
            {/* Banner Exemplo */}
            {isExemplo && (
              <Card className="bg-yellow-50 border-2 border-yellow-400 p-6 mb-8 text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-yellow-900 mb-2">Carteira de Demonstração</h3>
                <p className="text-yellow-800 mb-4">
                  Esta é uma carteira fictícia para você explorar como a ferramenta funciona.
                </p>
                <Button
                  onClick={() => {
                    setIsExemplo(false);
                    limparCarteira();
                  }}
                  className="bg-[#DC2626] hover:bg-[#DC2626]/90"
                >
                  ✓ Usar minha carteira real
                </Button>
              </Card>
            )}

            {/* Lista de Ativos */}
            <Card className="bg-white p-6 md:p-8 mb-8">
              <h3 className="text-xl font-bold mb-6">Ativos da Carteira</h3>
              
              <div className="space-y-3 mb-6">
                {ativos.map((ativo) => (
                  <div
                    key={ativo.id}
                    className="flex items-center justify-between p-4 border-b hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="font-bold">{ativo.nome}</div>
                      <div className="text-sm text-muted-foreground capitalize">{ativo.tipo}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-lg font-bold">
                        {ativo.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => editarAtivo(ativo.id)}
                          variant="outline"
                          size="sm"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => removerAtivo(ativo.id)}
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-primary text-primary-foreground p-4 rounded-lg flex justify-between items-center">
                <span className="text-lg font-bold">Total Investido:</span>
                <span className="text-2xl font-bold">
                  {totalInvestido.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </span>
              </div>
            </Card>

            {/* Diagnóstico */}
            {diagnostico && (
              <Card 
                className={`p-6 mb-8 border-2 ${
                  diagnostico.tipo === "sucesso" 
                    ? "bg-green-50 border-green-500" 
                    : diagnostico.tipo === "alerta"
                    ? "bg-yellow-50 border-yellow-500"
                    : "bg-blue-50 border-blue-500"
                }`}
              >
                <h3 className="text-lg font-bold mb-2">{diagnostico.titulo}</h3>
                <p className="text-sm leading-relaxed">{diagnostico.texto}</p>
              </Card>
            )}

            {/* Gráficos */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Gráfico Atual */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-center mb-4">Sua Carteira Atual</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={dadosAtual}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={(entry) => `${entry.name}: ${(((entry.value as number) / totalInvestido) * 100).toFixed(0)}%`}
                    >
                      {dadosAtual.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString("pt-BR")}`} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="text-center text-sm space-y-1 mt-4">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span>Conservador: {percConservador.toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 bg-[#DC2626] rounded"></div>
                    <span>Agressivo: {percAgressivo.toFixed(1)}%</span>
                  </div>
                </div>
              </Card>

              {/* Gráfico Ideal */}
              <Card className="p-6 border-2 border-[#DC2626]">
                <h3 className="text-lg font-bold text-center mb-4 text-[#DC2626]">
                  Barbell Ideal (Referência 80/20)
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={dadosIdeal}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={(entry) => entry.name}
                    >
                      {dadosIdeal.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="text-center text-sm space-y-1 mt-4">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span>Conservador: 80%</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 bg-[#DC2626] rounded"></div>
                    <span>Agressivo: 20%</span>
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CalculadoraBarbell;
