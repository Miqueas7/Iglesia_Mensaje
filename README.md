# EsperanzaHoy • Despliegue con Docker (Caddy)

Dominio: **iglesia.miqueas.dev**

## Requisitos
- DNS: registro **A** -> IP del VPS
- Puertos 80/443 abiertos
- Docker y Docker Compose instalados

## Pasos
```bash
# Copia la carpeta al servidor (ejemplo)
scp -r esperanzahoy-deploy/ usuario@IP:/opt/esperanzahoy

# Entra al servidor
ssh usuario@IP
cd /opt/esperanzahoy

# Levanta HTTPS automático (Let's Encrypt) con Caddy
docker compose up -d

# Logs en vivo
docker compose logs -f web
```

## Actualizar el contenido del sitio
Copia tus archivos dentro de `site/` y reinicia:
```bash
docker compose restart web
```

## Generar nuevos QR
```bash
cd /opt/esperanzahoy/qr
docker build -t qrgen .
docker run --rm -v "$PWD:/work" qrgen "https://iglesia.miqueas.dev" "qr-iglesia"
docker run --rm -v "$PWD:/work" qrgen "https://iglesia.miqueas.dev?campaña=navidad" "qr-navidad"
```
Los PNG/SVG quedan en `qr/`.
