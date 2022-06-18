FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

# copy all the layers' csproj files into respective folders
COPY ["./PDSACW.Application/PDSACW.Application.csproj", "src/PDSACW.Application/"]
COPY ["./PDSACW.Domain/PDSACW.Domain.csproj", "src/PDSACW.Domain/"]
COPY ["./PDSACW.Infrastructure/PDSACW.Infrastructure.csproj", "src/PDSACW.Infrastructure/"]
COPY ["./PDSACW.WebApi/PDSACW.WebApi.csproj", "src/PDSACW.WebApi/"]

# run restore over API project - this pulls restore over the dependent projects as well
RUN dotnet restore "src/PDSACW.WebApi/PDSACW.WebApi.csproj"

COPY . .

# run build over the API project
WORKDIR "/src/PDSACW.WebApi/"
RUN dotnet build -c Release -o /app/build

# run publish over the API project
FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

FROM base AS runtime
WORKDIR /app

COPY --from=publish /app/publish .
RUN ls -l
ENTRYPOINT [ "dotnet", "PDSACW.WebApi.dll" ]