# ProjectSeyte
### Requisitos
Tecnologías utilizadas
-	**Docker y Docker Compose**
-	**Backend:** Api REST con Laravel 9.52.15
-	**Frontend:** Angular 16.2.0
-	**Base de datos:** MySQL
### Contenedor de Docker
-	**App:** Servicio que con tiene PHP 8.0 y la Api REST con Laravel
-	**Nginx:** Servicio que contiene el servidor web.
-	**MySQL 5.7:** Servicio de base de datos.
-	**phpMyAdmin:** Servicio que contiene dicha herramienta para manejar la administración de la base de datos.
### Funcionalidades
-	**Gestión de clientes:** Permite visualizar, crear, editar y buscar clientes por razón social y por municipio.
-	**Gestión de programadores de riego:** Permite visualizar, crear y buscar programadores de riego por modelo.
-	**Sensores:** Permite visualizar, crear y buscar sensores por nombre de la sonda.
-	**Medidas:** Permite visualizar, crear y buscar sensores por fecha de la medida.
## Instrucciones de despliegue
### Requisitos
Debemos tener instalado Docker junto con Docker compose.
### Despliegue
En el primer lugar debemos crear el fichero .env en la carpeta backend que contenga las credenciales a la base de datos, ya que en ese fichero están las credenciales y no se sube al repositorio de git.
A continuación, para el primer despliegue ejecutamos los siguientes comandos, uno detrás de otro:
**En la carpeta backend ejecutamos en consola los comandos:**
-	**composer install** (Instala compose, herramienta de gestión de dependencias de PHP).
-	**docker-compose up -d** (Crea el contenedor y levanta los servicios en Docker).
-	**php artisan migrate** (Ejecuta las migraciones en la base de datos).
-	**php artisan db:seed** --class=ClientesSeeder (Ejecuta el seeder que insertan en la base de datos 1000 clientes).
-	**php artisan db:seed** --class=ProgramadoresRiegoSeeder (Ejecuta el seeder que insertan en la base de datos 30.000 programadores de riego (30 por cliente)).
-	**php artisan db:seed** --class=SensoresSeeder (Ejecuta el seeder que insertan en la base de datos120.000 sensores (4 por cada programador de riego)).
-	**php artisan db:seed** --class=MedidasSeeder (Ejecuta el seeder que insertan en la base de datos1.200.000 medidas (1000 por cada sensor)).
En este caso aconsejaría que se cambien en el seeder de clientes a 10, como venía en la especificación inicial antes del cambio, ya que, si no tarda muchísimo en ejecutar el seeder de medidas, aun una vez se hace funciona bien la aplicación.
Se quedaría en 10 clientes, 300 programadores de riego (30 por cliente), 1.2000 sensores (4 por cada programador de riego) y 1.200.000 medidas (1000 por cada sensor).
-	**php artisan serve** (Ejecuta el servidor de Laravel en http://127.0.0.1:8000).
**En la carpeta fronted ejecutamos en consola los comandos:**
-	**mpm install** (Instala npm, el gestor de paquetes por defecto de Node.js).
-	**ng serve** (Ejecuta el servidor de Angular en http://localhost:4200/).
### Accesos
-	Url del Frontend:
http://localhost:4200/
-	Acceso a la base de datos con phpMyAdmin:
http://localhost:8082/index.php?route=/database/structure&db=laravel
-	Url de la API es:
http://127.0.0.1:8000/api/
