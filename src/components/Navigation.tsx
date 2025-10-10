import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-8 py-4">
        <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          Kai Faust
        </Link>
      </div>
    </nav>
  );
}
