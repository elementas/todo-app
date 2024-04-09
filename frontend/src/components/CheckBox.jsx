function CheckBox({ children, name, className, register = null, options = {}, ...props }) {
  return (
    <div
      className={'group flex cursor-pointer flex-row items-center gap-2' + (className ? ` ${className}` : '')}
      {...props}
    >
      <input id={`${name}-checkbox`} type="checkbox" {...(register ? register(name, { ...options }) : {})} />
      <label htmlFor={`${name}-checkbox`} className="select-none">
        {children}
      </label>
    </div>
  );
}

export default CheckBox;
