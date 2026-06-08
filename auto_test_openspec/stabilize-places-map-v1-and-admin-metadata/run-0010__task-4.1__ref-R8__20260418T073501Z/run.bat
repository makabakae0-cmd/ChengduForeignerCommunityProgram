@echo off
setlocal

set SCRIPT_DIR=%~dp0
set ROOT_DIR=%SCRIPT_DIR%..\..\..\
set LOG_DIR=%SCRIPT_DIR%logs

if not exist "%LOG_DIR%" mkdir "%LOG_DIR%"

pushd "%ROOT_DIR%"
call openspec validate stabilize-places-map-v1-and-admin-metadata --strict --no-interactive > "%LOG_DIR%\openspec-validate.log" 2>&1
set EXIT_CODE=%ERRORLEVEL%
popd

exit /b %EXIT_CODE%
