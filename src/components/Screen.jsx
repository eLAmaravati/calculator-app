const Screen = ({ result, input }) => {
  const formatInput = (value) => {
    if (!value) return "0";

    return value.replace(/(\d+)(\.\d*)?/g, (match, intPart, decimalPart) => {
      return Number(intPart.replace(/,/g, "")).toLocaleString() + (decimalPart || "");
    });
  };

  const formattedValue = result !== null ? result.toLocaleString() : formatInput(input);

  return (
    <div className="flex h-20 items-center justify-end overflow-hidden rounded-lg bg-background-screen p-8 text-2xl font-bold text-white md:text-3xl lg:h-24 lg:text-4xl dark:bg-magenta-800 dark:text-yellow-400 light:bg-white light:text-neutral-900">
      {formattedValue}
    </div>
  );
};

export default Screen;
