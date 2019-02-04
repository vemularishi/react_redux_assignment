import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class AddProject extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            project: {
                projectName: '',
                projectDate: '',
                projectDesc: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { project } = this.state;
        this.setState({
            project: {
                ...project,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { project } = this.state;
        const { dispatch } = this.props;
        if (project.projectName && project.projectDate && project.projectDesc ) {
            dispatch(userActions.addProject(project));
        }
    }

    render() {
        const { projecting  } = this.props;
        const { project, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>New Project</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !project.projectName ? ' has-error' : '')}>
                        <label htmlFor="projectName">Project Name</label>
                        <input type="text" className="form-control" name="projectName" value={project.projectName} onChange={this.handleChange} />
                        {submitted && !project.projectName &&
                            <div className="help-block">Project Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !project.projectDate ? ' has-error' : '')}>
                        <label htmlFor="projectDate">Project Date</label>
                        <input type="text" className="form-control" name="projectDate" value={project.projectDate} onChange={this.handleChange} />
                        {submitted && !project.projectDate &&
                            <div className="help-block">Project Date is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !project.projectDesc ? ' has-error' : '')}>
                        <label htmlFor="projectDesc">Project Description </label>
                       
					   <textarea type="text" className="form-control" name="projectDesc" value={project.projectDesc} onChange={this.handleChange} />
                        {submitted && !project.projectDesc &&
                            <div className="help-block">Project Description is required</div>
                        }
                    </div>
                    
                    <div className="form-group">
                        <button className="btn btn-primary">Add Project</button>
                        {projecting && 
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { projecting } = state.registration;
    return {
        projecting
    };
}

const connectedAddProject = connect(mapStateToProps)(AddProject);
export { connectedAddProject as AddProject };