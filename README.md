# Challenge-01

# Challenge 01 - Web Musical Estática en AWS S3

## Objetivo del proyecto
El objetivo de este proyecto es crear y desplegar una página web estática de temática musical alojada íntegramente en un bucket de **Amazon S3**. La infraestructura en AWS se gestiona y provisiona de forma automatizada (Infraestructura como Código) utilizando **Terraform**.

## Estructura del repositorio
La relación entre los archivos de la raíz y la carpeta principal es la siguiente:

* **`/proyecto-web/`**: Contiene todo el código de la página web estática separando la estructura, los estilos y la lógica (`index.html`, carpeta `/css/` y carpeta `/js/`).
* **`proyecto-web/main.tf`**: Archivo de Terraform que define de forma declarativa la infraestructura de AWS. Se encarga de:
  1. Crear el bucket de S3.
  2. Configurar el bucket para que actúe como alojamiento web estático (`index.html`).
  3. Desactivar el bloqueo de acceso público de AWS.
  4. Aplicar una política que permite la lectura pública de los objetos a cualquier usuario.
* **`evidencia.md`**: Historial de comandos ejecutados en la consola para garantizar la trazabilidad y reproducibilidad del despliegue.
* **`web.txt`**: Archivo que contiene la URL pública final de la página web.

## Pasos para el despliegue
Para reproducir esta infraestructura y desplegar la web, se deben ejecutar los siguientes comandos mediante la consola de AWS CLI y Terraform:

```bash
# 1. Acceder al directorio del proyecto
cd proyecto-web/

# 2. Inicializar Terraform (descarga los plugins de AWS)
terraform init

# 3. Validar que la sintaxis de Terraform es correcta
terraform validate

# 4. Planificar los cambios para ver qué recursos se van a crear
terraform plan

# 5. Aplicar los cambios y desplegar la infraestructura en AWS (responder 'yes' cuando pregunte)
terraform apply

# 6. Sincronizar (subir) los archivos web de la carpeta actual al bucket recién creado
aws s3 sync . s3://bucket-challenge-musica-01/


Puedes visitar la página web desplegada en el siguiente enlace:
http://bucket-challenge-musica-01.s3-website-us-east-1.amazonaws.com