---
### Multi Stage Build

Multi Stage Builds are useful for optimizing the dockerfiles while keeping them easy to read and maintain. 

Usually by having the builder where all the dependencies and required libraries are installed then the production level stage where all the installed libraries are copied from the base stage to production stage. They are commonly used to optimize the size of the docker image. 

Name your build stages as 
```dockerfile
FROM apline:3.23 AS build
```

When building the docker image you can stop the image building at the specified build stage. 
```bash
docker build --target stagename -t hello .
```
the stagename is specified using the `--target` in the docker build command. 

Here is the example of the dockerfile for the dotnet core: 
```dockerfile
# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081


# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["application-mvc.csproj", "."]
RUN dotnet restore "./application-mvc.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "./application-mvc.csproj" -c $BUILD_CONFIGURATION -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./application-mvc.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "application-mvc.dll"]
```
