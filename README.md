# Prueba Tecnica para ingeniero Full Stack Adres

Este es el repositorio para la parte Backend de la prueba técnica, para el puesto de ingeniero Full Stack. 

Para probar esta parte del proyecto, siga los siguientes pasos: 

- Clone o haga Fork al repositorio (si requiere permisos, no dude en solicitarlos)

- Vaya a la carpeta del proyecto e instale las dependencias requeridas con el comando `npm install`

- El repositorio cuenta con una base de datos de PostgreSql montada en un servicio de docker. Compruebe que tiene instalado Docker en su equipo. 

- Abra la aplicación de Docker.

- Ubicado en la carpeta del proyecto, puede subir el servicio de la base de datos con el comando `docker-compose up -d postgres` 

- De manera opcional, hay un manejador visual de bases de datos montado en otro servicio de docker. Si desea visualizar la base de datos con pgAdmin, ejecute el comando `docker-compose up -d pgaadmin`

- Por último, para ejecutar el backend en modo de desarrollo, ejecute el comando `npm run dev`

