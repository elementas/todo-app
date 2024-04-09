import Paper from './Paper';

function Modal({ children, className, modalWidth = 300, onCancel = null, ...props }) {
  const onKeyUp = (ev) => {
    if (ev.key === 'Escape') {
      onCancel();
    }
  };

  if (typeof onCancel === 'function') {
    props.onKeyUp = onKeyUp;
  }

  return (
    <div
      tabIndex="-1"
      onKeyUp={onKeyUp}
      className={
        'fixed left-0 top-0 z-40 h-[calc(100dvh)] w-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-15' +
        (className ? ` ${className}` : '')
      }
      {...props}
    >
      <div className="mt-10 flex h-full w-full flex-col items-center">
        <Paper className={`relative pb-4 pt-4 w-[${modalWidth}px]`}>{children}</Paper>
      </div>
    </div>
  );
}

export default Modal;
