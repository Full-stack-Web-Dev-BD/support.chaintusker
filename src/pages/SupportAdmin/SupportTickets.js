import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { FaFilter, FaSearch } from 'react-icons/fa'
import { AppNav } from '../../components/AppNav'
import { Footer } from '../../components/Footer'
import { NavbarTop } from '../../components/NavbarTop'
import { TicketList } from '../../components/TicketList'
export const SupportTickets = () => { 


  return (
    <div>
        <NavbarTop/>
        <Container className='my-5'>
            <h2>Support Tickets</h2> 
            <TicketList />
        </Container>
        <Footer/>
    </div>
  )
}
