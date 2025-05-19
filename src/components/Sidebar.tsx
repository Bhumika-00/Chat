'use client';
import { useState } from 'react';
import { useTheme } from "next-themes";

export default function Sidebar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <aside
      className={`
        w-full md:w-16
        text-purple-900 dark:text-pink-300
        border-r border-purple-300 dark:border-purple-800
        flex md:flex-col items-center justify-between md:justify-start
        py-6 px-4 shadow-md font-poppins relative
        bg-gradient-to-r bg-[length:200%_200%]
        ${theme === 'dark' ? 'from-black via-purple-900 to-pink-900 animate-gradient-x-dark' : 'from-purple-50 via-pink-100 to-purple-100 animate-gradient-x'}
      `}
    >
      <div className="text-purple-700 dark:text-pink-400 font-extrabold text-2xl select-none">IC</div>
      <nav className="flex md:flex-col gap-6 mt-6 text-2xl">
        <button
          title="Inbox"
          className="hover:text-purple-600 dark:hover:text-pink-400 transition"
        >
          📥
        </button>
        <button
          title="Users"
          className="hover:text-purple-600 dark:hover:text-pink-400 transition"
        >
          👥
        </button>
        <button
          title="Settings"
          className="hover:text-purple-600 dark:hover:text-pink-400 transition"
        >
          ⚙️
        </button>
        <button
          title="Notifications"
          onClick={() => setShowNotifications(!showNotifications)}
          className="hover:text-purple-600 dark:hover:text-pink-400 transition relative"
        >
          🔔
        </button>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          title="Toggle Theme"
          className="hover:text-purple-600 dark:hover:text-pink-400 transition"
        >
          🌓
        </button>
      </nav>

      {showNotifications && (
        <div className="absolute top-16 md:top-auto md:left-16 w-60 bg-purple-100 dark:bg-pink-900 p-4 shadow-lg rounded-lg text-purple-900 dark:text-pink-200 font-medium text-sm border border-purple-300 dark:border-pink-700">
          <p className="mb-2">✨ New user joined</p>
          <p>💬 Message received</p>
        </div>
      )}

      <style jsx>{`
        .font-poppins {
          font-family: 'Poppins', sans-serif;
        }
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes gradient-x-dark {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 6s ease infinite;
          background-size: 200% 200%;
        }
        .animate-gradient-x-dark {
          animation: gradient-x-dark 6s ease infinite;
          background-size: 200% 200%;
        }
      `}</style>
    </aside>
  );
}
