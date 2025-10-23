# 🎯 MatchHub - Sistema de Gestión de Partidos Amateur

> Proyecto demostrativo full-stack que implementa arquitectura limpia, patrones de diseño y buenas prácticas de desarrollo.

## 📋 Descripción

MatchHub es una aplicación para gestionar partidos de fútbol amateur. Este proyecto fue creado con fines demostrativos para mostrar la implementación de:

- ✅ Arquitectura Limpia (Clean Architecture)
- ✅ Vertical Slice Architecture
- ✅ CQRS + MediatR Pattern
- ✅ Repository Pattern
- ✅ Validaciones con FluentValidation
- ✅ Mapeo con AutoMapper
- ✅ API RESTful con .NET 9
- ✅ Frontend moderno con Next.js 14 + TypeScript
- ✅ Estado global con Redux Toolkit
- ✅ Estilado con Tailwind CSS

---

## 🏗️ Arquitectura del Backend
```
📂 src
├── 📁 Core
│   ├── 📘 MatchHub.Domain              # Entidades y Enums
│   └── 📘 MatchHub.Application         # Casos de uso (CQRS), DTOs, Contracts
├── 📁 Infrastructure
│   └── 📘 MatchHub.Infrastructure      # EF Core, Repositories, DbContext
└── 📁 Presentation
    └── 📘 MatchHub.API                 # Controllers, Middleware, Program.cs
```

### Patrones Implementados

#### **CQRS (Command Query Responsibility Segregation)**
- **Commands**: Operaciones de escritura (Create, Update, Delete)
- **Queries**: Operaciones de lectura (GetAll, GetById)

#### **Vertical Slice Architecture**
Cada feature está autocontenida con:
- Command/Query y Handler (MediatR)
- Validator (FluentValidation)

#### **Repository Pattern**
Abstracción del acceso a datos mediante interfaces en Application e implementaciones en Infrastructure.
---

## 🛠️ Tecnologías

### Backend
- **.NET 9** - Framework principal
- **Entity Framework Core 9** - ORM
- **SQL Server / LocalDB** - Base de datos
- **MediatR** - Implementación de CQRS
- **FluentValidation** - Validaciones
- **AutoMapper** - Mapeo objeto-objeto
- **Swagger/OpenAPI** - Documentación de API

### Frontend
- **Next.js 14** - Framework React
- **TypeScript** - Tipado estático
- **Redux Toolkit** - Gestión de estado
- **Tailwind CSS** - Estilos
- **Axios** - Cliente HTTP
- **React Hook Form** - Manejo de formularios

---

## 🚀 Instalación y Ejecución

### Prerrequisitos

- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [Node.js 18+](https://nodejs.org/)
- [Visual Studio 2022](https://visualstudio.microsoft.com/) o [VS Code](https://code.visualstudio.com/)
- [SQL Server LocalDB](https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/sql-server-express-localdb) (viene con Visual Studio)

### Backend (.NET API)

1. **Clonar el repositorio**
```bash
git clone https://github.com/mequerejeta/MatchHub.git
cd matchhub
```

2. **Configurar la base de datos**

Editar `src/Presentation/MatchHub.API/appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=MatchHubDb;Trusted_Connection=True;MultipleActiveResultSets=true"
  }
}
```

3. **Ejecutar desde Visual Studio**
   - Abrir `MatchHub.sln`
   - Establecer `MatchHub.API` como proyecto de inicio
   - Presionar `F5` o clic en "Run"

   **O desde terminal:**
```bash
   cd src/Presentation/MatchHub.API
   dotnet run
```

4. **Acceder a la documentación**
   - Swagger UI: `https://localhost:7XXX/swagger`
   - OpenAPI: `https://localhost:7XXX/openapi/v1.json`

### Frontend (Next.js)

1. **Instalar dependencias**
```bash
cd frontend
npm install
```

2. **Configurar variables de entorno**

Crear archivo `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```
> ⚠️ Ajustar el puerto según donde corra tu API el proyecto MatchHub.Server

3. **Ejecutar el proyecto**
```bash
npm run dev
```

4. **Acceder a la aplicación**
   - Frontend: `http://localhost:3000`

---

## 📡 Endpoints de la API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/matches` | Obtener todos los partidos |
| GET | `/api/v1/matches/{id}` | Obtener partido por ID |
| POST | `/api/v1/matches` | Crear nuevo partido |
| PATCH | `/api/v1/matches/{id}/result` | Registrar resultado |
| DELETE | `/api/v1/matches/{id}` | Eliminar partido |

### Ejemplo de Request (POST)
```json
{
  "date": "2024-12-25T18:00:00Z",
  "location": "Estadio Monumental",
  "playersPerTeam": 11,
  "teamA": "River Plate",
  "teamB": "Boca Juniors"
}
```

---

## 🗂️ Estructura de Carpetas Completa
```
MatchHub.Server/
├── src/
│   ├── Core/
│   │   ├── MatchHub.Domain/
│   │   │   ├── Entities/
│   │   │   │   └── Match.cs
│   │   │   └── Enums/
│   │   │       └── MatchStatus.cs
│   │   └── MatchHub.Application/
│   │       ├── Interfaces/
│   │       │   └── IMatchRepository.cs
│   │       ├── DTOs/
│   │       │   └── MatchDto.cs
│   │       ├── Features/
│   │       │   └── Matches/
│   │       │       ├── Commands/
│   │       │       │   ├── CreateMatch/
│   │       │       │   ├── RegisterResult/
│   │       │       │   └── DeleteMatch/
│   │       │       ├── Queries/
│   │       │       │   ├── GetAllMatches/
│   │       │       │   └── GetMatchById/
│   │       │       ├── Requests/
│   │       │       │   ├── CreateMatchRequest.cs
│   │       │       │   └── RegisterResultRequest.cs
│   │       │       └── Validators/
│   │       │       │   └── CreateMatchRequestValidator.cs
│   │       ├── Mappings/
│   │       │   └── MappingProfile.cs
│   │       ├── Behaviors/
│   │       │   └── ValidationBehavior.cs
│   │       └── DependencyInjection.cs
│   ├── Infrastructure/
│   │   └── MatchHub.Infrastructure/
│   │       ├── Data/
│   │       │   ├── MatchDbContext.cs
│   │       │   └── MatchDbContextSeed.cs
│   │       ├── Repositories/
│   │       │   └── MatchRepository.cs
│   │       └── DependencyInjection.cs
│   └── Presentation/
│       └── MatchHub.API/
│           ├── Controllers/
│           │   └── V1/
│           │       └── MatchesController.cs
│           ├── Middleware/
│           │   └── ExceptionHandlingMiddleware.cs
│           ├── Program.cs
│           └── appsettings.json
MatchHub.Client (frontend)
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── utils/
│   │   ├── public/
│   │   ├── store/
│   ├── package.json
│   └── .env.local
└── README.md
```

---
## 🧪 Testing

```bash
cd tests
dotnet test
```
---
## 📚 Conceptos Demostrados

### Backend
- **Separation of Concerns**: Cada capa tiene una responsabilidad específica
- **Dependency Inversion**: Las dependencias apuntan hacia abstracciones
- **Single Responsibility**: Cada handler hace una sola cosa
- **Open/Closed**: Extensible sin modificar código existente
- **Interface Segregation**: Interfaces específicas y pequeñas

### Frontend
- **Component Composition**: Componentes reutilizables
- **State Management**: Redux Toolkit para estado global
- **Type Safety**: TypeScript en todo el código
- **Performance**: Server Components y optimizaciones de Next.js
- **User Experience**: Loading states, error handling, feedback visual

---

## 🔧 Configuración de Desarrollo

### Configurar CORS (si es necesario)

En `Program.cs`:
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyMethod()
              .AllowAnyHeader());
});
```

### Seed Data

El proyecto incluye datos de ejemplo que se insertan automáticamente al iniciar la aplicación. Ver `MatchDbContextSeed.cs`.

---

## 🤝 Contribuciones

Este es un proyecto demostrativo. Si encontrás mejoras o sugerencias:

1. Fork el proyecto
2. Crear una rama (`git checkout -b feature/mejora`)
3. Commit cambios (`git commit -m 'Add: nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/mejora`)
5. Abrir un Pull Request

---

## 📝 Licencia

Este proyecto es de código abierto con fines educativos.

---

## 👤 Autor

**Tu Nombre**
- GitHub: [@mequerejeta](https://github.com/mequerejeta)
- LinkedIn: [mquerejeta](https://linkedin.com/in/mquerejeta)

---
Proyecto creado como demostración de arquitectura limpia y buenas prácticas en desarrollo full-stack.
---

## 🐛 Troubleshooting

### Error: "Unable to connect to SQL Server"
- Verificá que SQL Server LocalDB esté instalado
- O cambiá el connection string a usar SQL Server Express

### Error: "Port already in use"
- Cambiá el puerto en `launchSettings.json` (backend)
- O en `package.json` (frontend)

### Frontend no conecta con Backend
- Verificá que `NEXT_PUBLIC_API_URL` tenga el puerto correcto
- Verificá que CORS esté configurado correctamente

⭐ Si te gustó el proyecto, dale una estrella en GitHub!
