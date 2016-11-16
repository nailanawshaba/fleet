import { PropTypes } from 'react';

export default PropTypes.shape({
  error: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
});
