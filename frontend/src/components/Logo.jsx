function Logo({ className, ...props }) {
  return (
    <div
      className={
        'w-fit select-none text-nowrap text-center text-sm font-thin lowercase tracking-widest' +
        (className ? ` ${className}` : '')
      }
      {...props}
    >
      daryk_daryk
    </div>
  );
}

export default Logo;
