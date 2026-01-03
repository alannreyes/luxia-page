#!/bin/bash

# Deploy script para luxia.us
# Uso: ./deploy.sh "mensaje del commit"

set -e

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Mensaje de commit (opcional)
COMMIT_MSG="${1:-Auto deploy $(date '+%Y-%m-%d %H:%M')}"

echo -e "${YELLOW}🚀 Iniciando deploy a luxia.us...${NC}"

# 1. Verificar cambios
if [[ -z $(git status -s) ]]; then
    echo -e "${YELLOW}⚠️  No hay cambios locales. Verificando si hay commits sin push...${NC}"
else
    # 2. Agregar y commitear
    echo -e "${GREEN}📦 Agregando cambios...${NC}"
    git add .

    echo -e "${GREEN}💾 Commit: ${COMMIT_MSG}${NC}"
    git commit -m "$COMMIT_MSG"
fi

# 3. Push a GitHub
if git status | grep -q "Your branch is ahead"; then
    echo -e "${GREEN}⬆️  Pushing a GitHub...${NC}"
    git push origin main
else
    echo -e "${YELLOW}✓ GitHub ya está actualizado${NC}"
fi

# 4. Deploy en VPS
echo -e "${GREEN}🖥️  Conectando al VPS...${NC}"
ssh luxia "cd /opt/luxia/luxia-web && \
    sudo git pull origin main && \
    sudo docker compose build luxia-web && \
    sudo docker compose up -d luxia-web"

echo -e "${GREEN}✅ Deploy completado!${NC}"
echo -e "${GREEN}🌐 https://luxia.us${NC}"
