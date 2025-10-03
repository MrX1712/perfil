import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Download, Eye, Filter, X, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ApiIntegration from "@/components/ApiIntegration";

interface AssessmentRecord {
  assessmentId: string;
  name: string;
  email: string;
  level: number;
  levelName: string;
  completedAt: string;
}

const levelNames: Record<number, string> = {
  1: "Medíocre",
  2: "Avançado",
  3: "Sofisticado I",
  4: "Sofisticado II",
  5: "Investidor Antifrágil",
};

const levelColors: Record<number, string> = {
  1: "#FDE047",
  2: "#FB923C",
  3: "#7C3AED",
  4: "#DC2626",
  5: "#111111",
};

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [records, setRecords] = useState<AssessmentRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<AssessmentRecord[]>([]);
  const [emailFilter, setEmailFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    // Carregar dados do localStorage (simulando backend)
    loadRecords();
  }, []);

  useEffect(() => {
    // Aplicar filtros
    applyFilters();
  }, [records, emailFilter, levelFilter, dateFilter]);

  const loadRecords = () => {
    // Simular dados de múltiplos usuários
    // Em produção, isso viria do backend Java
    const mockRecords: AssessmentRecord[] = [];
    
    // Tentar carregar do localStorage
    const storedResult = localStorage.getItem("roxedo_result");
    const storedUser = localStorage.getItem("roxedo_user");
    
    if (storedResult && storedUser) {
      const result = JSON.parse(storedResult);
      const user = JSON.parse(storedUser);
      
      mockRecords.push({
        assessmentId: result.assessmentId,
        name: user.name,
        email: user.email,
        level: result.profileLevel,
        levelName: levelNames[result.profileLevel],
        completedAt: result.timestamp,
      });
    }

    // Adicionar dados mockados para demonstração
    const mockData: AssessmentRecord[] = [
      {
        assessmentId: "1759440000001",
        name: "João Silva",
        email: "joao.silva@email.com",
        level: 2,
        levelName: levelNames[2],
        completedAt: "2025-09-28T10:30:00Z",
      },
      {
        assessmentId: "1759440000002",
        name: "Maria Santos",
        email: "maria.santos@email.com",
        level: 3,
        levelName: levelNames[3],
        completedAt: "2025-09-29T14:15:00Z",
      },
      {
        assessmentId: "1759440000003",
        name: "Pedro Costa",
        email: "pedro.costa@email.com",
        level: 1,
        levelName: levelNames[1],
        completedAt: "2025-09-30T09:20:00Z",
      },
      {
        assessmentId: "1759440000004",
        name: "Ana Oliveira",
        email: "ana.oliveira@email.com",
        level: 4,
        levelName: levelNames[4],
        completedAt: "2025-10-01T16:45:00Z",
      },
      {
        assessmentId: "1759440000005",
        name: "Carlos Rodrigues",
        email: "carlos.rodrigues@email.com",
        level: 5,
        levelName: levelNames[5],
        completedAt: "2025-10-02T11:00:00Z",
      },
    ];

    setRecords([...mockRecords, ...mockData]);
  };

  const applyFilters = () => {
    let filtered = [...records];

    // Filtro por email
    if (emailFilter) {
      filtered = filtered.filter((record) =>
        record.email.toLowerCase().includes(emailFilter.toLowerCase()) ||
        record.name.toLowerCase().includes(emailFilter.toLowerCase())
      );
    }

    // Filtro por nível
    if (levelFilter !== "all") {
      filtered = filtered.filter((record) => record.level === parseInt(levelFilter));
    }

    // Filtro por data
    if (dateFilter) {
      filtered = filtered.filter((record) => {
        const recordDate = new Date(record.completedAt).toISOString().split("T")[0];
        return recordDate === dateFilter;
      });
    }

    setFilteredRecords(filtered);
  };

  const clearFilters = () => {
    setEmailFilter("");
    setLevelFilter("all");
    setDateFilter("");
  };

  const exportToCSV = () => {
    if (filteredRecords.length === 0) {
      toast({
        title: "Nenhum registro",
        description: "Não há registros para exportar.",
        variant: "destructive",
      });
      return;
    }

    // Criar CSV
    const headers = ["assessmentId", "name", "email", "level", "completedAt"];
    const csvContent = [
      headers.join(","),
      ...filteredRecords.map((record) =>
        [
          record.assessmentId,
          `"${record.name}"`,
          record.email,
          record.level,
          record.completedAt,
        ].join(",")
      ),
    ].join("\n");

    // Download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `roxedo-assessments-${Date.now()}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "CSV exportado!",
      description: `${filteredRecords.length} registro(s) exportado(s) com sucesso.`,
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleView = (assessmentId: string) => {
    navigate(`/resultado/${assessmentId}`);
  };

  return (
    <div className="min-h-screen bg-[hsl(0,0%,6.7%)] py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Admin - Assessments Roxedo
            </h1>
            <p className="text-white/60">
              Gerencie e visualize todos os questionários completados
            </p>
          </div>
          <Button
            onClick={() => navigate("/")}
            className="bg-white/10 text-white hover:bg-white/20 border-2 border-white/40"
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </div>

        {/* Integração API */}
        <div className="mb-6">
          <ApiIntegration onQuestionarioSubmit={(data) => {
            toast({
              title: "Questionário processado!",
              description: `Perfil: ${data.perfil} para ${data.nome}`,
            });
          }} />
        </div>

        {/* Filtros */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-white" />
            <h2 className="text-white font-semibold text-lg">Filtros</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Filtro por email/nome */}
            <div>
              <label className="text-white text-sm mb-2 block">Email ou Nome</label>
              <Input
                type="text"
                placeholder="Buscar por email ou nome..."
                value={emailFilter}
                onChange={(e) => setEmailFilter(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
              />
            </div>

            {/* Filtro por nível */}
            <div>
              <label className="text-white text-sm mb-2 block">Nível</label>
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Todos os níveis" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os níveis</SelectItem>
                  <SelectItem value="1">Nível 1 - Medíocre</SelectItem>
                  <SelectItem value="2">Nível 2 - Avançado</SelectItem>
                  <SelectItem value="3">Nível 3 - Sofisticado I</SelectItem>
                  <SelectItem value="4">Nível 4 - Sofisticado II</SelectItem>
                  <SelectItem value="5">Nível 5 - Investidor Antifrágil</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filtro por data */}
            <div>
              <label className="text-white text-sm mb-2 block">Data</label>
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-white/60 text-sm">
              {filteredRecords.length} registro(s) encontrado(s)
            </span>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={clearFilters}
                className="bg-white/10 text-white hover:bg-white/20 border-2 border-white/40"
              >
                <X className="w-4 h-4 mr-2" />
                Limpar filtros
              </Button>
              <Button
                size="sm"
                onClick={exportToCSV}
                className="bg-[#DC2626] hover:bg-[#DC2626]/90 text-white"
                disabled={filteredRecords.length === 0}
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </Card>

        {/* Tabela */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-white/5">
                  <TableHead className="text-white font-semibold">Data</TableHead>
                  <TableHead className="text-white font-semibold">Nome</TableHead>
                  <TableHead className="text-white font-semibold">Email</TableHead>
                  <TableHead className="text-white font-semibold">Nível</TableHead>
                  <TableHead className="text-white font-semibold text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-white/60 py-8">
                      Nenhum registro encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRecords.map((record) => (
                    <TableRow
                      key={record.assessmentId}
                      className="border-white/10 hover:bg-white/5"
                    >
                      <TableCell className="text-white/80 text-sm">
                        {formatDate(record.completedAt)}
                      </TableCell>
                      <TableCell className="text-white font-medium">
                        {record.name}
                      </TableCell>
                      <TableCell className="text-white/80">
                        {record.email}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                            style={{
                              backgroundColor: levelColors[record.level],
                              color: record.level === 5 ? "#FFFFFF" : "#111111",
                            }}
                          >
                            {record.level}
                          </div>
                          <span className="text-white/80 text-sm">
                            {record.levelName}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(record.assessmentId)}
                          className="text-white hover:bg-white/10"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Ver
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Footer info */}
        <div className="mt-6 text-center text-white/40 text-sm">
          <p>
            Dados simulados no frontend • Integração com backend Java pendente
          </p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
