@echo off
setlocal

set SCRIPT_DIR=%~dp0
if "%SCRIPT_DIR:~-1%"=="\" set SCRIPT_DIR=%SCRIPT_DIR:~0,-1%
for %%I in ("%SCRIPT_DIR%\..\..\..") do set ROOT_DIR=%%~fI

pushd "%ROOT_DIR%\apps\admin"
call .\node_modules\.bin\vite.cmd --host 127.0.0.1 --port 4174
set EXIT_CODE=%ERRORLEVEL%
popd

exit /b %EXIT_CODE%
