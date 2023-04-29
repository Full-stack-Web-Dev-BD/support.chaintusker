import React from 'react'
import { Col } from 'react-bootstrap'
import { IoLocationSharp } from 'react-icons/io5'

export const AboutClient = () => {
  return (
    <Col md={4}>
        <div className="aboutClient rounded-5 p-md-5 p-4 shadow">
        <h3>Client's info</h3>
        <p><IoLocationSharp/> London, United Kingdom</p>
        <p>Member since: Jan XXXX</p>
        <p>Projects completed: 3</p>
        <hr />
        <h3>Project Stats</h3>
        <p>Proposals: 3</p>
        <p>Average Bid: $XXX</p>
        <p>Project Budget: $XXX</p>
        <p>Project Category: Web, Mobile & Software Dev</p>
        </div>
    </Col>
  )
}
