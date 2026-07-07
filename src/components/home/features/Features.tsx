import FeatureItem from "./FeatureItem";
import { features } from "./featureData";

const Features = () => {
  return (
    <section className="bg-white">
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          py-12
        "
      >
        <div
          className="
            rounded-3xl
            border
            border-border
            bg-white
            shadow-card
            overflow-hidden
          "
        >
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-4
            "
          >
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={`
                  px-6

                  ${
                    index !== features.length - 1
                      ? "border-b xl:border-b-0 xl:border-r border-border"
                      : ""
                  }

                  ${
                    index === 1
                      ? "xl:border-r"
                      : ""
                  }

                  ${
                    index === 2
                      ? "md:border-b-0 xl:border-r"
                      : ""
                  }
                `}
              >
                <FeatureItem feature={feature} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;