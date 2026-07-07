import { FiCpu } from "react-icons/fi";

interface Props {
  onClick: () => void;
}

const Logo = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      aria-label="Go to homepage"
      className="
            w-10
          h-10
          rounded-xl
          bg-primary
          flex
          items-center
          justify-center
          text-white
      "
    >
      <FiCpu className="text-2xl" />
    </button>
  );
};

export default Logo;
