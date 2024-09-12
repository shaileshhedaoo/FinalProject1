DoConnect Application
=====================  

DoConnect is a Q & A application in which users can ask questions and answer questions asked by other users. Users can also upload images to questions and answers for reference. It allows users to search questions based on a particular topic or by a query string. It informs admins via email whenever a new question or answer is added to DoConnect. It allows admins to approve / delete questions and approve / delete answers and manage users. It allows users to chat with other users. JWT is used for user authentication and authorization.

## Introduction

* DoConnect is a Q & A application in which users can ask questions and those questions can be answered by other users.
* DoConnect also allows users to chat with each other on a group chat.
* The application supports users with two different roles: User and Admin.
* The admins are informed via email whenever a new question or answer is added by a user.
* Admins can either approve or delete the newly added questions or answers by a user.
* Admins can also manage other users on the application.
* DoConnect Application is developed using Angular, Spring Boot and MySQL.
* There is no restriction as to how many admins are supported.

## Objectives

* Provide a platform to users where they can freely ask and answer questions on a wide range of topics.
* Provide a platform to users where they can filter questions on certain topics or by a query string.
* Provide support for Admins to monitor the platform so that users do not abuse it; by allowing Admins to approve or delete any question or answer, a user submits.
* Create a User experience where users can achieve their target action with minimal effort.
* Provide a responsive UI which supports multiple screen sizes and is mobile friendly.
* Provide secure access to the platform by use of JWT.
* Provide users an ability to chat with other users.
* Provide users an ability to add images to questions and answers for reference.
* Keep admins up to date with their approval queues by sending them email whenever a new question or answer is added to the platform by any user.

## Sequence Diagram

![Sequence Diagram](./assets/sequence_diagram.png)  

## Entity-Relationship Model

![Entity-Relationship Model](./assets/entity_relationship_model.png)  

## Class Diagram

![Class Diagram](./assets/class_diagram.png)  

## Use Case Diagram

![Use Case Diagram](./assets/use_case_diagram.jpg)  

## Technologies Used  

### Frontend

* Angular
* TypeScript
* Node JS
* NPM for managing packages
* VSCode (IDE)
* Angular CLI
* Bootstrap 5 (for styling pages)
* HTML5
* CSS
* JWT (for authentication)

### Backend

* Spring Boot
* Spring Data JPA
* Spring Boot Starter Mail
* Maven for managing packages
* Java JDK
* Tomcat Server
* MySQL Database
* JWT (for authentication and authorization)

## Microservices

### DoConnect Main Microservice

Responsible for:
* User authentication and authorization
* Storing and retrieving questions, answers, 
users and images.
* Sending email to admins.  

Available Controllers:
* AnswerController
* AuthenticationController
* ChatController
* ImageController
* QuestionController
* UserController

### DoConnect Chat Microservice

Responsible for:
* Storing and retrieving user group chats.

Available Controller:
* MessageController

## UI Screenshots

### Default Landing Page
![Default Landing page](./assets/landing_page.png)

### Registration Page
![Registration page](./assets/register_page.png)

### Registration Page with Invalid Fields
![Registration Page with Invalid Fields](./assets/register_page_with_invalid_field_warnings.png)

### Registration as User Successful
![Registration as User Successful](./assets/register_successful.png)

### Login Page
![Login Page](./assets/login_page.png)

### Login Page with Invalid Fields
![Login Page with Invalid Fields](./assets/login_page_with_invalid_field_warnings.png)

### User Dashboard
![User Dashboard](./assets/user_dashboard.png)

### User Dashboard Chat
![User Dashboard Chat](./assets/user_dashboard_chat.png)

### User Dashboard search by query string
![User Dashboard search by query string](./assets/search_question_by_query_string.png)

### User Dashboard search by topic
![User Dashboard search by topic](./assets/search_question_by_topic.png)

### User Dashboard search by topic General Knowledge
![User Dashboard search by topic General Knowledge](./assets/search_question_by_topic_general_knowledge.png)

### Ask Question Page
![Ask Question Page](./assets/ask_question_page.png)

### Ask Question Page with Invalid Fields
![Ask Question Page with Invalid Fields](./assets/ask_question_page_with_invalid_field_warnings.png)

### Ask Question Page with data updated
![Ask Question Page with data updated](./assets/ask_question_page_with_data_updated.png)

### Ask Question Page Submission Successful
![Ask Question Page Submission Successful](./assets/ask_question_successful.png)

### Notification Email Sent to Admins when a new question is added by User
![Notification Email Sent to Admins when a new question is added by User](./assets/notification_email_question_available.png)

### View Answers for a Question
![View Answers for a Question](./assets/view_answers_for_question.png)

### Answering a Question
![Answering a Question](./assets/question_details_page_answer_update.png)

### Successfully Submitting an Answer
![Successfully Submitting an Answer](./assets/question_details_page_answer_update_successful.png)

### Notification Email Sent to Admins when a new answer is added by User
![Notification Email Sent to Admins when a new answer is added by User](./assets/notification_email_answer_available.png)

### User Logout
![User Logout](./assets/user_logout.png)

### Registration as Admin
![Registration as Admin](./assets/register_as_admin.png)

### Registration as Admin Successful
![Registration as Admin Successful](./assets/register_as_admin_successful.png)

### Admin Dashboard with no questions for approval
![Admin Dashboard with no questions for approval](./assets/admin_dashboard_empty_unapproved_question.png)

### Admin Dashboard Unapproved Questions list
![Admin Dashboard Unapproved Questions list](./assets/admin_dashboard_unapproved_questions.png)

### Admin Dashboard Unapproved Questions Delete Confirmation
![Admin Dashboard Unapproved Questions Delete Confirmation](./assets/admin_dashboard_unapproved_question_delete_confirmation.png)

### Admin Dashboard with no answers for approval
![Admin Dashboard with no answer for approval](./assets/admin_dashboard_empty_unapproved_answer.png)

### Admin Dashboard Unapproved Answers list
![Admin Dashboard Unapproved Answers list](./assets/admin_dashboard_unapproved_answers.png)

### Admin Dashboard Users list
![Admin Dashboard Users list](./assets/admin_dashboard_users_list.png)
