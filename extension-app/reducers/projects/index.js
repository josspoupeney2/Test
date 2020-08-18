import {
  GET_PROJECTS,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILURE,
} from './types';

const INITIAL_STATE = {
  projects: null,
  loading: true,
  error: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: null,
        loading: true,
        error: null,
      };
    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload,
        loading: false,
        error: null,
      };
    case GET_PROJECTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
