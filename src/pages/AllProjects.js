import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { FaFilter, FaSearch } from 'react-icons/fa'
import { AppNav } from '../components/AppNav'
import { Footer } from '../components/Footer'
import { NavbarTop } from '../components/NavbarTop'
import { ProjectsList } from '../components/ProjectsList'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllStart } from '../features/projects/fetchAllSlice'
import { useEffect } from 'react'

export const AllProjects = () => {
    // Fetch all projects from redux store
    const projects = useSelector(state => state.fetchAll.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllStart());
    }, [dispatch])

  return (
    <div>
        <NavbarTop/>
        <AppNav/>
        <Container className='my-5'>
            <h2>All Projects</h2>
            {/*  A row with search bar made using react-bootstrap and filter button */}
            <Row className='my-3 g-md-4 g-2'>
                <Col xs={10}>
                <div 
                className="projectSearch px-3 py-1 rounded-2"
                >
                    <input type="text" placeholder="Search for projects"
                    className="searchInput bg-transparent border-0 p-0 text-light"
                    />
                    <Button className="searchBtn bg-transparent border-0 text-light px-1">
                        <FaSearch/>
                    </Button>
                </div>
                </Col>
                <Col xs={2}>
                    <Button className='h-100 w-100'>
                        <FaFilter/>
                    </Button>
                </Col>
            </Row>
            <ProjectsList allProjects={projects}/>
        </Container>
        <Footer/>
    </div>
  )
}
