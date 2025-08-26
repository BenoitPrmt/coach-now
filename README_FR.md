# CoachNow

CoachNow est une plateforme web de réservation de coachs sportifs, permettant à chacun de trouver un coach qualifié en quelques clics, selon ses objectifs et sa disponibilité.

## 🚀 Stack Technique

### Frontend
- [React](https://react.dev/) (avec **TypeScript**)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [pnpm](https://pnpm.io/) pour la gestion des dépendances

### Backend
- [Java Spring Boot](https://spring.io/projects/spring-boot)
- [MySQL](https://www.mysql.com/)
- [Postman](https://www.postman.com/) pour la documentation et les tests de l'API

---

## 👨‍💻 Développeurs

- **Benoît** — [GitHub](https://github.com/BenoitPrmt)
- **Raphaël** — [GitHub](https://github.com/Raxuis)
- **Kilian** — [GitHub](https://github.com/KilianOlry)

---

## 📦 Installation & Lancement

### Prérequis
- Node.js (v18 ou supérieur recommandé)
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
1. Dupliquez le fichier `.env.example` en `.env` dans le dossier `frontend/`.


### Lancement en développement
```
pnpm dev
```

Le frontend sera disponible par défaut sur :
http://localhost:5173

---

## ⚙️ Backend

### Configuration
1. Crée un fichier `application.properties` dans `src/main/resources` avec les informations de configuration, en partant de ce modèle :

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

2. Créez votre base de donnée `coach_now` dans PHPMyAdmin.
<br>→ Vous pouvez importer le fichier `coach_now.sql` depuis le dossier `docs/` pour créer les tables avec les données de test. Pour les comptes de test, tous les mots de passe sont `password`.

### Lancement
```
./mvnw spring-boot:run
```

L'API sera disponible par défaut sur :
http://localhost:7777

---

## 📁 Structure du repo

```
/
├── frontend/           → Application React (pnpm)
├── api/                → Application Java Spring Boot
├── docs/               → Exports SQL avec les données d'exemple
└── README.md
```

---

## 📄 Licence

Ce projet a été réalisé dans un cadre pédagogique.
Tous droits réservés aux auteurs du projet.
