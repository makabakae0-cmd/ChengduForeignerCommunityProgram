@echo off
setlocal

set SCRIPT_DIR=%~dp0
set ROOT_DIR=%SCRIPT_DIR%..\..\..\
set LOG_DIR=%SCRIPT_DIR%logs

if not exist "%LOG_DIR%" mkdir "%LOG_DIR%"

pushd "%ROOT_DIR%"
call apps\mobile\node_modules\.bin\vue-tsc -p apps/mobile/tsconfig.json --noEmit > "%LOG_DIR%\mobile-typecheck.log" 2>&1
set EXIT_CODE=%ERRORLEVEL%
popd

exit /b %EXIT_CODE%
