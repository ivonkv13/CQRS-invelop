# CQRS-invelop
Interview task for Invelop

# Personal Contacts Management Web App

## Overview
The **Personal Contacts Management Web App** is a full-stack application that allows users to manage personal contacts. It provides basic functionality to **add, update, delete, and list contacts**, with data stored in a database. The project follows modern software development practices, ensuring **good structure, maintainability, and scalability**.

---

## Features
✅ **Contact Management** – Full **CRUD (Create, Read, Update, Delete)** functionality for contacts.  
✅ **Data Persistence** – Uses **Entity Framework Core (EF Core)** to store data in a relational database.  
✅ **Validation** – Implements **FluentValidation** to enforce data validation and business rules.  
✅ **CQRS Architecture** – Separates read and write operations for better performance and maintainability.  
✅ **Rich Domain Model** – Business logic is handled within domain entities rather than spread across services.  
✅ **AutoMapper** – Simplifies data mapping between objects.  
✅ **Global Error Handling** – Ensures consistent and structured error responses.  
✅ **State Management** – Uses **NgRx Store** to manage application state in Angular.  
✅ **UI Components** – Uses **PrimeNG** to provide a clean and user-friendly interface.  
✅ **Automated Testing** – Includes:  
&nbsp;&nbsp;&nbsp;&nbsp;🔹 **xUnit** test for backend functionality.  
&nbsp;&nbsp;&nbsp;&nbsp;🔹 **Cypress** test for end-to-end frontend validation.  

---

## Technology Stack

### 🖥 Backend (ASP.NET Core)
- **.NET Core** – Backend framework.  
- **Entity Framework Core (EF Core)** – ORM for database interaction.  
- **FluentValidation** – Validates input data.  
- **CQRS Pattern** – Separates commands (write operations) from queries (read operations).  
- **Rich Domain Model** – Business logic is contained within domain entities.  
- **AutoMapper** – Handles object mapping between DTOs and domain entities.  
- **Global Error Handling** – Provides centralized error management.  
- **xUnit** – Testing framework for backend functionality.  

### 🌐 Frontend (Angular)
- **Angular** – Frontend framework for building a responsive UI.  
- **NgRx Store** – Manages global state in Angular.  
- **PrimeNG** – Provides UI components.  
- **Cypress** – Used for end-to-end testing.  

---

## Project Structure

📂 **Backend (ASP.NET Core)**  
- **Domain Layer** – Defines business rules and entities.  
- **Application Layer** – Contains CQRS commands and queries.  
- **Infrastructure Layer** – Handles database operations using EF Core.  
- **API Layer** – Exposes REST endpoints for the frontend.  
- **Tests** – Contains **xUnit** tests for backend functionality.  

📂 **Frontend (Angular)**  
- **Components** – UI elements built with **PrimeNG**.  
- **State Management** – **NgRx** for handling global state.  
- **E2E Testing** – **Playwright/Cypress** tests for checking user interactions.  

