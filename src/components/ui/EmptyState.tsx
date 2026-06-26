interface Props {
  message: string;
}

const EmptyState = ({ message }: Props) => {
  return (
    <div className="text-center py-20">
      <p className="text-xl text-gray-500">{message}</p>
    </div>
  );
};

export default EmptyState;
