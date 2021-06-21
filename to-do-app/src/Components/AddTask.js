import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddTask = ({ setAllTasks }) => {
  const [showModal, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [TaskText, setTaskText] = useState(null);
  const saveTask = () => {
    async function fetchApi() {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ TaskText: TaskText, TaskDone: false, TaskDate: new Date() })
      };
      await fetch('http://localhost:60812/AddTask', requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data, 'data')
          console.log(oldState, data, 'state')
          // setAllTasks(oldState => ({ ...oldState, data }))
        });
      handleClose()
    }
    fetchApi()
  }
  return (
    <>
      <div

        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}>
        <Button variant="primary" onClick={handleShow}>
          Add Task
        </Button>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="TaskText">
              <Form.Label>Task Text</Form.Label>
              <Form.Control
                type="TaskText"
                placeholder="Enter Task Text"
                onChange={e => setTaskText(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => saveTask()}>
            Add Task
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default AddTask;