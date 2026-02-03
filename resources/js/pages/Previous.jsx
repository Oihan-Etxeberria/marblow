import React from "react";
import { Table, Badge, Alert } from "react-bootstrap";
import DataSection from "../components/DataSection";
import Hero from "../components/Hero";

function Events({ events = [] }) {
  const renderBadge = (state) => {
    switch (state) {
      case "active":
        return <Badge bg="success">Active</Badge>;
      case "incoming":
        return (
          <Badge bg="warning" text="dark">
            Incoming
          </Badge>
        );
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  return (
    <>
      <Hero
        title="Previous Competitions"
        subtitle="List of competitions"
        cosas={
          <DataSection>
            {events.length === 0 ? (
              <Alert variant="info" className="text-center">
                No competitions available at the moment.
              </Alert>
            ) : (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Competition</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>State</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event, index) => (
                    <tr key={event.id}>
                      <td>{index + 1}</td>
                      <td>{event.name}</td>
                      <td>{event.location}</td>
                      <td>{event.date.split('T')[0]}</td>
                      <td>{renderBadge(event.state)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </DataSection>
        }
      />
    </>
  );
}

export default Events;