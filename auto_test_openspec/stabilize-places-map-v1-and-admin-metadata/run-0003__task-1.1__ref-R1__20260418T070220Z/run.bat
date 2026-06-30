@echo off
setlocal

set SCRIPT_DIR=%~dp0
if "%SCRIPT_DIR:~-1%"=="\" set SCRIPT_DIR=%SCRIPT_DIR:~0,-1%
for %%I in ("%SCRIPT_DIR%\..\..\..") do set ROOT_DIR=%%~fI

if not exist "%SCRIPT_DIR%\logs" mkdir "%SCRIPT_DIR%\logs"

pushd "%ROOT_DIR%"
call .\node_modules\.bin\vitest.cmd run packages\shared\test\contracts.spec.ts packages\shared\test\client.spec.ts packages\shared\test\places-marker-contract.spec.ts > "%SCRIPT_DIR%\logs\vitest.log" 2>&1
set EXIT_CODE=%ERRORLEVEL%
type "%SCRIPT_DIR%\logs\vitest.log"
popd

exit /b %EXIT_CODE%
