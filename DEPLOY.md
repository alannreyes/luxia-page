# Deploy - luxia.us

## Servidor de Producción

- **VPS:** 156.67.31.7
- **Usuario SSH:** alann
- **Hostname:** vmi2959779

## Rutas en el VPS

| Ruta | Descripción |
|------|-------------|
| `/opt/luxia/` | Directorio principal |
| `/opt/luxia/luxia-web/` | Código fuente (git repo) |
| `/opt/luxia/docker-compose.yml` | Docker Compose principal |

## Contenedores relacionados

```
luxia-web          - Next.js landing page (puerto 3000)
traefik            - Reverse proxy + SSL
efcalerta-api      - Backend EFC Alerta
efcalerta-dashboard - Dashboard EFC Alerta
```

## Deploy rápido

```bash
# 1. Commit y push local
git add . && git commit -m "feat: descripción" && git push origin main

# 2. En el VPS - actualizar y rebuild
ssh alann@156.67.31.7 "cd /opt/luxia/luxia-web && sudo git pull origin main && cd /opt/luxia && sudo docker compose up -d --build luxia-web"
```

## Deploy paso a paso

```bash
# 1. Conectar al VPS
ssh alann@156.67.31.7

# 2. Ir al repo y hacer pull
cd /opt/luxia/luxia-web
sudo git pull origin main

# 3. Rebuild solo luxia-web (sin afectar otros servicios)
cd /opt/luxia
sudo docker compose up -d --build luxia-web

# 4. Verificar que está corriendo
sudo docker ps | grep luxia-web
```

## Si hay cambios locales en el VPS

```bash
# Guardar cambios temporalmente
cd /opt/luxia/luxia-web
sudo git stash

# Pull y rebuild
sudo git pull origin main
cd /opt/luxia
sudo docker compose up -d --build luxia-web

# (Opcional) Restaurar cambios locales
cd /opt/luxia/luxia-web
sudo git stash pop
```

## Verificar deploy

```bash
curl -sL https://luxia.us/es | grep -i "palabra_clave"
```

## Logs

```bash
# Ver logs del contenedor
ssh alann@156.67.31.7 "sudo docker logs luxia-web --tail 50"

# Logs en tiempo real
ssh alann@156.67.31.7 "sudo docker logs luxia-web -f"
```

## Rollback

```bash
ssh alann@156.67.31.7 "cd /opt/luxia/luxia-web && sudo git checkout HEAD~1 && cd /opt/luxia && sudo docker compose up -d --build luxia-web"
```

---
Última actualización: 2024-12-26
