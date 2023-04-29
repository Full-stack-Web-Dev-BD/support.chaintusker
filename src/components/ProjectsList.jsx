import moment from "moment/moment";
import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export const ProjectsList = ({ allProjects }) => {
  console.log(allProjects);

  return (
    <div className="my-5">
      <Table hover responsive className="allProjectsTable rounded-3 text-light">
        <thead className="shadow-lg border-0 fs-5 mb-4">
          <tr>
            <th>Project Name</th>
            <th>Total Bids</th>
            <th>Avg Bid</th>
            <th>Posted</th>
          </tr>
        </thead>
        <tbody>
          {allProjects.data &&
            allProjects.data.map((project, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Link
                      to={`/project/${project._id}`}
                      className="text-light text-decoration-none"
                    >
                      {project.title}
                    </Link>
                  </td>
                  <td>{project.status}</td>
                  <td>{project.max_budget}</td>
                  <td>{moment.unix(project.created_on / 1000).fromNow()}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};
