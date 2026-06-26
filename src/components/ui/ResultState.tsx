import type { IconType } from "react-icons";

type Color = "green" | "red";

interface Props {
  icon: IconType;
  title: string;
  buttonText: string;
  onClick: () => void;
  color?: Color;
}

const colorMap = {
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
  },
  red: {
    bg: "bg-red-100",
    text: "text-red-600",
  },
} as const;

const ResultState = ({
  icon: Icon,
  title,
  buttonText,
  onClick,
  color = "green",
}: Props) => {
  const selectedColor = colorMap[color];

  return (
    <div className="flex flex-col items-center justify-center h-[70vh] gap-6 text-center">
      
      <div
        className={`w-16 h-16 flex items-center justify-center rounded-full ${selectedColor.bg}`}
      >
        <Icon className={`w-8 h-8 ${selectedColor.text}`} />
      </div>

      <h1 className="text-2xl font-semibold text-gray-800">
        {title}
      </h1>

      <button
        onClick={onClick}
        className="mt-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primaryHover transition font-medium"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default ResultState;