import React from 'react';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';

const Loading = ({ sm, md, lg, color }) => (
  <ReactLoading
    type={'bubbles'}
    color={color ? color : '#c4c4c4'}
    height={sm ? 50 : md ? 100 : lg ? 200 : 100}
    width={sm ? 50 : md ? 100 : lg ? 200 : 100}
  />
);

Loading.propTypes = {
  color: PropTypes.string,
  sm: PropTypes.bool,
  md: PropTypes.bool,
  lg: PropTypes.bool,
};

export default Loading;
