import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class AllProjects extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAllProjects());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }
	handleViewProject(id) {
		//this.props.dispatch(userActions.viewProject(id));
		return (e) => this.props.dispatch(userActions.viewProject(id));
    }

    render() {
        const { project, projects } = this.props;
        return (
            <div className="col-md-12">
                <p>
				<Link to="/addProject">Add Project</Link>
				</p>
                <h3>All registered Projects:</h3>
                
				{projects && projects.map && 
                    <ul>
                        {projects.map((project, index) =>
                            <li key={project.id}>
                                <a onClick={this.handleViewProject(project.id)}>{project.projectName}</a>
								&nbsp;&nbsp;&nbsp;
								{project.projectDate}
								&nbsp;&nbsp;&nbsp;
								{project.projectDesc}
								&nbsp;&nbsp;&nbsp;
                                {
                                    project.deleting ? <em> - Deleting...</em>
                                    : project.deleteError ? <span className="text-danger"> - ERROR: {project.deleteError}</span>
                                    : <span> - <a onClick={this.handleDeleteUser(project.id)}>Delete</a></span>
                                }
                            </li>
                        )}
                    </ul>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
	if(state.users && state.users.projectItems) {
		return {
			projects : state.users.projectItems
		};
	} else {
		 
    return {
        projects : null
    };
	}
   
}

const connectedAllProjects = connect(mapStateToProps)(AllProjects);
export { connectedAllProjects as AllProjects };