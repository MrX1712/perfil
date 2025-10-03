# A Escalada Roxedo

Sistema de perfil de investidor com 5 níveis de evolução, baseado na metodologia antifrágil Roxedo.

## 🚀 Visão Geral

A Escalada Roxedo é uma jornada visual e interativa onde investidores descobrem seu perfil atual (de Medíocre a Investidor Antifrágil) através de um questionário estruturado. O sistema fornece recomendações personalizadas e trilha de evolução.

## 📋 Features Implementadas

### ✅ Frontend (React + Vite + TypeScript)

- **Story 1 - Abertura (Vale do Desespero)**
  - Landing page com formulário de cadastro
  - Validação de dados (nome, email, consentimento)
  - Navegação para quiz
  - Tracking de eventos

- **Story 2 - Quiz (A Subida da Montanha)**
  - 8 perguntas do questionário oficial (questionBank.yaml)
  - Stepper visual "Etapa X de Y"
  - Navegação com "Próximo" e "Voltar"
  - Micro-copy motivacional
  - Respostas salvas para navegação bidirecional
  - Cálculo de perfil baseado em pontuação

- **Story 3 - Resultado (Meu Nível na Montanha)**
  - Visualização da montanha em 5 camadas
  - Destaque do nível atual com cores oficiais Roxedo
  - Camadas abaixo (completed), acima (inactive)
  - Bandeira no topo para nível 5
  - Validação + próximo passo personalizado
  - Aviso legal obrigatório

- **Story 4 - Próximos Passos**
  - 3 recursos: Ebook 360, Tabela Perfis 0-5, Checklist Antifrágil
  - CTA de mini-plano por email
  - Tracking de conversão

- **Story 5 - Admin**
  - Rota `/admin` protegida
  - Tabela com filtros (data, nível, email)
  - Exportação CSV
  - Visualização de resultados individuais

### 🎨 Identidade Visual

- **Fonte:** Inter (fallback Helvetica Neue, Helvetica)
- **Background:** #111111
- **CTAs primários:** #DC2626
- **Paleta por nível:**
  - Nível 1: #FDE047 (Amarelo)
  - Nível 2: #FB923C (Laranja)
  - Nível 3: #7C3AED (Roxo)
  - Nível 4: #DC2626 (Vermelho)
  - Nível 5: #111111 (Preto)

### 📊 Eventos Rastreados

- `landing_viewed` - Visualização da landing page
- `quiz_started` - Início do questionário
- `quiz_completed` - Conclusão do questionário
- `result_viewed` - Visualização do resultado
- `cta_clicked` - Clique em CTAs (mini-plano, etc)

### ♿ Acessibilidade (WCAG AA)

- Labels semânticos em todos os inputs
- ARIA labels e roles apropriados
- Contraste de cores > 4.5:1
- Navegação por teclado completa
- Focus states visíveis
- Textos alternativos em imagens
- Lang="pt-BR" no HTML

### 📱 Mobile-First

Todo o design foi construído mobile-first com breakpoints Tailwind:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1400px

## 🛠️ Stack Tecnológica

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, shadcn/ui
- **Routing:** React Router v6
- **State:** React Hooks, localStorage
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod (validação)
- **Tracking:** Sistema customizado (`src/lib/events.ts`)

## 📦 Setup do Projeto

### Pré-requisitos

- Node.js 18+
- npm ou bun

### Instalação

```bash
# Clone o repositório via Lovable ou GitHub
git clone <YOUR_GIT_URL>

# Navegue até o diretório
cd <YOUR_PROJECT_NAME>

# Instale dependências
npm install

# Execute em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

### Estrutura de Pastas

```
src/
├── assets/              # Imagens e recursos estáticos
├── components/          # Componentes React
│   ├── ui/             # Componentes shadcn/ui
│   ├── Hero.tsx
│   ├── ValleySection.tsx
│   ├── MountainLevels.tsx
│   ├── MountainVisualization.tsx
│   ├── NextSteps.tsx
│   └── Footer.tsx
├── pages/              # Páginas da aplicação
│   ├── Index.tsx
│   ├── Opening.tsx
│   ├── Quiz.tsx
│   ├── Resultado.tsx
│   ├── Admin.tsx
│   └── NotFound.tsx
├── lib/                # Utilitários
│   ├── utils.ts
│   └── events.ts       # Sistema de tracking
├── hooks/              # Custom hooks
├── main/resources/     # Dados do questionário
│   └── questionBank.yaml
└── App.tsx             # Roteamento principal
```

## 🗄️ Persistência de Dados

O projeto está preparado para integração com backend Java (Spring Boot + H2), mas atualmente usa localStorage:

### Estrutura de Dados (localStorage)

```typescript
// roxedo_user
{
  name: string
  email: string
  consent: boolean
  timestamp: string (ISO)
}

