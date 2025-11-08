'use client';

import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t py-6 text-center text-sm text-neutral-500">
      <p>© {year} Emirhan Balcı. All rights reserved.</p>
      <p className="mt-1">
        Technical blog for System Administration & Web Backend.
      </p>
    </footer>
  );
}
