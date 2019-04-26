Fake server criado para simular uma resposta rest.

Instruções:

1) instalar o serviço
> npm install -g json-server

2) criar um arquivo db.json com a simulação da resposta:

3) executar o serviço:
> json-server --watch db.json

Ex do arquivo:

{
            "products": [
                {
                "id": 1,
                "name": "Product001",
                "cost": 10.0,
                "quantity": 1000,
                "locationId" : 1,
                "familyId" : 1
                },
                {
                "id": 2,
                "name": "Product002",
                "cost": 20.0,
                "quantity": 2000,
                "locationId" : 1,
                "familyId" : 2
                },   
                {
                "id": 3,
                "name": "Product003",
                "cost": 30.0,
                "quantity": 3000,
                "locationId" : 3,
                "familyId" : 2     
                },
                {
                "id": 4,
                "name": "Product004",
                "cost": 40.0,
                "quantity": 4000,
                "locationId" : 2,
                "familyId" : 3
                }
            ],
            "locations":[
                {
                "id": 1,
                "name": "Location001"
                },
                {
                "id": 2,
                "name": "Location002"
                },
                {
                "id": 3,
                "name": "Location003"
                }
            ],
            "families":[
                {
                "id": 1,
                "name": "FM001"
                },
                {
                "id": 2,
                "name": "FM002"
                },
                {
                "id": 3,
                "name": "FM003"
                }
            ],
            "transactions":[
                {
                "id": 1,
                "cost":11,
                "quantity":10,
                "productId":1
                },
                {
                "id": 2,
                "cost":12,
                "quantity":100,
                "productId":2
                },    
                {
                "id": 3,
                "cost":15,
                "quantity":101,
                "productId":3
                }  
            ]
            }
