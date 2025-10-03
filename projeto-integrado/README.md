# Projeto Integrado - Frontend React + Backend SpringBoot

Este projeto integra um frontend React moderno com um backend Java SpringBoot, criando uma aplicação completa para questionários de perfil de investidor.

## 🎯 Funcionalidades Implementadas

### ✅ Backend SpringBoot
- **API REST** completa com endpoints para processar questionários
- **Banco de dados H2** em memória para desenvolvimento
- **CORS configurado** para integração com frontend
- **Cálculo automático** de perfil baseado nas respostas
- **Endpoints de teste** para verificar conectividade

### ✅ Frontend React
- **Interface moderna** com Tailwind CSS e Shadcn/UI
- **Quiz interativo** com 8 perguntas sobre perfil de investidor
- **Integração completa** com API do backend
- **Página administrativa** para testar conectividade
- **Componente de teste** da integração API

### ✅ Integração Completa
- **Comunicação HTTP** entre frontend e backend
- **Processamento de questionários** em tempo real
- **Retorno de perfis** calculados automaticamente
- **Tratamento de erros** e validações

## 🏗️ Estrutura do Projeto

```
projeto-integrado/
├── backend/           # SpringBoot Application (Java 11)
│   ├── src/main/java/com/perfil/
│   │   ├── controller/    # REST Controllers
│   │   ├── model/         # Entidades JPA
│   │   ├── service/       # Lógica de negócio
│   │   ├── repository/    # Repositórios JPA
│   │   └── config/        # Configurações (CORS)
│   └── pom.xml           # Dependências Maven
├── frontend/          # React Application (Node.js)
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── pages/         # Páginas da aplicação
│   │   ├── services/      # Serviços de API
│   │   └── hooks/         # Hooks personalizados
│   └── package.json      # Dependências NPM
├── start.sh          # Script de inicialização
└── README.md         # Este arquivo
```

## 🚀 Início Rápido

### Opção 1: Script Automático (Recomendado)

```bash
# Executar o script de inicialização
./start.sh
```

O script irá:
1. ✅ Verificar dependências (Java, Maven, Node.js)
2. 🔨 Compilar o backend SpringBoot
3. 🚀 Iniciar o servidor backend na porta 8080
4. 📦 Instalar dependências do frontend (se necessário)
5. 🌐 Iniciar o servidor frontend (porta 8081 ou alternativa)
6. 📋 Mostrar URLs e instruções de teste

### Opção 2: Manual

#### 1. Backend SpringBoot
```bash
cd backend
mvn clean compile
mvn spring-boot:run
```

#### 2. Frontend React (em outro terminal)
```bash
cd frontend
npm install
npm run dev
```

## 🌐 URLs da Aplicação

| Serviço | URL | Descrição |
|---------|-----|-----------|
| **Frontend** | http://localhost:8081 | Interface React principal |
| **Backend** | http://localhost:8080 | API SpringBoot |
| **API Test** | http://localhost:8080/api/test | Endpoint de teste |
| **H2 Console** | http://localhost:8080/h2-console | Console do banco H2 |
| **Admin Panel** | http://localhost:8081/admin | Painel de testes |

## 🧪 Testando a Integração

### 1. Teste Automático via Interface
1. Acesse http://localhost:8081/admin
2. Clique em "Testar Conexão" para verificar conectividade
3. Clique em "Testar Envio de Questionário" para testar API

### 2. Teste Manual via cURL
```bash
# Testar conectividade
curl http://localhost:8080/api/test

# Testar processamento de questionário
curl -X POST http://localhost:8080/api/processar \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@exemplo.com",
    "pergunta1": "Acima de R$ 200.000",
    "pergunta2": "Estudo mais de 4 horas por semana",
    "pergunta3": "Faço gestão ativa",
    "pergunta4": "Muito alto",
    "pergunta5": "Sim, opero semanalmente",
    "pergunta6": "Uso opções tanto para proteção",
    "pergunta7": "Maior peso em renda variável",
    "pergunta8": "Buscar ganhos exponenciais"
  }'

# Resposta esperada:
# {"success":true,"nome":"João Silva","email":"joao@exemplo.com","perfil":"Investidor Antifrágil"}
```

