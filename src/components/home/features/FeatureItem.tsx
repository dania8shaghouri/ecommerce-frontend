import type { Feature } from "./featureData";

interface Props {
  feature: Feature;
}

const FeatureItem = ({ feature }: Props) => {
  const Icon = feature.icon;

  return (
    <div
      className="
        group
        relative
        flex
        items-center
        gap-4
        py-6
        cursor-default
      "
    >
      <div
        className="
          flex
          items-center
          justify-center
          w-14
          h-14
          rounded-2xl
          bg-primary/10
          transition-all
          duration-300
          group-hover:bg-primary
        "
      >
        <Icon
          className="
            text-2xl
            text-primary
            transition-all
            duration-300
            group-hover:text-white
          "
        />
      </div>

      <div className="flex-1">
        <h3
          className="
            font-semibold
            text-textPrimary
            text-lg
          "
        >
          {feature.title}
        </h3>

        <p
          className="
            mt-1
            text-sm
            text-textSecondary
          "
        >
          {feature.description}
        </p>

        <div
          className="
            mt-3
            h-[2px]
            w-0
            bg-primary
            transition-all
            duration-300
            group-hover:w-16
          "
        />
      </div>
    </div>
  );
};

export default FeatureItem;
