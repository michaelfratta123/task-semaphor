// define the main functionality of the frontend
import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import LoginRegister from "./components/LoginRegister";
import TaskForm from "./components/TaskForm";
import Filter from "./components/Filter";
import TaskList from "./components/TaskList";
import { jwtDecode } from "jwt-decode";
import Admin from "./components/Admin";

function App() {
  // track user data; initiate to null
  const [userData, setUserData] = useState(null);
  // track filter; initiate as 'mytasks'
  const [filter, setFilter] = useState("myTasks");
  // initiate tasks array as empty
  const [tasks, setTasks] = useState([]);
  // the userId is is an empty string if userData is not already present
  const userId = userData ? userData.userId : "";
  const PREFIX = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  // ===========
  // FETCH TASKS
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // if token not in localstorage, do nothing
        return;
      }

      // construct the URL with the filter parameter
      let url = `${PREFIX}/api/tasks?filter=${filter}`;

      // if the user is not an admin and the filter is 'mytasks'
      if (!userData?.isAdmin && filter === "myTasks") {
        // append the creator parameter to the url
        url += `&creator=${userId}`;
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      // set relevant tasks to state if the response was successful
      if (response.ok) {
        setTasks(data);
      } else {
        console.error(data.msg);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // ========
  // ON MOUNT
  useEffect(() => {
    // Check if user data is stored in localStorage
    const storedUserData = localStorage.getItem("userData");
    // if it is, then pass this data to the state, and call fetchTasks
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      fetchTasks();
    }
    // eslint-disable-next-line
  }, [userId, userData?.isAdmin, filter]);

  // ============
  // HANDLE LOGIN
  const handleLogin = async (formData) => {
    try {
      const response = await fetch(`${PREFIX}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        const decoded = jwtDecode(data.token);

        // Store the token before fetching user info
        localStorage.setItem("token", data.token);

        // Fetch user data to get isAdmin
        const userResponse = await fetch(
          `${PREFIX}/api/users/${decoded.userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${data.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const userData = await userResponse.json();

        // Update userData with isAdmin
        const updatedUserData = {
          userId: decoded.userId,
          token: data.token,
          isAdmin: userData.isAdmin,
        };

        // Store the user data in localStorage
        localStorage.setItem("userData", JSON.stringify(updatedUserData));

        // Set updatedUserData in state
        setUserData(updatedUserData);
      } else {
        console.error("Login failed. Server response:", data);
        alert("Login failed. Check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert(
        "Error during login. Please check your network connection and try again."
      );
    }
  };

  // ===============
  // HANDLE REGISTER
  const handleRegister = async (formData) => {
    try {
      const response = await fetch(`${PREFIX}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        const decoded = jwtDecode(data.token);

        // Store the token before fetching user info
        localStorage.setItem("token", data.token);

        // Fetch user data to get isAdmin
        const userResponse = await fetch(
          `${PREFIX}/api/users/${decoded.userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${data.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const userData = await userResponse.json();

        // Update userData with isAdmin
        const updatedUserData = {
          userId: decoded.userId,
          token: data.token,
          isAdmin: userData.isAdmin,
        };

        // Store the user data in localStorage
        localStorage.setItem("userData", JSON.stringify(updatedUserData));

        // Set updatedUserData in state
        setUserData(updatedUserData);
      } else {
        console.error("Registration failed. Server response:", data);
        alert("Registration failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert(
        "Error during registration. Please check your network connection and try again."
      );
    }
  };

  // ===============
  // HANDLE ADD TASK
  const handleAddTask = async (newTask) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${PREFIX}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTask),
      });

      const data = await response.json();

      if (response.ok) {
        // append the newly added task data to the tasks array in the state
        setTasks([...tasks, data.task]);
      } else {
        console.error(data.msg);
        alert("Error adding task. Please try again.");
      }
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Error adding task. Please try again.");
    }
  };

  // ===============
  // HANDLE EDIT TASK
  const handleEditTask = async (taskId, updatedTask) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${PREFIX}/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTask),
      });

      const data = await response.json();

      if (response.ok) {
        // find the id of the task that was updated, and replace with updated task
        const updatedTasks = tasks.map((task) =>
          task._id === taskId ? data.updatedTask : task
        );
        // set the updated tasks array to the state
        setTasks(updatedTasks);
      } else {
        console.error(data.msg);
        alert("Error updating task. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Error updating task. Please check your network connection and try again."
      );
    }
  };

  // ==================
  // HANDLE REMOVE TASK
  const handleRemoveTask = async (taskId) => {
    try {
      const response = await fetch(`${PREFIX}/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        // filter out the deleted task
        const updatedTasks = tasks.filter((task) => task._id !== taskId);
        // update the tasks array
        setTasks(updatedTasks);
      } else {
        console.error(data.msg);
        alert("Error removing task. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Error removing task. Please check your network connection and try again."
      );
    }
  };

  // =============
  // HANDLE LOGOUT
  const handleLogout = () => {
    // on click, update user state back to null
    setUserData(null);
    // remove the token from the localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    // set filter back to mytasks
    setFilter("myTasks");
    navigate("/");
  };

  // render the component
  return (
    <Layout userData={userData} handleLogout={handleLogout}>
      <Routes>
        {/* define a route for the home path, and associate with it
            the components below */}
        <Route
          path="/"
          element={
            <>
              {/* render the TaskForm and TaskList components if the user is logged in */}
              {userData ? (
                <>
                  <TaskForm handleAddTask={handleAddTask} />
                  <h3 className="taskList bg-dark text-light m-auto p-3 w-75 mb-3 mt-5">
                    Task List:
                  </h3>
                  {/* render the Filter component if the user is an admin */}
                  {userData.isAdmin && (
                    <Filter setFilter={setFilter} fetchTasks={fetchTasks} />
                  )}
                  <TaskList
                    tasks={tasks}
                    filter={filter}
                    userId={userId}
                    isAdmin={userData.isAdmin}
                    handleEditTask={handleEditTask}
                    handleRemoveTask={handleRemoveTask}
                    userData={userData}
                  />
                </>
              ) : (
                // otherwise show the LoginRegister component
                <LoginRegister
                  handleLogin={handleLogin}
                  handleRegister={handleRegister}
                />
              )}
            </>
          }
        />
        {/* define a route for the admin path, used by the Admin component */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Layout>
  );
}

export default App;
