#!/usr/bin/env bash
set -euo pipefail

SITE=/etc/nginx/sites-available/sso.massdata.ae
CERT=/etc/letsencrypt/live/massdata.ae/fullchain.pem
KEY=/etc/letsencrypt/live/massdata.ae/privkey.pem

sudo tee "$SITE" >/dev/null <<'NGINX'
server {
    listen 80;
    listen [::]:80;
    server_name sso.massdata.ae;

    location / {
        proxy_pass http://127.0.0.1:8081;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Proto https;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name sso.massdata.ae;

    ssl_certificate /etc/letsencrypt/live/massdata.ae/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/massdata.ae/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_pass http://127.0.0.1:8081;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Proto https;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
NGINX

if [ ! -f "$CERT" ] || [ ! -f "$KEY" ]; then
  echo "Missing existing TLS certificate files:"
  echo "  $CERT"
  echo "  $KEY"
  echo "Create or install a certificate first, then rerun this script."
  exit 1
fi

sudo ln -sf "$SITE" /etc/nginx/sites-enabled/sso.massdata.ae
sudo nginx -t
sudo systemctl reload nginx

echo "nginx is now proxying https://sso.massdata.ae to ZITADEL."
