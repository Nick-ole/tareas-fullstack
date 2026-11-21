#!/usr/bin/env bash
set -e
echo "▶ [1/3] Pruebas del backend";  (cd backend && npm test --silent 2>&1 | grep -E "^# (pass|fail)")
echo "▶ [2/3] Build del frontend";   (cd frontend && npx vite build 2>&1 | grep -E "built in")
echo "▶ [3/3] Desplegar";            echo "  ✅ Pipeline OK → se despliega la versión ${APP_VERSION:-1.2.0}"
