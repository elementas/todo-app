function Button({ className, ...props }) {
  return (
    <button
      className={
        'rounded-lg bg-blue-500 p-2 px-4 text-white transition-all duration-500 ease-in-out hover:bg-blue-400' +
        (className ? ` ${className}` : '')
      }
      {...props}
    />
  );
}

export default Button;
