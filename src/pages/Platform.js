import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { AppNav } from '../components/AppNav'
import { BidStats } from '../components/BidStats'
import { EarningChart } from '../components/EarningChart'
import { EarningStats } from '../components/EarningStats'
import { Footer } from '../components/Footer'
import { JobStats } from '../components/JobStats'
import { NavbarTop } from '../components/NavbarTop'
import { RecentChats } from '../components/RecentChats'

export const Platform = () => {
  return (
    <div>
        <NavbarTop/>
        <AppNav/>
        <Container id='dashboard-wrapper'>
        <Row className='my-5 g-4'>
            <JobStats/>
            <RecentChats/>
        </Row>
        <Row xs={1} md={2} className='my-5'>
            <EarningChart/>
            <BidStats/>
        </Row>
        <EarningStats/>
        </Container>
        <Footer/>
    </div>
  )
}
