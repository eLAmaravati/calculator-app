"use client";
import { useState, useEffect } from "react";
import { create, all } from 'mathjs';
import SwitchButton from '@/components/Switch';

// Membuat instance math.js
const math = create(all);

export default function Home()
{
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [isResultDisplayed, setIsResultDisplayed] = useState(false);
  const MAX_INPUT_LENGTH = 15;

  const buttons = [
    [7, 8, 9, 'DEL'],
    [4, 5, 6, '+'],
    [1, 2, 3, '-'],
    ['.', 0, '/', '×'],
    ['RESET', '=']
  ];


  // Menangkap angka/operator yang ditekan
  const handleClick = (value) =>
  {
    if (value === "=")
    {
      if (!input)
      {
        setResult(0); // Jika input kosong, tetap tampilkan 0
        return;
      }

      // Menangani pembagian dengan 0
      if (input.includes("/0"))
      {
        setResult("Can't divide by 0");
      } else
      {
        try
        {
          const evaluatedResult = math.evaluate(input); // Evaluasi ekspresi matematika
          setResult(evaluatedResult); // Set result
          setIsResultDisplayed(true); // Tandai bahwa hasil sudah muncul
        } catch
        {
          setResult("Error");
        }
      }
    } else if (value === "RESET")
    {
      setInput("");
      setResult(null);
      setIsResultDisplayed(false);
    } else if (value === "DEL")
    {
      setInput(input.slice(0, -1));
    } else {
      if (input === "" && isNaN(value)) {
      setInput("0");
    } else {
      if (isResultDisplayed && !isNaN(value))
      {
        // Jika hasil sudah ditampilkan dan input baru adalah angka, reset input
        setInput(value);
        setIsResultDisplayed(false);
      } else
      {
        if (input.length < MAX_INPUT_LENGTH)
        {
          setInput((prev) => prev + (value === "×" ? "*" : value));
        }
       }
      }
    }
  };


  // Menangkap keystroke dari keyboard
  useEffect(() =>
  {
    const handleKeydown = (e) =>
    {
      const key = e.key;
      const isShiftPressed = e.shiftKey;
      // Cek apakah tombol yang ditekan valid
      if (key >= "0" && key <= "9")
      {
        handleClick(key); // Angka
      } else if (["+", "-", "*", "/", "="].includes(key))
      {
        handleClick(key); // Operator
      } else if ((key === "+" || key === "*" || (isShiftPressed && key === "=")))
      {
        handleClick(key);
      } else if (key === "Enter")
      {
        handleClick("=");
      } else if (key === "Backspace" || key === "Delete")
      {
        setInput(input.slice(0, -1));
      } else if (key === "Escape")
      {
        setInput("");
        setResult(null);
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () =>
    {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [input]);

  return (
    <main className='w-[80dvw] md:w-md lg:w-lg'>
      <div className="flex flex-col gap-6 flex-wrap">
        {/* Switch theme */ }
        <div className="flex justify-between items-end">
          <h1 className='text-white font-bold text-2xl light:text-neutral-900'>calc</h1>

          <SwitchButton />

        </div>
        {/* Screen */ }
        <div className="flex h-20 items-center justify-end overflow-hidden rounded-lg bg-background-screen p-8 text-2xl font-bold text-white md:text-3xl lg:h-24 lg:text-4xl dark:bg-magenta-800 dark:text-yellow-400 light:bg-white light:text-neutral-900">
          { result !== null ? result : input || "0" }
        </div>

        {/* Buttons */ }
        <div className="bg-background-toggle rounded-lg p-6 light:bg-light-background-toggle dark:bg-magenta-900">
          <div className="grid grid-cols-4 gap-4 col-span-3">
            { buttons.flat().map((btn) => (
              <button
                key={ btn }
                onClick={ () => handleClick(btn.toString()) }
                className={ `flex cursor-pointer items-center justify-center rounded-xl p-6 leading-0 font-bold text-text-dark-blue drop-shadow-md md:p-8
                ${btn === "DEL" ? "button--blue bg-default-key-reset text-xl text-white hover:bg-default-key-reset-hover dark:bg-magenta-600 light:bg-teal-600 light:hover:bg-teal-500 dark:hover:bg-magenta-500" :
                    btn === "RESET" ? "button--blue col-span-2 bg-default-key-reset text-xl text-white hover:bg-default-key-reset-hover dark:bg-magenta-600 dark:hover:bg-magenta-500 light:bg-teal-600 light:hover:bg-teal-500" :
                      btn === "=" ? "button--red col-span-2 bg-default-key-total hover:bg-default-key-total-hover text-[2rem] text-white dark:bg-amber-400 dark:hover:bg-amber-300 light:bg-orange-400 light:hover:bg-amber-500" :
                        "button--light bg-default-key text-[2rem] dark:bg-magenta-700 dark:text-yellow-400 light:bg-stone-200 hover:bg-default-key-hover dark:hover:bg-magenta-600"
                  }
                `}>
                { btn === '×' ? '×' : btn }
              </button>
            )) }
          </div>
        </div>
      </div>
    </main>
  );
}
