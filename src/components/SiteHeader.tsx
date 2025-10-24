export default function SiteHeader() {
  return (
    <div className="mb-12">
      <div className="text-gray-900 dark:text-white font-medium">Kai Faust</div>
      <div className="text-gray-500 dark:text-gray-400 text-sm mt-1 flex items-center gap-1.5 md:justify-start justify-center">
        <span>Engineering</span>
        <div className="w-0.75 h-0.75 rounded-full bg-gray-500 dark:bg-gray-400 shrink-0"></div>
        <span>Design</span>
        <div className="w-0.75 h-0.75 rounded-full bg-gray-500 dark:bg-gray-400 shrink-0"></div>
        <span>AI</span>
      </div>
    </div>
  );
}
