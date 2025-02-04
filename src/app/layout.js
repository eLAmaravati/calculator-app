import { League_Spartan } from 'next/font/google';
import "./globals.css";

const spartan = League_Spartan({
  variable: "--font-spartan",
  subsets: [
    "latin"
  ],
  weight: '700'
})

export const metadata = {
  title: "Calculator App | Langit Amaravati",
  description: "A solution to the Calculator app challenge on Frontend Mentor. Coded by Langit Amaravati",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="default">
      <body className={`${spartan.variable} bg-background-main h-screen flex justify-center items-center dark:bg-magenta-950 light:bg-light-background`}>
        {children}
      </body>
    </html>
  );
}
