interface Props {
  message: string;
  onRetry: () => void;
}

const ErrorState = ({ message, onRetry }: Props) => {
  return (
    <div className="p-10 text-center">
      <div className="text-red-500 text-xl mb-4">{message}</div>
      <button
        onClick={onRetry}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorState;
