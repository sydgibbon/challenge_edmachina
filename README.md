# EdMachina Challenge
## Descripción

Este repositorio contiene un proyecto de inscripción de leads, asociados a una materia y con información del año de inscripción y las veces cursada. El mismo consiste de un docker compose con un formulario realizado en react, un backend realizado en FastAPI y una base de datos Postgres.

## Prerrequisitos

Para correr este proyecto se necesita:
 -  Instalar [docker](https://docs.docker.com/get-started/get-docker/) y [docker compose](https://docs.docker.com/compose/install/) en su sistema
 - Tener libres los puertos 3000, 8000 y 5432

## Uso

Abrir una terminal en la carpeta del repositorio y correr el siguiente comando

```
docker compose up --build
```
ó para versiones más viejas de docker
```
docker-compose up --build
```



## Frontend

El formulario de frontend fue realizado en react v18 con la versión de nodejs 22 de fondo. El proyecto utiliza las librerias Material UI, axios y yup para su funcionamiento. Puede acceder al mismo accediendo a su puerto local 3000 luego de levantar el proyecto
```
http://localhost:3000/
```

## Backend

El backend fue creado en FastAPI con librerías como pydantic, sqlalchemy y pytest para la correcta implementación de patrones DAO, DTO y tests unitarios. Puede acceder al mismo accediendo a su puerto local 8000
```
http://localhost:8000/docs
```
También puede ejecutar los tests unitarios con el siguiente comando
```
 docker exec challenge_edmachina-fastapi-1 pytest
```

El proyecto viene precargado con data inicial,  y  dado a que los leads se identifican por su email los siguientes mails retornarán un error al intentar inscribir un alumno
```
sydneygibbon@edmachina.com
laramontes@edmachina.com
juanbonbonsai@edmachina.com
diana@edmachina.com
```

## Contacto

Sydney Gibbon - [linkedin.com/in/sydgibbon](https://www.linkedin.com/in/sydgibbon/) - sydneymackgibbon@gmail.com

Link del proyecto: [https://github.com/sydgibbon/challenge_edmachina](https://github.com/sydgibbon/challenge_edmachina)