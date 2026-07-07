import type { Category } from "../../../types/Category";
import { BASE_URL } from "../../../constants/baseUrl";
interface Props {
  category: Category;
}

const CategoryCard = ({ category }: Props) => {
  return (
    <div
      className="
        group
        relative

        w-[270px]
        h-[385px]

        overflow-visible

        rounded-[34px]

        bg-white

        border
        border-border

        transition-all
        duration-500

        hover:-translate-y-3
        hover:border-primary/40

        cursor-pointer
      "
    >
      {/* Product Area */}

      <div
        className="
          relative

          flex
          justify-center
          items-center

          h-[280px]
        "
      >
        {/* Blue Glow */}

        <div
          className="
    absolute
    bottom-[26px]

    w-44
    h-10

    rounded-full

    bg-primary/20

    blur-[32px]

    transition-all
    duration-500

    group-hover:w-52
    group-hover:bg-primary/35
  "
        />

        {/* Product */}

        <img
          src={`${BASE_URL}/images/${category.image}`}
          draggable={false}
          className="
            relative

            z-20

            w-[88%]

            object-contain
            rounded-md

            select-none

            transition-all
            duration-500

            group-hover:-translate-y-2
            group-hover:scale-110
          "
        />
      </div>

      {/* Content */}

      <div
        className="
          absolute

          bottom-0
          left-0
          right-0

          rounded-b-[34px]

          bg-white

          p-6
        "
      >
        <h2
          className="
            text-3xl
            font-bold
            text-center
            text-textPrimary
          "
        >
          {category.name}
        </h2>

        <p
          className="
            mt-2

            text-center

            text-textSecondary
          "
        >
          {category.totalProducts} Products
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
