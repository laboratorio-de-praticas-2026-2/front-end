import Link from "next/link";

export default function ChatWidget() {
  return (
    <Link
      href="/mensagens"
      aria-label="Abrir mensagens"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg flex items-center justify-center text-white transition-transform hover:scale-105"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-7 h-7"
      >
        <path d="M12 2C6.48 2 2 6.03 2 11c0 2.42 1.09 4.6 2.86 6.24L4 22l5.06-1.85C10.15 20.72 11.06 21 12 21c5.52 0 10-4.03 10-9s-4.48-10-10-10z" />
      </svg>
    </Link>
  );
}