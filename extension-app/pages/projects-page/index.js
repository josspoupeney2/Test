import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Table, Text } from 'symphony-bdk-ui-toolkit';

const columns = [
    {
      header: 'Name',
      accessor: 'name',
      width: '200'
    },
    {
      header: 'URL',
      accessor: 'url',
      width: '600'
    }
]

const ProjectPage = (props) => {
  const { projects, loading } = props;

  return (
    <Box style={{width: '100%'}}>
      <Text isTitle>Manage Projects</Text>
      <Table columns={columns} data={projects} />
    </Box>
  );
};

ProjectPage.propTypes = {
  projects: PropTypes.array,
  loading: PropTypes.bool
};

ProjectPage.defaultProps = {
  projects: null,
  loading: true,
};

export default ProjectPage;
