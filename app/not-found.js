import Link from 'next/link';
import { Terminal, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="text-center max-w-2xl">
        {/* Terminal Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-slate-900 mb-8 animate-pulse">
          <Terminal className="w-10 h-10 text-sky-400" />
        </div>

        {/* 404 Code */}
        <h1 className="text-6xl md:text-8xl font-bold text-slate-100 mb-4 font-mono">
          404
        </h1>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-bold text-slate-300 mb-4">
          Route Not Found
        </h2>

        <p className="text-slate-400 mb-8 text-lg">
          Belki de{' '}
          <code className="px-2 py-1 bg-slate-900 text-sky-400 rounded font-mono text-sm">
            grep
          </code>{' '}
          yapmayı denemelisin?
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-sky-500 text-white font-semibold hover:bg-sky-600 transition-colors"
          >
            <Home className="w-5 h-5" />
            Ana Sayfaya Dön
          </Link>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-700 text-slate-300 font-semibold hover:bg-slate-900 transition-colors"
          >
            <Search className="w-5 h-5" />
            Blog'da Ara
          </Link>
        </div>

        {/* Technical Note */}
        <div className="mt-12 p-4 bg-slate-900 rounded-lg border border-slate-800">
          <p className="text-xs font-mono text-slate-500">
            <span className="text-slate-400">$ </span>
            <span className="text-sky-400">ls -la</span> /app/routes
            <br />
            <span className="text-red-400">Error:</span> No such file or
            directory
          </p>
        </div>
      </div>
    </div>
  );
}
