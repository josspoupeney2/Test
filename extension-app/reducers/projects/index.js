import {
  GET_PROJECTS,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILURE,
  GET_ISAUTHENTICATED,
  GET_ISAUTHENTICATED_SUCCESS,
  GET_ISAUTHENTICATED_FAILURE
} from './types';

const INITIAL_STATE = {
  projects: null,
  isAuthenticated: false,
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
    case GET_ISAUTHENTICATED:
      return {
        ...state,
        isAuthenticated: false,
        error: null,
      };
    case GET_ISAUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        error: null,
      };
    case GET_ISAUTHENTICATED_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
