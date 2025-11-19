# Grievance Reporting System (GRS)

A full-stack web application designed to bridge the gap between citizens and local authorities. This platform allows users to report local issues (such as sanitation, roads, water supply) and track their resolution status, while providing administrators with a robust dashboard to manage and resolve these grievances.

## Features

### User Portal
* **Secure Authentication:** User registration and login with Email Verification.
* **Grievance Submission:** Easy-to-use form to report issues with category selection, location, description, and **image uploads**.
* **Real-time Tracking:** View the status of raised tickets (Pending, In Progress, Resolved).
* **Interactive Communication:** Chat-like comment section to discuss specific tickets with Admins.
* **Glassmorphism UI:** Modern, responsive interface using Tailwind CSS.

### Admin Portal
* **Centralized Dashboard:** Overview of all grievances with statistics (Total, Pending, Resolved).
* **Status Management:** Ability to update ticket status with **automated system comments** logged in the chat history.
* **Conversation History:** View user submissions and reply to queries directly within the ticket view.
* **Evidence Review:** View attached images for validation.

---

## Screenshots

### 1. Sign In
<img width="960" height="497" alt="image" src="https://github.com/user-attachments/assets/05b22315-2b04-4278-87b9-1877ee8e7531" />


### 2. Registration
<img width="960" height="499" alt="image" src="https://github.com/user-attachments/assets/d4a793c5-1974-4342-8177-5407dc693499" />

### 3. User Portal - Home Page
<img width="960" height="501" alt="image" src="https://github.com/user-attachments/assets/20a246f5-fe26-43d4-a8d4-0dd5ec9a135f" />


### 4. User Portal - Status & Tracking
<img width="960" height="501" alt="image" src="https://github.com/user-attachments/assets/aefce310-975d-4d46-bed7-4e3c0c9dc050" />


### 5. Admin Dashboard
<img width="960" height="499" alt="image" src="https://github.com/user-attachments/assets/e0b25229-62d2-433d-9812-0a744bbda0ff" />


---

## Tech Stack

**Frontend:**
* **React.js**: Component-based UI architecture.
* **Tailwind CSS**: For styling and the glassmorphism design system.
* **React Router**: For seamless client-side navigation.

**Backend:**
* **Java Spring Boot**: RESTful API development.
* **Spring Data JPA**: Database interaction and object-relational mapping.
* **Hibernate**: ORM implementation.
* **MS SQL Server**: Relational database management.
* **JavaMailSender**: For sending account verification emails.

---

## Installation & Setup

### Prerequisites
* Java JDK 17+
* Node.js & npm
* MS SQL Server

### 1. Database Setup
Create an MS SQL database named `grs_db` (or update `application.properties` to match your DB name).
```sql```
CREATE DATABASE grs_db;

### 2. Backend Setup (Spring Boot)
* Clone the repository.
* Navigate to the backend directory.
* Update src/main/resources/application.properties with your MS SQL credentials and Email settings.
* Run the application:
Bash

### 3. Frontend Setup (React)
* Navigate to the frontend directory.
* Install dependencies:
* Start the development server:
### The client will run on http://localhost:3000.

## API Endpoints Overview
### Authentication & User Management
| Method | Endpoint | Description |
| :--- | :- | --- |
POST|	/register |	Register a new user
POST	| /login	| User authentication (returns user details)
GET/POST|	/confirm-account?token={token}	| Verify user email address

### Grievances & Comments
| Method | Endpoint | Description |
| :--- | :- | --- |
POST|	/forms/submit	| Submit a new grievance (requires grievance JSON & optional file)
GET	|/forms/all	|Get all grievances (Admin view)
GET	|/forms/user/{userId}	| Get all grievances for a specific user
POST|	/forms/{id}/status	| Update the status of a grievance (Auto-logs comment)
GET	|/forms/files/{filename}	| Retrieve/Download an attached file
GET	|/forms/{formId}/comments	| Fetch all comments for a specific ticket
POST|	/forms/{formId}/comments	| Add a new comment to a ticket
