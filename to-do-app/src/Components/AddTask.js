import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Api from './Api'
const AddTask = ({ setAllTasks }) => {
  const [showModal, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [TaskText, setTaskText] = useState(null);
  const saveTask = () => {
    let obj2Send = {
      "TaskText": TaskText,
      "TaskDone": false,
      "TaskDate": new Date()
    }
    let res = Api.Api('AddTask', 'POST', obj2Send)
    if (res) handleClose()
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
                onChange={e => setTaskText(e.target.value)} />
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