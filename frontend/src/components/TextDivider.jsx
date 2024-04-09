function TextDivider({ text, className, ...props }) {
  return (
    <div className={'relative flex select-none items-center py-0' + (className ? ` ${className}` : '')} {...props}>
      <div className="flex-grow border-t border-blue-200"></div>
      <span className="mx-2 flex-shrink text-xs text-blue-400">{text}</span>
      <div className="flex-grow border-t border-blue-200"></div>
    </div>
  );
}

export default TextDivider;
