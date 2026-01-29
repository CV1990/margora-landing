# Subir cambios a https://github.com/CV1990/margora-landing.git
# Ejecutar en PowerShell: .\push-to-github.ps1

Set-Location $PSScriptRoot

Write-Host "Verificando estado de Git..." -ForegroundColor Cyan
git status

Write-Host "`nSubiendo a origin master..." -ForegroundColor Cyan
git push -u origin master

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nListo. Cambios subidos a GitHub." -ForegroundColor Green
} else {
    Write-Host "`nError al hacer push. Revisa:" -ForegroundColor Red
    Write-Host "  - Conexion a internet"
    Write-Host "  - git config http.proxy / https.proxy (quitar si no usas proxy)"
    Write-Host "  - Credenciales: usuario + Personal Access Token en lugar de password"
}
