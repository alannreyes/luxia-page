#!/bin/bash

# Deploy script para luxia.us — VPS app04 (86.48.21.142), vía rsync + Docker.
# NO es git pull: el VPS no tiene checkout de git, se le copian los archivos directo.
# Uso: ./deploy.sh              -> sincroniza todo el árbol (excepto node_modules/.next/.git/.env.local)
#      ./deploy.sh <archivo...> -> sincroniza solo esos archivos (más seguro si hay cambios
#                                   locales sin commitear de otra sesión en este mismo repo)
#
# Ver DEPLOY.md para el detalle completo y las trampas conocidas (carpeta remota compartida,
# nunca --delete sin excluir lo ajeno, nunca tocar .env.local).

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REMOTE_HOST="app04"
REMOTE_DIR="/home/alann/luxia-web"

echo -e "${YELLOW}🚀 Deploy a luxia.us (${REMOTE_HOST}:${REMOTE_DIR})${NC}"

# Verificación de cordura: si "app04" no está en el ssh config, avisar en vez de fallar oscuro.
if ! grep -q "^Host ${REMOTE_HOST}$" ~/.ssh/config 2>/dev/null; then
  echo -e "${RED}✗ No encuentro 'Host ${REMOTE_HOST}' en ~/.ssh/config. Revisa DEPLOY.md.${NC}"
  exit 1
fi

if [ "$#" -gt 0 ]; then
  echo -e "${GREEN}📦 Sincronizando ${#} archivo(s) puntual(es)...${NC}"
  for f in "$@"; do
    rel="${f#$REPO_DIR/}"
    echo "  -> $rel"
    rsync -avz "$f" "${REMOTE_HOST}:${REMOTE_DIR}/${rel}"
  done
else
  echo -e "${YELLOW}⚠️  Sin archivos puntuales: sincronizando TODO el árbol del proyecto.${NC}"
  echo -e "${YELLOW}   (la carpeta remota es compartida con otros proyectos — esto NO borra nada ajeno,${NC}"
  echo -e "${YELLOW}   pero sí sobrescribe cualquier archivo de ESTE repo que hayas cambiado sin commitear)${NC}"
  rsync -avz \
    --exclude node_modules --exclude .next --exclude .git --exclude .env.local \
    "${REPO_DIR}/" "${REMOTE_HOST}:${REMOTE_DIR}/"
fi

echo -e "${GREEN}🖥️  Reconstruyendo el contenedor en el VPS...${NC}"
ssh "${REMOTE_HOST}" "cd ${REMOTE_DIR} && docker compose up -d --build luxia-web"

echo -e "${GREEN}✅ Deploy completado!${NC}"
echo -e "${GREEN}🌐 https://luxia.us${NC}"
echo -e "${YELLOW}Verifica con: curl -s --resolve luxia.us:443:86.48.21.142 https://luxia.us/es${NC}"
