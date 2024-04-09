import PropTypes from 'prop-types';

function InputErrorText({ text = '', className = '', ...props }) {
  return (
    <p className={'mt-1 text-sm text-red-800' + (className ? ` ${className}` : '')} {...props}>
      {text}
    </p>
  );
}

InputErrorText.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string
};

export default InputErrorText;
