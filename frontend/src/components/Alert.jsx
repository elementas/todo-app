export const TYPE_ERROR = 'error';
export const TYPE_SUCCESS = 'success';
export const TYPE_INFO = 'info';
export const TYPE_WARNING = 'warning';

function Alert({ children, type = TYPE_INFO, className = '', ...props }) {
  let styleClasses;

  switch (type) {
    case TYPE_ERROR:
      styleClasses = 'border-red-200 bg-red-100 text-red-900';
      break;
    case TYPE_WARNING:
      styleClasses = 'border-yellow-200 bg-yellow-100 text-yellow-900';
      break;
    case TYPE_SUCCESS:
      styleClasses = 'border-green-200 bg-green-100 text-green-900';
      break;
    default:
      styleClasses = 'border-blue-200 bg-blue-50 text-blue-900';
  }

  return (
    <div className={`rounded-md border p-2 text-sm ${styleClasses}` + (className ? ` ${className}` : '')} {...props}>
      {children}
    </div>
  );
}

export default Alert;
