import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProjects } from 'reducers/projects/actions';
import { Loader, Box } from 'symphony-bdk-ui-toolkit';
import ProjectPage from '.';

const ProjectsContainer = (props) => {
  const {
    loading, actions, projects
  } = props;

  useEffect(() => {
    console.log('debug useEffect')
    actions.getProjects();
  }, []);

  if (!projects) {
    return (
      <Box horizontal>
        <Loader />
      </Box>
    );
  }

  return (<ProjectPage projects={projects} />);
};

ProjectsContainer.propTypes = {
  loading: PropTypes.bool,
  projects: PropTypes.array,
  actions: PropTypes.object.isRequired,
  match: PropTypes.object,
};

ProjectsContainer.defaultProps = {
  loading: false,
  projects: null,
  match: null,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getProjects}, dispatch),
});

const mapStateToProps = state => ({
  loading: state.projects.loading,
  projects: state.projects.projects,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer);
