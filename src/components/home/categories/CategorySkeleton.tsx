const CategorySkeleton = () => {
  return (
    <div
      className="
        relative
        w-[270px]
        h-[385px]
        rounded-[34px]
        border
        border-border
        bg-white
        overflow-hidden
        animate-pulse
      "
    >
      {/* Image Area */}
      <div className="relative flex justify-center items-center h-[280px]">
        <div
          className="
            absolute
            bottom-[26px]
            w-44
            h-10
            rounded-full
            bg-primary/10
            blur-[32px]
          "
        />

        <div
          className="
            relative
            w-[75%]
            h-[170px]
            rounded-xl
            bg-slate-200
          "
        />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="h-8 w-36 mx-auto rounded bg-slate-200" />

        <div className="mt-4 h-4 w-24 mx-auto rounded bg-slate-200" />
      </div>
    </div>
  );
};

export default CategorySkeleton;
