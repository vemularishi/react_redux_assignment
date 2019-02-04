import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class ViewProject extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAllCustomers());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.deleteCustomer(id));
    }
	

    render() {
        const { project, customers } = this.props;
        return (
            <div className="col-md-12">
                <p>
				<Link to="/addCustomer">Add Customer</Link>
				</p>
                <h3>All registered Customer:</h3>
                {customers &&
                    <ul>
                        {customers.map((customer, index) =>
                            <li key={customer.id}>
                                {customer.customerName}
								&nbsp;&nbsp;&nbsp;
								{customer.phoneNo}
								&nbsp;&nbsp;&nbsp;
								{customer.customerEmail}
								&nbsp;&nbsp;&nbsp;
								{customer.customerAddress}
								&nbsp;&nbsp;&nbsp;
                                {
                                    customer.deleting ? <em> - Deleting...</em>
                                    : customer.deleteError ? <span className="text-danger"> - ERROR: {customer.deleteError}</span>
                                    : <span> - <a onClick={this.handleDeleteUser(customer.id)}>Delete</a></span>
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
	if(state.users && state.users.customerItems) {
		return {
			project : state.users.projectItems,
			customers : state.users.customerItems
		};
	} else {
		 
    return {
        customers : null
    };
	}
   
}

const connectedViewProject = connect(mapStateToProps)(ViewProject);
export { connectedViewProject as ViewProject };