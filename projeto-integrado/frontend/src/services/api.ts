// Use a variável de ambiente ou fallback para localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export interface QuestionarioForm {
  nome: string;
  email: string;
  nivel: number;
  pergunta1: string;
  pergunta2: string;
  pergunta3: string;
  pergunta4: string;
  pergunta5: string;
  pergunta6: string;
  pergunta7: string;
  pergunta8: string;
  pergunta9: string;
  pergunta10: string;
}

export interface ResultadoResponse {
  success: boolean;
  nome: string;
  email: string;
  perfil: string;
}

export interface ErrorResponse {
  success: boolean;
  message: string;
}

export interface PerfilDetalhes {
  nome: string;
  descricao: string;
  caracteristicas: string[];
}

class ApiService {
  async processarQuestionario(questionario: QuestionarioForm): Promise<ResultadoResponse> {
    try {
      console.log('Enviando questionário para:', `${API_BASE_URL}/processar`);
      console.log('Dados:', questionario);

      const response = await fetch(`${API_BASE_URL}/processar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(questionario),
      });

      console.log('Status da resposta:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Resposta recebida:', data);
      return data;
    } catch (error) {
      console.error('Erro ao processar questionário:', error);
      throw error;
    }
  }

  async obterDetalhesPerfil(nomePerfil: string): Promise<PerfilDetalhes> {
    try {
      const response = await fetch(`${API_BASE_URL}/perfil/${nomePerfil}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao obter detalhes do perfil:', error);
      throw error;
    }
  }

  async testarConectividade(): Promise<boolean> {
    try {
      console.log('Testando conectividade com:', `${API_BASE_URL}/test`);
      const response = await fetch(`${API_BASE_URL}/test`, {
        method: 'GET',
      });
      return response.ok;
    } catch (error) {
      console.error('Erro de conectividade:', error);
      return false;
    }
  }
}

export const apiService = new ApiService();