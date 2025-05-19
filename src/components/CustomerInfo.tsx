'use client';

export default function CustomerInfo() {
  return (
    <aside className="
      w-full md:w-80 p-6 border-l rounded-md font-poppins text-sm
      bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400
      animate-gradient-x
      border-purple-300
      text-purple-900
      dark:text-pink-300
      dark:border-pink-700
      dark:from-black
      dark:via-purple-900
      dark:to-pink-700
      dark:animate-gradient-x-dark
      shadow-sm
    ">
      <h2 className="text-xl font-extrabold mb-4 select-none">Customer Info</h2>
      <div className="space-y-3">
        <p><strong className="text-purple-700 dark:text-pink-400">Name:</strong> John Doe</p>
        <p><strong className="text-purple-700 dark:text-pink-400">Email:</strong> john@example.com</p>
        <p><strong className="text-purple-700 dark:text-pink-400">Status:</strong> Active</p>
        <p><strong className="text-purple-700 dark:text-pink-400">Last Seen:</strong> 2 min ago</p>
        <p><strong className="text-purple-700 dark:text-pink-400">Platform:</strong> Web</p>
      </div>
    </aside>
  );
}
