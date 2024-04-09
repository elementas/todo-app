import { useEffect } from 'react';

function PageContainer({ children, loading = false, className = '', ...props }) {
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', loading);
  }, [loading]);

  return (
    <div
      className={'flex min-h-[calc(100dvh)] flex-col font-montserrat' + (className ? ` ${className}` : '')}
      {...props}
    >
      {children}
      {loading && (
        <div className="fixed z-50 h-full w-full bg-black bg-opacity-15">
          <div className="flex h-full w-full items-center justify-center ">
            <div className="relative flex h-screen w-fit items-center justify-center space-x-2 dark:invert">
              <div className="size-3 animate-bounce rounded-md bg-blue-500 [animation-delay:-0.3s]"></div>
              <div className="size-3 animate-bounce rounded-md bg-blue-500 [animation-delay:-0.15s]"></div>
              <div className="size-3 animate-bounce rounded-md bg-blue-500"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PageContainer;
