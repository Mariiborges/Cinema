# 📚 Cinema

## 🧾 Descrição

Esta API tem como objetivo simular a operação completa de um site de cinema. A aplicação permite realizar operações de cadastro, consulta, atualização e exclusão (CRUD) para os principais recursos do sistema, proporcionando uma base sólida para aplicações web.

---

## 👥 Integrante

- Maria Clara da Silva dos Santos - [usuario Github](https://github.com/Mariiborges)

---

## 🛠️ Tecnologias Utilizadas

- **Linguagem:** C# (.NET 8)
- **Framework:** ASP.NET Core
- **ORM:** Entity Framework Core
- **Banco de Dados:** MySQL
- **Linguagem - Frontend:** JavaScript
- **Framework - Frontend:** React
- **Versionamento:** Git + GitHub

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- [.NET SDK 8.0+](https://dotnet.microsoft.com/en-us/download)
- MySQL instalado
- Git instalado
- dotnet add package Microsoft.EntityFrameworkCore --version 7.0.7
- dotnet add package Microsoft.EntityFrameworkCore.Tools --version 7.0.7
- dotnet add package Pomelo.EntityFrameworkCore.MySql --version 7.0.0
- Node JS (https://nodejs.org/pt)
- npm install antd
- npm install @ant-design/icons

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/Mariiborges/Cinema.git

# 2. Acesse a pasta do projeto
cd .\Cinema\Cinema

# 3. Para baixar o pacote EntityFrameworkCore,execute os seguintes comandos:
dotnet add package Microsoft.EntityFrameworkCore --version 7.0.7
dotnet add package Microsoft.EntityFrameworkCore.Tools --version 7.0.7
dotnet add package Pomelo.EntityFrameworkCore.MySql --version 7.0.0

# 4. Atualize a senha do Banco de Dados no seguinte arquivo:
cd .\Cinema\Cinema\Data\Banco.cs

# 5. Execute o Migrations no terminal:
dotnet ef migrations add InitialCreate
dotnet ef database update

# 6. Rode o Backend
dotnet run

# 7. Abra um novo terminal e acesse a pasta do frontend
 cd .\frontend\

# 8. Baixe React, com os seguintes comandos no terminal:
npm install antd
npm install @ant-design/icons

# 9. Rode o Frontend
npm start  


