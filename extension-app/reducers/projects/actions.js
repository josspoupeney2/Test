import { RestClient } from 'symphony-bdk-ui-toolkit';
import {
  GET_PROJECTS,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILURE,
  GET_ISAUTHENTICATED,
  GET_ISAUTHENTICATED_SUCCESS,
  GET_ISAUTHENTICATED_FAILURE,
} from './types';

export function getProjects() {
  return (dispatch) => {
    dispatch({ type: GET_PROJECTS });
    console.log('DEBUG getProjects');
    return RestClient.get('api/github/repos')
      .then(res => {console.log('DEBUG', res.data);dispatch({ type: GET_PROJECTS_SUCCESS, payload: res.data })})
      .catch(error => {console.log('DEBUG', error.data);dispatch({ type: GET_PROJECTS_FAILURE, payload: error.data })});
  };
}

export function getIsAuthenticated() {
  return (dispatch) => {
    dispatch({ type: GET_ISAUTHENTICATED });
    return RestClient.get('api/isAuthenticated')
      .then(res => {console.log('DEBUG', res.data);dispatch({ type: GET_ISAUTHENTICATED_SUCCESS, payload: res.data })})
      .catch(error => {dispatch({ type: GET_ISAUTHENTICATED_FAILURE, payload: error.data })});
  };
}