### 3. Teste do Quiz Completo
1. Acesse http://localhost:8081
2. Navegue pelo quiz interativo
3. Complete as 8 perguntas
4. Veja o resultado calculado pelo backend

## 📊 Endpoints da API

| Método | Endpoint | Descrição | Exemplo |
|--------|----------|-----------|---------|
| `GET` | `/api/test` | Teste de conectividade | `{"status":"ok","message":"Backend conectado!"}` |
| `POST` | `/api/processar` | Processar questionário | Retorna perfil calculado |
| `GET` | `/api/perfil/{nome}` | Detalhes do perfil | Informações sobre o perfil |

## 🔧 Configurações Técnicas

### Backend (SpringBoot 2.7.18)
- **Java**: 11
- **Porta**: 8080
- **Banco**: H2 em memória
- **CORS**: Configurado para localhost:8081

### Frontend (React + Vite)
- **Node.js**: 18+
- **Porta**: 8081 (ou alternativa)
- **Build Tool**: Vite
- **UI**: Tailwind CSS + Shadcn/UI

## 🎨 Perfis de Investidor

O sistema calcula automaticamente o perfil baseado nas respostas:

| Nível | Perfil | Pontuação | Características |
|-------|--------|-----------|-----------------|
| 5 | **Investidor Antifrágil** | 14+ pontos | Estratégias avançadas, gestão ativa |
| 4 | **Sofisticado II** | 10-13 pontos | Conhecimento experiente |
| 3 | **Sofisticado I** | 6-9 pontos | Bom conhecimento do mercado |
| 2 | **Avançado** | 3-5 pontos | Conhecimento intermediário |
| 1 | **Medíocre** | 0-2 pontos | Investidor iniciante |

## 🛠️ Desenvolvimento

### Estrutura de Arquivos Importantes

```
backend/src/main/java/com/perfil/
├── controller/UsuarioController.java    # Endpoints REST
├── service/UsuarioService.java          # Lógica de cálculo
├── model/QuestionarioForm.java          # Modelo do questionário
├── model/Usuario.java                   # Entidade usuário
├── model/Perfil.java                    # Entidade perfil
└── config/CorsConfig.java               # Configuração CORS

frontend/src/
├── services/api.ts                      # Cliente da API
├── hooks/useApi.ts                      # Hook para API
├── components/ApiIntegration.tsx        # Componente de teste
└── pages/Admin.tsx                      # Página administrativa
```

### Adicionando Novas Funcionalidades

1. **Novo endpoint no backend**:
   - Adicionar método no `UsuarioController`
   - Implementar lógica no `UsuarioService`
   - Atualizar CORS se necessário

2. **Nova funcionalidade no frontend**:
   - Adicionar método no `api.ts`
   - Criar hook personalizado se necessário
   - Implementar componente React

## 🐛 Troubleshooting

### Backend não inicia
```bash
# Verificar Java
java -version  # Deve ser 11+

# Verificar Maven
mvn -version

# Verificar porta
netstat -tlnp | grep 8080
```

### Frontend não conecta
```bash
# Verificar se backend está rodando
curl http://localhost:8080/api/test

# Verificar logs do navegador (F12 > Console)
# Verificar configuração CORS no backend
```

### Erro de CORS
- Verificar se frontend está na porta correta (8081)
- Verificar `CorsConfig.java` no backend
- Adicionar nova origem se necessário

## 📈 Próximos Passos

- [ ] **Banco de produção** (PostgreSQL/MySQL)
- [ ] **Autenticação** JWT
- [ ] **Testes unitários** e integração
- [ ] **Docker** para containerização
- [ ] **CI/CD** pipeline
- [ ] **Logs** estruturados
- [ ] **Monitoramento** e métricas

## 📞 Suporte

Para dúvidas ou problemas:

1. **Verificar logs** do backend e frontend
2. **Testar endpoints** individualmente
3. **Verificar configurações** de CORS e portas
4. **Consultar documentação** das tecnologias utilizadas

---

**Desenvolvido com ❤️ usando React + SpringBoot**
