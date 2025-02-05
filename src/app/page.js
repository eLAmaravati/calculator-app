"use client";
import { useState, useEffect } from "react";
import { create, all } from 'mathjs';
import Screen from '@/components/Screen';
import SwitchButton from '@/components/SwitchButton';
import ButtonGrid from '@/components/ButtonGrid';

// Membuat instance math.js
const math = create(all);

export default function Home()
{
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const MAX_INPUT_LENGTH = 15;
 
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
        } catch
        {
          setResult("Error");
        }
      }
    } else if (value === "RESET")
    {
      setInput(""); // Reset input
      setResult(null); // Reset result
    } else if (value === "DEL")
    {
      setInput(input.slice(0, -1)); // Hapus karakter terakhir dari input
    } else
    {
      if (input === "" && isNaN(value))
      {
        setInput("0");
      } else
      {
        if (result !== null)
        {
          // Jika hasil sudah ada (perhitungan selesai), reset input
          setInput(value);
          setResult(null); // Reset hasil setelah input baru dimulai
        } else
        {
          // Jika input masih dalam proses, tambahkan nilai baru
          if (input.length < MAX_INPUT_LENGTH)
          {
            setInput((prev) => prev + (value === "×" ? "*" : value));
          }
        }
      }
    }
  };

  // Menangkap keydown event untuk keyboard
  useEffect(() => {
  const handleKeydown = (e) => {
    const key = e.key;

    if (result !== null) {
      setInput(""); // Reset input setelah hasil ditampilkan
      setResult(null);
    }

    if (key >= "0" && key <= "9") {
      handleClick(key);
    } else if (["+", "-", "*", "/"].includes(key)) {
      handleClick(key);
    } else if (key === ".") {
      handleClick(".");
    } else if (key === "Enter" ) {
      e.preventDefault();
      handleClick("=");
    } else if (key === "=") {
      handleClick("=")
    } else if (key === "Backspace" || key === "Delete") {
      setInput((prev) => prev.slice(0, -1));
    } else if (key === "Escape") {
      setInput("");
      setResult(null);
    }
  };

  window.addEventListener("keydown", handleKeydown);
  return () => {
    window.removeEventListener("keydown", handleKeydown);
  };
}, [input, result]);

  return (
    <main className='w-[80dvw] md:w-md lg:w-lg'>
      <div className="flex flex-col gap-6 flex-wrap">
        <SwitchButton />
        <Screen result={ result } input={ input } />
        <ButtonGrid onButtonClick={ handleClick } />
      </div>
    </main>
  );
}
