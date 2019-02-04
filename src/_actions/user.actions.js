import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    getAll,
	addProject,
	getAllProjects,
    delete: _delete,
	viewProject,
	addCustomer,
	getAllCustomers
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}


function addProject(project) {
    return dispatch => {
        dispatch(request(project));

        userService.registerProject(project)
            .then(
                project => { 
                    dispatch(success());
                    history.push('/allProjects');
                    dispatch(alertActions.success('Project save successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(project) { return { type: userConstants.REGISTER_REQUEST, project } }
    function success(project) { return { type: userConstants.REGISTER_SUCCESS, project } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}


function addCustomer(customer) {
    return dispatch => {
        dispatch(request(customer));

        userService.registerCustomer(customer)
            .then(
                customer => { 
                    dispatch(success());
                    history.push('/viewProject');
                    dispatch(alertActions.success('Customer save successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(customer) { return { type: userConstants.REGISTER_REQUEST, customer } }
    function success(customer) { return { type: userConstants.REGISTER_SUCCESS, customer } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}



function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function getAllProjects() {
    return dispatch => {
        dispatch(request());

        userService.getAllProjects()
            .then(
                projects => dispatch(success(projects)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(projects) { return { type: userConstants.GETALL_SUCCESS, projects } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function getAllCustomers() {
    return dispatch => {
        dispatch(request());

        userService.getAllCustomers()
            .then(
                customers => dispatch(success(customers)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(customers) { return { type: userConstants.GETALL_SUCCESS, customers } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}



// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => { 
					dispatch(success(id));
					history.push('/viewProject');
				},
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}

function viewProject(id) {
   return dispatch => {
        dispatch(request(id));

        userService.viewProject(id)
            .then(
				
                projects => { dispatch(success(projects));
				dispatch(alertActions.success('selected Project : '+projects.projectName));
				history.push('/viewProject');
				},
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(projects) { return { type: userConstants.GETALL_SUCCESS, projects } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}
