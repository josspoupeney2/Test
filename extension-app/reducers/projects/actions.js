import { RestClient } from 'symphony-bdk-ui-toolkit';
import {
  GET_PROJECTS,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILURE,
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
