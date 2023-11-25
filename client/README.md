**TASKSEMAPHOR**

**HOW TO USE THE APP**

Login if you already have an account, else register.

1. Add a task. This will show in the task list below.
2. Edit or delete any existing tasks.
3. If you are an admin user, you will see an Admin page on the right-hand side of the header.
4. Navigate to this tab to see all users in the system, deny/allow admin privileges, or delete a user.
5. If you are an admin, you will also see a dropdown in the task lists, allowing you to see your tasks, or every task in the system. You will then be able to edit or delete any task in the system.

Logout when finished (top right of header).

**HOW TO INSTALL THE APP (via terminal)**

To install the app – clone the repo from github, open in an IDE, navigate to the client directory, and type ‘npm start’ – this will install all packages/dependencies, and open the app automatically in the browser of your choice. You will also either have to replace the MONDODB_URI and JWT_SECRET environment variables with your chosen values, or create a new .env file in the root of the ‘api’ directory, and add them there. The same will have to be done for the ‘client’ directory – REACT_APP_API_URL will need to be replaced with the localhost address of your choice; either directly, or via .env file in the root of the ‘client’ directory.

**HOW TO TEST THE APP (via terminal)**
To test the app – navigate to the client directory in your terminal, and type ‘npm test’. This will run the tests for the frontend. To run the tests for the backend, navigate to the ‘api’ directory, and type ‘npm test’.

**SECURITY MEASURES**

To ensure the security of this app, I have used JWT for user authentication. I do not allow non-admin users to perform any CRUD operations on other users/tasks in the system. I have also generated a secure JWT secret and stored it in an .env file, as well as storing the MongoDB URI to a .env file too – this is so that nobody can view my password or tamper with the database; the JWT secret meanwhile ensures the auth tokens cannot be decrypted by malicious actors.

**THIRD-PARTY APIs**

I have not used any third-party APIs in my code.

**APP DEPLOYMENT**

The application was deployed to Vercel, as a separate frontend and backend. This was necessary due to the way that Vercel builds apps. I also had to add a Vercel.json file to my backend to route the destinations accordingly. This took a lot of trial and error, and I had to completely rebuild my app from originally using the Next.js framework, to regular CRA – due to several compatibility issues with Vercel (and several other services I tried, such as Render and Netlify).

**DEPLOYED APP**

The deployed app (client-side) can be found here: <https://task-semaphor-client.vercel.app>

**TECHNICAL REQUIREMENTS DOCUMENT FROM PART 1**

**Task management app**

**System Architecture**

**Web Stack**

The application will be developed using the MERN stack, which includes:

- MongoDB: A NoSQL database for storing task-related data.
- Express: A backend framework for building a custom server to handle HTTP requests.
- React: A frontend library for building interactive user interfaces.
- Node.js: A JavaScript runtime environment for server-side scripting.

**Frontend Framework**

The frontend of the application will be built using React. This choice provides a modern and efficient way to create interactive user interfaces. It allows for the development of a single-page application (SPA), ensuring a seamless user experience.

**Styling**

For styling the app, I will use CSS for basic styling and may leverage a CSS framework like Bootstrap rapid development and consistent design elements. This choice ensures a clean and responsive user interface.

**Deployment**

The application will be deployed using a cloud-based platform like Vercel. This allows for scalability, easy maintenance, and reliability. Continuous integration and deployment (CI/CD) pipelines will be set up to automate the deployment process.

**System Requirements Specification**

**Overview**

The task management app aims to provide users with a simple and intuitive interface for managing tasks efficiently. It will offer the following features:

- User authentication using various strategies (e.g., Google, Facebook, username/password).
- User roles: Normal end-user and administrator.
- CRUD operations for tasks (Create, Read, Update, Delete).
- Filtering tasks based on different criteria.
- Responsive design for accessibility on various devices.

**User Stories**

1. **User Registration**
   -- As a new user, I want to create an account using my email and password so I can start managing tasks.
2. **Adding a Task**
   -- As a user, I want to add a task with a name, description, and an optional deadline, so I can keep track of what needs to be done.
3. **Assigning a Task**
   -- As a user, I want to assign a task to another user or myself so that responsibilities are clear and tasks get completed efficiently.
4. **Completing a Task**
   -- As a user, I want to mark a task as complete so that I can track my progress and focus on pending tasks.
5. **Filtering Tasks by Deadline**
   -- As a user, I want to filter tasks by their deadline, including upcoming tasks and tasks that are overdue, so I can prioritise my work effectively.

**Differentiation from Competitors**

The task management app aims to differentiate itself from competitors like Asana by offering a streamlined and intuitive user experience. It avoids feature overload and complex project management principles. Instead, it focuses on a clean grid interface with minimal clicks required for task management. Tasks are automatically ordered by deadline, eliminating the need for a separate calendar view.

**Non-Functional Requirements**

- **Security**:
  - User information and passwords will be securely stored using JWT and MongoDB.
- **Performance**:
  - The app will respond promptly to user interactions, even with a large number of tasks and users. Autoscaling and cloud server environment will be utilised.
- **User-Friendly Interface**:
  - The user interface will follow familiar UI/UX design principles, prioritising simplicity and ease of navigation.
- **Compatibility**:
  - The application will be accessible on various devices and platforms, ensuring compatibility through thorough testing.
- **Scalability**:
  - The app will be designed to handle a growing number of users and tasks, utilising autoscaling infrastructure.
