function TextArea({ name, className, valid = true, register = null, options = {}, ...props }) {
  return (
    <textarea
      {...(register ? register(name, { ...options }) : {})}
      className={
        'w-full rounded-md border bg-gray-50 p-2 transition-all duration-500 ease-in-out focus:bg-white focus:placeholder-transparent' +
        (valid ? '' : ' border-red-500 bg-red-50 focus:bg-red-50') +
        (className ? ` ${className}` : '')
      }
      {...props}
    ></textarea>
  );
}

export default TextArea;
