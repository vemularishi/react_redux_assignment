import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class AddCustomer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            customer: {
                customerName: '',
                phoneNo: '',
                customerEmail: '',
				customerAddress: '',
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { customer } = this.state;
        this.setState({
            customer: {
                ...customer,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { customer } = this.state;
        const { dispatch } = this.props;
        if (customer.customerName && customer.customerName && customer.customerEmail && customer.customerAddress ) {
            dispatch(userActions.addCustomer(customer));
        }
    }

    render() {
        const { customering  } = this.props;
        const { customer, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>New Customer</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !customer.customerName ? ' has-error' : '')}>
                        <label htmlFor="customerName">Customer Name</label>
                        <input type="text" className="form-control" name="customerName" value={customer.customerName} onChange={this.handleChange} />
                        {submitted && !customer.customerName &&
                            <div className="help-block">Customer Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !customer.phoneNo ? ' has-error' : '')}>
                        <label htmlFor="phoneNo">Phone No</label>
                        <input type="text" className="form-control" name="phoneNo" value={customer.phoneNo} onChange={this.handleChange} />
                        {submitted && !customer.phoneNo &&
                            <div className="help-block">Phone No is required</div>
                        }
                    </div>
					 <div className={'form-group' + (submitted && !customer.customerEmail ? ' has-error' : '')}>
                        <label htmlFor="customerEmail">customer Email </label>
                        <input type="text" className="form-control" name="customerEmail" value={customer.customerEmail} onChange={this.handleChange} />
                        {submitted && !customer.customerEmail &&
                            <div className="help-block">Customer Email is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !customer.customerAddress ? ' has-error' : '')}>
                        <label htmlFor="customerAddress">customer Address </label>
                       
					   <textarea type="text" className="form-control" name="customerAddress" value={customer.customerAddress} onChange={this.handleChange} />
                        {submitted && !customer.customerAddress &&
                            <div className="help-block">customer Address is required</div>
                        }
                    </div>
                    
                    <div className="form-group">
                        <button className="btn btn-primary">Add Customer</button>
                        {customering && 
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
    const { customering } = state.registration;
    return {
        customering
    };
}

const connectedAddCustomer = connect(mapStateToProps)(AddCustomer);
export { connectedAddCustomer as AddCustomer };