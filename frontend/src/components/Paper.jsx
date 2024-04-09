import PropTypes from 'prop-types';

function Paper({ children, className, ...props }) {
  return (
    <div className={'rounded-lg border bg-white p-8 drop-shadow-lg' + (className ? ` ${className}` : '')} {...props}>
      {children}
    </div>
  );
}

Paper.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
};

export default Paper;
