"use client";
import { useState, useEffect } from "react";
export default function SwitchButton()
{
  const [theme, setTheme] = useState(null); // Awalnya null untuk mencegah SSR issue

  useEffect(() =>
  {
    const storedTheme = localStorage.getItem("theme") || "default";
    setTheme(storedTheme);
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, []);

  const handleThemeChange = (value) =>
  {
    setTheme(value);
    localStorage.setItem("theme", value);
    document.documentElement.setAttribute("data-theme", value);
  };

  // if (theme === null) return null;

  return (
    <div className="flex justify-between items-end">
      <h1 className='sr-only'>Calculator Application</h1>
      <p className='text-2xl font-bold text-white light:text-neutral-900'>calc</p>

      <div className="grid grid-cols-2 grid-rows-2 gap-x-4">
        <p className="col-span-1 row-span-2 place-self-end text-sm tracking-widest text-white light:text-neutral-900">THEME</p>

        {/* Label Angka */ }
        <div className="grid grid-cols-3 place-content-center gap-4 text-center text-white light:text-neutral-900">
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </div>

        {/* Switch */ }
        <form className="grid grid-cols-3 gap-4 rounded-full bg-background-toggle p-2 dark:bg-magenta-900 light:bg-light-background-toggle">
          { ["default", "light", "dark"].map((value) => (
            <label key={ value } className="relative cursor-pointer">
              <input
                type="radio"
                name="theme"
                value={ value }
                checked={ theme === value }
                onChange={ () => handleThemeChange(value) }
                className="peer hidden"
              />
              <span
                className={ `block size-4 rounded-full transition-all ${theme === value ? "bg-default-key-total hover:bg-default-key-total-hover dark:bg-amber-400 dark:hover:bg-amber-300 light:bg-orange-400 light:hover:bg-amber-500" : "bg-transparent"
                  }` }
              />
            </label>
          )) }
        </form>
      </div>
    </div>
  );
}
