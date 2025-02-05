export default function ButtonGrid({ onButtonClick }) {
  const buttons = [
    [7, 8, 9, "DEL"],
    [4, 5, 6, "+"],
    [1, 2, 3, "-"],
    [".", 0, "/", "×"],
    ["RESET", "="],
  ];

  const baseClass = "flex cursor-pointer items-center justify-center rounded-xl p-6 leading-0 font-bold text-text-dark-blue drop-shadow-md md:p-8";

  const buttonClasses = {
  "DEL": "button--blue bg-default-key-reset text-xl text-white hover:bg-default-key-reset-hover dark:bg-magenta-600 dark:hover:bg-magenta-500 light:bg-teal-600 light:hover:bg-teal-500",
  "RESET": "button--blue col-span-2 bg-default-key-reset text-xl text-white hover:bg-default-key-reset-hover dark:bg-magenta-600 dark:hover:bg-magenta-500 light:bg-teal-600 light:hover:bg-teal-500",
  "=": "button--red col-span-2 bg-default-key-total text-[2rem] text-white hover:bg-default-key-total-hover dark:bg-amber-400 dark:hover:bg-amber-300 light:bg-orange-400 light:hover:bg-amber-500"
  };

  const buttonNumber = "button--light bg-default-key text-[2rem] hover:bg-default-key-hover dark:bg-magenta-700 dark:text-yellow-400 dark:hover:bg-magenta-600 light:bg-stone-200"

  return (
    <div className="bg-background-toggle rounded-lg p-6 light:bg-light-background-toggle dark:bg-magenta-900">
      <div className="grid grid-cols-4 gap-4">
        {buttons.flat().map((btn) => (
          <button
            key={btn}
            onClick={() => onButtonClick(btn.toString())}
            className={`${baseClass} ${buttonClasses[btn] || buttonNumber}`}
            >
            {btn === "×" ? "×" : btn}
          </button>
        ))}
      </div>
    </div>
  );
}
