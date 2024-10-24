const Loading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full border-4 border-primary border-t-secondary h-12 w-12" />
        <p className="text-primary dark:text-secondary">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
