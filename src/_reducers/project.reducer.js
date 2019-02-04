import { userConstants } from '../_constants';

export function projects(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.projects
      };
    case userConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to project being deleted
      return {
        ...state,
        items: state.items.map(project =>
          project.id === action.id
            ? { ...project, deleting: true }
            : project
        )
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted project from state
      return {
        items: state.items.filter(project => project.id !== action.id)
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to project 
      return {
        ...state,
        items: state.items.map(project => {
          if (project.id === action.id) {
            // make copy of project without 'deleting:true' property
            const { deleting, ...projectCopy } = project;
            // return copy of project with 'deleteError:[error]' property
            return { ...projectCopy, deleteError: action.error };
          }

          return project;
        })
      };
    default:
      return state
  }
}