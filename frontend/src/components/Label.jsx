import PropTypes from 'prop-types';

function Label({ children, className, ...props }) {
  return (
    <label className={'select-none' + (className ? ` ${className}` : '')} {...props}>
      {children}
    </label>
  );
}

Label.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
};

export default Label;
