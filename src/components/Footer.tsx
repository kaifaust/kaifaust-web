export default function Footer() {
  return (
    <footer className="hidden md:block border-t border-gray-200 dark:border-gray-800 py-8 px-8">
      <div className="max-w-6xl mx-auto text-center text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Kai Faust. All rights reserved.
      </div>
    </footer>
  );
}
