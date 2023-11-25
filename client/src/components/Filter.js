// DEFINE A FILTER COMPONENT
import React, { useState } from "react";
import { Form, Dropdown } from "react-bootstrap";

const Filter = ({ setFilter, fetchTasks }) => {
  const [selectedFilter, setSelectedFilter] = useState("myTasks");

  // define a function to set filters based on the Dropdown selected
  const handleSelectFilter = (filter) => {
    setSelectedFilter(filter);
    setFilter(filter);
    fetchTasks(); // Call fetchTasks directly when a filter is selected
  };

  // render the component
  return (
    <Form>
      <Dropdown>
        <Dropdown.Toggle className="m-5 fw-bold" size="lg" variant="dark">
          {selectedFilter === "myTasks" ? "My Tasks" : "Other Tasks"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            className="fw-bold"
            onClick={() => handleSelectFilter("myTasks")}
          >
            My Tasks
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            className="fw-bold"
            onClick={() => handleSelectFilter("otherTasks")}
          >
            Other Tasks
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Form>
  );
};

export default Filter;
