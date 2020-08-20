import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getIsAuthenticated, getProjects } from 'reducers/projects/actions';
import { Loader, Box, Button, Text } from 'symphony-bdk-ui-toolkit';
import ProjectPage from '.';

const ProjectsContainer = (props) => {
  const {
    loading, actions, projects, isAuthenticated
  } = props;

  useEffect(() => {
    console.log('debug useEffect')
    actions.getIsAuthenticated();
    actions.getProjects();
  }, []);

  if (!isAuthenticated) {
    return (
      <Box vertical>
       <Text> You're Not logged on, please do so by clicking on the button below.</Text>
        <Button>
         <a href="http://localhost:3000/api/github/authenticate" target="_top">
          Login
         </a>
       </Button>
      </Box>
    );
  }

  if (projects==null) {
    return (
      <Box vertical>
        <Loader />
      </Box>
    )
  }


  return (<ProjectPage projects={projects} />);
};

ProjectsContainer.propTypes = {
  loading: PropTypes.bool,
  projects: PropTypes.array,
  actions: PropTypes.object.isRequired,
  match: PropTypes.object,
  isAuthenticated: PropTypes.bool
};

ProjectsContainer.defaultProps = {
  loading: false,
  projects: null,
  match: null,
  isAuthenticated: false
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getIsAuthenticated, getProjects}, dispatch),
});

const mapStateToProps = state => ({
  loading: state.projects.loading,
  projects: state.projects.projects,
  isAuthenticated: state.projects.isAuthenticated
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer);