// roxedo_result
{
  assessmentId: string
  answers: Record<questionId, score>
  profileLevel: number (1-5)
  timestamp: string (ISO)
}

// roxedo_events
[
  {
    event: EventType
    timestamp: string (ISO)
    data?: Record<string, any>
  }
]
```

### Tabelas Backend (H2 - Schema SQL)

```sql
-- User
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  consent BOOLEAN NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Assessment
CREATE TABLE assessments (
  id VARCHAR(50) PRIMARY KEY,
  user_id BIGINT NOT NULL,
  completed_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Answer
CREATE TABLE answers (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  assessment_id VARCHAR(50) NOT NULL,
  question_id VARCHAR(10) NOT NULL,
  score INT NOT NULL,
  FOREIGN KEY (assessment_id) REFERENCES assessments(id)
);

-- Result
CREATE TABLE results (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  assessment_id VARCHAR(50) NOT NULL UNIQUE,
  profile_level INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (assessment_id) REFERENCES assessments(id)
);
```

## 🎯 Rotas

- `/` - Landing page (Hero + Vale + Montanha + Verdades)
- `/opening` - Formulário de cadastro
- `/quiz` - Questionário de 8 perguntas
- `/resultado/:assessmentId` - Resultado do perfil
- `/admin` - Dashboard administrativo

## 🔗 Integração Backend (Próximos Passos)

### Endpoints Necessários

```
POST /api/users
POST /api/assessments
POST /api/assessments/:id/answers
POST /api/assessments/:id/calculate
GET /api/results/:assessmentId
GET /api/admin/assessments (filtros: date, level, email)
GET /api/admin/export/csv
POST /api/events/track
POST /api/email/mini-plan
```

### Autenticação Admin

Spring Security deve proteger `/admin` com:
- Username/password básico
- JWT tokens
- Roles: ROLE_ADMIN

## 📧 Envio de Emails

Configurar Resend.com ou similar para:
- Mini-plano personalizado
- Confirmação de cadastro
- Resultado do perfil

## 🚀 Deploy

### Deploy Frontend (Lovable)

Simples: clique em **Share → Publish** no Lovable!

### Deploy Customizado

- **Frontend:** Vercel / Netlify
- **Backend Java:** Heroku / Railway / AWS
- Configure CORS adequadamente

### Custom Domain

Conecte um domínio customizado em Project > Settings > Domains.

[Leia mais](https://docs.lovable.dev/features/custom-domain#custom-domain)

## 📄 Licença

Propriedade de Luiz Fernando Roxo e Otávio Fakhoury © 2025

## 🤝 Contribuindo

Este é um projeto proprietário. Contribuições externas não são aceitas no momento.

## 📞 Suporte

Para questões técnicas ou comerciais, entre em contato através do site oficial Roxedo.

---

## 🔧 Definition of Done Checklist

- ✅ Fluxo completo funcional (Opening → Quiz → Resultado)
- ✅ Montanha dinâmica com visualização por nível
- ✅ Admin com export CSV
- ✅ README com setup completo
- ✅ Acessibilidade AA implementada
- ✅ Mobile-first responsivo
- ✅ Identidade visual Roxedo aplicada
- ✅ Eventos de tracking implementados
- ✅ Persistência localStorage (pronto para H2)

---

**Desenvolvido com ❤️ pela equipe Roxedo**

**Lovable Project URL:** https://lovable.dev/projects/3fbf1a03-aeb8-4c4c-9254-2b283c4192e1
