@echo off

docker rm -f cruisehousing-document-service >nul 2>nul

docker build -t cruisehousing-document-service .

docker run -d ^
  --name cruisehousing-document-service ^
  -p 127.0.0.1:8001:8000 ^
  -v %cd%\app\output:/service/app/output ^
  -v %cd%\app\templates:/service/app/templates ^
  cruisehousing-document-service

echo DocumentService started at http://127.0.0.1:8001
pause