'use client';

import React, { useState } from 'react';

interface ScriptCardProps {
  title: string;
  description: string;
  scriptContent: string;
  language: string;
  tags?: string[];
  requirements?: string[];
  usage?: string[];
  githubUrl?: string;
}

export default function ScriptCard({
  title,
  description,
  scriptContent,
  language,
  tags = [],
  requirements = [],
  usage = [],
  githubUrl,
}: ScriptCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(scriptContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  const getLanguageColor = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'bash':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'python':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'javascript':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'typescript':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
      {/* Script Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {description}
            </p>
          </div>
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLanguageColor(language)}`}
            >
              {language}
            </span>
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Usage and Requirements */}
        {(usage.length > 0 || requirements.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
            {usage.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Kullanım:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                  {usage.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {requirements.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Gereksinimler:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                  {requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* GitHub Link */}
        {githubUrl && (
          <div className="mt-4">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center"
            >
              GitHub'da Gör →
            </a>
          </div>
        )}
      </div>

      {/* Code Block */}
      <div className="relative">
        <pre className="bg-gray-900 text-gray-100 p-6 overflow-x-auto text-sm">
          <code>{scriptContent}</code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors"
        >
          {copied ? 'Kopyalandı!' : 'Kodu Kopyala'}
        </button>
      </div>
    </div>
  );
}

