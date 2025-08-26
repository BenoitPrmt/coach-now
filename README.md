# CoachNow

[French README 🇫🇷](./README_FR.md)

CoachNow is a web platform for booking sports coaches, allowing anyone to find a qualified coach in just a few clicks, based on their goals and availability.

## 🚀 Tech Stack

### Frontend
- [React](https://react.dev/) (with **TypeScript**)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [pnpm](https://pnpm.io/) for dependency management

### Backend
- [Java Spring Boot](https://spring.io/projects/spring-boot)
- [MySQL](https://www.mysql.com/)
- [Postman](https://www.postman.com/) for API documentation and testing

---

## 👨‍💻 Developers

- **Benoît** — [GitHub](https://github.com/BenoitPrmt)
- **Raphaël** — [GitHub](https://github.com/Raxuis)
- **Kilian** — [GitHub](https://github.com/KilianOlry)

---

## 📦 Installation & Launch

### Prerequisites
- Node.js (v18 or higher recommended)
- pnpm (`npm install -g pnpm`)
- Java 21+
- MySQL

---

## 🖥️ Frontend

### Installation
```
cd frontend
pnpm install
```

### Configuration
1. Duplicate the `.env.example` file as `.env` in the `frontend/` folder.

### Development launch
```
pnpm dev
```

The frontend will be available by default at:  
http://localhost:5173

---

## ⚙️ Backend

### Configuration
1. Create an `application.properties` file in `src/main/resources` with the following configuration, based on this template:

```
spring.application.name=api

spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/coach_now
spring.datasource.username=root
spring.datasource.password=root

server.port=7777

frontend.url=http://localhost:5173

jwt.secret=Q3kKzS7Bywm30ALiIt9OIXZXzCRLrh6vXituqwS1FoM=
jwt.expiration=86400000

spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
```

2. Create your `coach_now` database in PHPMyAdmin.  
→ You can import the `coach_now.sql` file from the `docs/` folder to create the tables with test data. For test accounts, all passwords are `password`.

### Launch
```
./mvnw spring-boot:run
```

The API will be available by default at:  
http://localhost:7777

---

## 📁 Repository Structure

```
/
├── frontend/           → React application (pnpm)
├── api/                → Java Spring Boot application
├── docs/               → SQL exports with example data
└── README.md
```

---

## 📄 License

This project was created for educational purposes.  
All rights reserved to the project authors.
