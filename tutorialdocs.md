## Docker Compose

Docker compose to run the multiple Services in a single command by just defining the port, environment variables, etc. 

Hence we no need to run the multiple `docker` `run` command to run each container. Instead in Docker Compose you just define the services. 

*Syntax:*
```yaml
name: compose-name
services: 
	service-name
```
These two lines are always present in the docker compose. 

For Intellisense regarding the docker compose download and install the extension of the docker for the docker compose. 

The file name must contain the `docker-compose.yaml` While running the docker compose you can define which file to run. 

Consider to run the **PgAdmin** and **Postgres** db server you need to run the docker run command for each time hence it will unable to understand so to define it we will use the docker compose. 

```yaml
# Name for docker compose
name: DockerCompose
# Define the Services :
services:
  # define the service name : Docker will communicate with these service name
  postgres:
    # container name for the service
    container_name: postgres-db
    # Image to use for the service
    image: postgres:17-alpine
    # ports  to expose on host and container which is listening on the container
    ports:
      - "5432:5432"
    annotations:
      description: "Postgresql database service"
    # Configure the Environment Variables for the service
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: mydatabase

  # Define the another service
  pgweb:
    container_name: pgweb
    restart: always
    image: sosedoff/pgweb
    ports:
      - "8081:8081"
    links:
      - postgres:postgres # my database container is called postgres, not db
    environment:
      - DATABASE_URL=postgres://postgres:postgres@postgres:5432/mydatabase?sslmode=disable
    depends_on:
      postgres:
        condition: service_started

```
Here is the Sample Docker compose file we created where we defined the Postgres and Pgweb to view the database records. 

To run the Docker Compose
```bash
docker compose up -d
```
`-d` to run in the detach mode. 
It also accepts the file to which file to run
```bash
docker compose -f dockercompose.yaml up -d
```
When the container names are not provided they will create the container with the random name using the service name. Each docker compose creates the default network. 

To down all the Services present in the Docker compose
```bash
docker compose down
```
## Creating the Dockerfile

You created an application which is working now you want to packages these application and able to prepare to deploy in any environment. 

To build the docker image for the application need to copy the artifact like jar or dist folder. 

Create the file name with `Dockerfile`. How to build the image is defined in these file. 
*Syntax:*
```dockerfile
# Image to consider as the base
FROM baseimage

# Set the Env value
ENV ENVKEY=value

# Run command (execute the linux command)
RUN command

# Executes on the host machine 
COPY source destination

# Start the app (Entry Point command)
CMD [command]
```
The image is basically the blueprint for building the image. 

Every base image is based on the image. 

Build the Image from the docker file
```bash
docker build -t imagename:tag . 
```
### DockerIgnore
The `.dockerignore`file  is used to exclude the files and folder from the build context. Similar concept to avoid pushing into the git repository we use the `.gitignore` similar we can use the `.dockerignore` to ignore the listed directories or files. 

**Example:**
```.dockerignore
node_modules
bar
```

Here is the format of the docker file
```dockerfile
INSTRUCTION arguments
```
the instruction must be UpperCase only. 
The docker file supports the following Most used Instructions: 
#### Comments
In the dockerfile comments are defined using the `#`
**Example:**
```dockerfile
# comment in the dockerfile
```
#### FROM
These instruction sets the base image. The base image must be official images. Every docker file must start with the `FROM`instruction only. 
```dockerfile
FROM python:3.14-alpine3.23
```
#### LABEL
Add the labels to your image to organize images by project or licensing information. The Image can have more than one label. It is recommended to combine all labels into a single `LABEL`, to prevent extra layers from being created. 
```dockerfile
LABEL com.example.author="Prathamesh" \
      com.example.description="A simple Flask application" \
      com.example.version=1.0 \
      com.example.license="MIT" \
      tutorial="flask"
```
#### RUN
These instruction will execute any commands to create a new layer on top of the current image. The added layer is used in the next step in the Dockerfile. 
```dockerfile
RUN echo "Hello World"
RUN pip install --no-cache-dir uv
```
#### CMD
These instruction must be used to run the software contained in your image. Along with any arguments. It must be used in the form of `["arg1", "arg2", "arg3"]`. 
However there are difference between `ENTRYPOINT` and `CMD`. 
#### EXPOSE
These indicates the ports on which a container listens for connections. By default these instruction exposes only the TCP Port. 
```dockerfile
EXPOSE 80/tcp
EXPOSE 80/udp
```
You can expose as many port you want. 
#### ENV
These instruction is used to set the Environment variable in the Package. 
```dockerfile
ENV FLASK_APP=app.py
ENV FLASK_ENV=development
```
#### ADD or COPY
These two instructions functionality are similar. The `COPY`supports basic copying of files into the container from the build context or from a stage.  `ADD` supports feature for fetching files from remote HTTPS and Git urls, and extracting tar fiels automatically when adding files from the build context. 

- `COPY`: To copy file from one stage to another
- `ADD`: Download a remote artifact as part of your build. 
```dockerfile
ADD https://astral.sh/uv/0.11.24/install.sh /uv-installer.sh
```