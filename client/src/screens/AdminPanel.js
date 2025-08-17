import React from "react";
import { Tabs, Tab, Container } from "react-bootstrap";
import AddEvent from "../components/AddEvent";
import EventsList from "../components/EventsList";
import AllUsers from "../components/AllUsers";
import TeamFormation from "../components/TeamFormation";
import AllBookingsList from "../components/AllBookingsList"; // <-- Import the new component

function AdminPanel() {
  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Admin Dashboard</h1>
      <Tabs defaultActiveKey="events" id="admin-tabs" className="mb-3" fill>
        <Tab eventKey="events" title="Manage Events">
          <EventsList />
        </Tab>
        <Tab eventKey="add-event" title="Add New Event">
          <AddEvent />
        </Tab>
        <Tab eventKey="team-formation" title="Team Formation">
          <TeamFormation />
        </Tab>
        <Tab eventKey="users" title="Manage Users">
          <AllUsers />
        </Tab>
        {/* --- THIS TAB IS NOW FUNCTIONAL --- */}
        <Tab eventKey="bookings" title="View All Bookings">
            <AllBookingsList />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default AdminPanel;


