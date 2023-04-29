import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ChatBaseURL } from "../../utls/constant";
import { getDIDToken } from "../../web3/magic";

function TicketModal({ getTicket, publicKey }) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const submitHandle = async () => {
    
    const DIDToken = await getDIDToken();

    let headersList = {
      Accept: "*/*",
      token: DIDToken,
      "Content-Type": "application/json",
    };
    await axios.post(`${ChatBaseURL}/api/ticket`, { title, user: publicKey },{headers:headersList});
    getTicket();
  };

  return (
    <>
      <Button
        variant="primary"
        className="btn_rounded cp text-light"
        onClick={handleShow}
      >
        Get Ticket
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          style={{ border: "0" }}
          className="text-light"
          closeButton
        >
          <Modal.Title>Get Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter Details</Form.Label>
              <Form.Control
                placeholder="Enter a short details of issue "
                value={title}
                as="textarea"
                rows={3}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        {title.length > 10 ? (
          <Modal.Footer style={{ border: "0" }}>
            <Button variant="secondary" onClick={submitHandle}>
              submit
            </Button>
          </Modal.Footer>
        ) : (
          <Modal.Footer style={{ border: "0" }}>
            <Button disabled variant="secondary" onClick={handleClose}>
              Submit
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
}
export default TicketModal;
