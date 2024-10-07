# Fullstack Kanban Task Management Web App

This is a solution to the Fullstack Spring Boot and React challenge on [Frontend Mentor](https://www.frontendmentor.io). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of Contents

- [Overview](#overview)
  - [The Challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [Built With](#built-with)
- [Useful Resources](#useful-resources)
- [Author](#author)

## Overview

### The Challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size.
- See hover states for all interactive elements on the page.
- Create, read, update, and delete boards and tasks.
- Receive form validations when trying to create/edit boards and tasks.
- Mark subtasks as complete and move tasks between columns.
- Hide/show the board sidebar.

### Expected Behavior

#### Boards

- Clicking different boards in the sidebar will switch to the selected board.
- Clicking "Create New Board" in the sidebar opens the "Add New Board" modal.
- Clicking "Edit Board" in the dropdown menu opens the "Edit Board" modal where details can be changed.
- Columns can be added or removed in the Add/Edit Board modals.
- Deleting a board removes all its columns and tasks, requiring confirmation.

#### Columns

- A board needs at least one column before tasks can be added. If no columns exist, the "Add New Task" button in the header is disabled.
- Clicking "Add New Column" opens the "Edit Board" modal where columns are added.

#### Tasks

- Adding a new task places it at the bottom of the relevant column.
- Updating a task's status moves the task to the relevant column.
  
#### Bonus Features:

- Tasks can be dragged and dropped to a new column.

### Screenshot
![Task Management App Screenshot] Light Theme
<img width="1680" alt="Screenshot 2024-10-07 at 11 05 20 AM" src="https://github.com/user-attachments/assets/e057a0d9-ba21-4efc-9453-785423992854">

![Task Management App Screenshot] Dark Theme
<img width="1674" alt="Screenshot 2024-10-07 at 11 06 14 AM" src="https://github.com/user-attachments/assets/15a12469-2c97-442f-a756-ce44b6a8fedd">


![Task Management App Screenshot] Add New Group
<img width="1680" alt="Screenshot 2024-10-07 at 11 06 03 AM" src="https://github.com/user-attachments/assets/9c448ccc-a05c-4183-bb53-8a8e43db5046">


![Task Management App Screenshot] Add New Task
<img width="1680" alt="Screenshot 2024-10-07 at 11 05 55 AM" src="https://github.com/user-attachments/assets/ea6dbb30-bde0-47ad-8668-e0fd950c8e59">


### Links

- Live Site URL: [fullstack-task-management-i3u4.onrender.com](https://fullstack-task-management-i3u4.onrender.com/)

## Built With

- [TailwindCSS](https://tailwindcss.com/) - CSS Framework
- [Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) - For drag-and-drop functionality
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Redux](https://redux.js.org/) - State management tool

## Backend

- [Spring Boot](https://spring.io/projects/spring-boot) - Java framework for building backend APIs
- [PostgreSQL](https://www.postgresql.org/) - Relational database for storing boards, tasks, columns, and user data
- [JWT](https://jwt.io/) - JSON Web Token for authentication and secure API endpoints
- RESTful API design for Create, Read, Update, and Delete (CRUD) operations on boards, tasks, and columns.

### Key Features:

- Secure user authentication and authorization using JWT.
- API for managing boards, columns, tasks, and subtasks.
- Form validation and error handling for task and board management.

## Useful Resources

- [Drag and Drop API Quick Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) - A great resource to understand the fundamentals of drag and drop.

  
  
## Author

- LinkedIn - [Shrikant Patil](https://www.linkedin.com/in/shrikant-patil-8a242541/)
