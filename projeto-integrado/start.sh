#!/bin/bash

echo "=== Projeto Integrado - Frontend React + Backend SpringBoot ==="
echo ""

# Verificar se Java e Maven estão instalados
if ! command -v java &> /dev/null; then
    echo "❌ Java não encontrado. Por favor, instale Java 11+"
    exit 1
fi

if ! command -v mvn &> /dev/null; then
    echo "❌ Maven não encontrado. Por favor, instale Maven"
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale Node.js 18+"
    exit 1
fi

echo "✅ Dependências verificadas"
echo ""

# Função para iniciar backend
start_backend() {
    echo "🚀 Iniciando backend SpringBoot..."
    cd backend
    mvn clean compile
    if [ $? -eq 0 ]; then
        echo "✅ Backend compilado com sucesso"
        echo "🌐 Iniciando servidor na porta 8080..."
        mvn spring-boot:run &
        BACKEND_PID=$!
        echo "Backend PID: $BACKEND_PID"
        cd ..
    else
        echo "❌ Erro na compilação do backend"
        exit 1
    fi
}

# Função para iniciar frontend
start_frontend() {
    echo "🚀 Iniciando frontend React..."
    cd frontend
    
    # Instalar dependências se necessário
    if [ ! -d "node_modules" ]; then
        echo "📦 Instalando dependências do frontend..."
        npm install
    fi
    
    echo "🌐 Iniciando servidor de desenvolvimento..."
    npm run dev &
    FRONTEND_PID=$!
    echo "Frontend PID: $FRONTEND_PID"
    cd ..
}

# Função para parar serviços
cleanup() {
    echo ""
    echo "🛑 Parando serviços..."
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
        echo "✅ Backend parado"
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
        echo "✅ Frontend parado"
    fi
    exit 0
}

# Capturar Ctrl+C
trap cleanup SIGINT

# Iniciar serviços
start_backend
sleep 5  # Aguardar backend inicializar

start_frontend
sleep 3  # Aguardar frontend inicializar

echo ""
echo "🎉 Projeto iniciado com sucesso!"
echo ""
echo "📍 URLs disponíveis:"
echo "   Frontend: http://localhost:8081 (ou porta alternativa mostrada acima)"
echo "   Backend:  http://localhost:8080"
echo "   API Test: http://localhost:8080/api/test"
echo "   H2 Console: http://localhost:8080/h2-console"
echo ""
echo "🔧 Para testar a integração:"
echo "   1. Acesse o frontend no navegador"
echo "   2. Vá para a página Admin (/admin)"
echo "   3. Teste a conectividade com o backend"
echo "   4. Envie um questionário de teste"
echo ""
echo "⏹️  Pressione Ctrl+C para parar os serviços"

# Aguardar indefinidamente
while true; do
    sleep 1
done
