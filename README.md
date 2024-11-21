# Shopper Ride

## Descrição
Aplicação de transporte particular com estimativa, confirmação e histórico de viagens.

## Tecnologias
- Backend: Node.js, TypeScript
- Frontend: React, TypeScript
- Containerização: Docker

## Pré-requisitos
- Docker
- Docker Compose
- Chave da API do Google Maps

## Instalação
1. Clone o repositório
2. Configure a variável GOOGLE_API_KEY no .env
3. Execute `docker-compose up`

## Endpoints
- POST /ride/estimate
- PATCH /ride/confirm
- GET /ride/{customer_id}  
