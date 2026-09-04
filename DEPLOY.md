# Deploy — luxia.us

## Servidor de producción (VIGENTE)

- **VPS:** `app04` — `86.48.21.142` (Contabo, alias SSH `app04` en `~/.ssh/config`)
- **Usuario SSH:** `alann` (sin sudo — todo por Docker)
- **Ruta del sitio en el VPS:** `/home/alann/luxia-web/`
- **Reverse proxy:** Traefik v3.3 (ya corriendo en el VPS, red `traefik-public`)
- **Contenedor:** `luxia-web` (compose project `luxia-web`, imagen `luxia-web-luxia-web`)

⚠️ **`156.67.31.7` (alias SSH `luxia`) está MUERTO.** Fue el VPS viejo — hoy no responde por
SSH (timeout). Si algo en este repo, en tu shell history, o en un script viejo apunta ahí,
está obsoleto. `luxia.us` resuelve hoy a `86.48.21.142` — verificarlo siempre con
`dig +short luxia.us` antes de asumir un host.

⚠️ **`/home/alann/luxia-web/` es una carpeta compartida/desordenada** — conviven ahí archivos de
OTROS proyectos del VPS (quedaron de un `rsync` viejo sin `--delete`). `next build` solo type-chequea
lo que cubre `tsconfig.json` (`include` ya está acotado a las carpetas propias de esta app — no
tocar eso). **Nunca correr `rsync --delete` sobre esa carpeta** sin excluir explícitamente lo que no
es de este proyecto — podría borrar algo que otra app use por bind-mount.

## Deploy (rsync + Docker, NO es git pull)

El deploy NO se hace con `git pull` en el VPS. El VPS no tiene por qué tener un checkout de git —
se le copian los archivos directo por `rsync` y se reconstruye la imagen ahí.

```bash
# SIEMPRE con ruta ABSOLUTA de origen (nunca "./" — si el cwd es otro, arrastra carpetas ajenas)
rsync -avz \
  --exclude node_modules --exclude .next --exclude .git --exclude .env.local \
  /Users/alannreyes/proyectos/luxia-page/ \
  app04:/home/alann/luxia-web/

ssh app04 "cd /home/alann/luxia-web && docker compose up -d --build luxia-web"
```

**Para un cambio puntual (ej. un artículo nuevo, un componente)**, es más seguro sincronizar SOLO
los archivos que cambiaron en vez de todo el árbol — evita arrastrar cambios locales sin commitear
de otra sesión activa en este mismo repo:

```bash
rsync -avz <archivo1> <archivo2> app04:/home/alann/luxia-web/<misma-ruta-relativa>/
ssh app04 "cd /home/alann/luxia-web && docker compose up -d --build luxia-web"
```

**NUNCA leer ni sincronizar `.env.local`** (regla de la organización — tiene secretos de producción,
ya vive en el VPS, no se toca desde acá).

## Verificar el deploy

```bash
# El sitio responde con el bundle nuevo (fuerza resolver la IP correcta, por si el DNS local cachea la vieja)
curl -s --resolve luxia.us:443:86.48.21.142 https://luxia.us/es | grep -i "<título o texto que agregaste>"

# El contenedor se recreó de verdad (no quedó corriendo el viejo en silencio tras un build fallido)
ssh app04 "docker ps --format 'table {{.Names}}\t{{.Status}}' | grep luxia-web"
```

## Logs

```bash
ssh app04 "docker logs luxia-web --tail 100"
ssh app04 "docker logs luxia-web -f"
```

## Rollback

No hay rollback automático (no es git-pull based). Si algo se rompe: correr `rsync` de nuevo con la
versión anterior de los archivos afectados (o `git checkout <commit anterior> -- <archivos>` en local
antes de sincronizar), y reconstruir el contenedor otra vez.

## Housekeeping del VPS (hacer de tanto en tanto)

El disco de `app04` se llena con builds viejos:

```bash
ssh app04 "docker builder prune -f && docker image prune -f"
```

---
Última actualización: 2026-08-09 — corregido tras confirmar contra el contenedor vivo (el `DEPLOY.md`
anterior, con VPS `156.67.31.7` y flujo `git pull`, quedó obsoleto desde antes y nunca se corrigió).
