import { useState, useCallback } from 'react';
import { apiService, QuestionarioForm, ResultadoResponse } from '@/services/api';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processarQuestionario = useCallback(async (questionario: QuestionarioForm): Promise<ResultadoResponse | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const resultado = await apiService.processarQuestionario(questionario);
      return resultado;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const testarConectividade = useCallback(async (): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const isConnected = await apiService.testarConectividade();
      return isConnected;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro de conectividade';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    processarQuestionario,
    testarConectividade,
  };
};
