// src/app/beyond-business-and-management/global-hiring/layout.tsx
// Folder-level layout. Applies ONLY to this route.
//
// Nothing outside this folder is edited. The root layout still renders the
// master Header and Footer, so this file hides them on this page only, and
// renders the Beyond header and footer in their place.
//
// The hiding rule targets any <header>/<footer> WITHOUT the data-beyond-*
// attribute, so the Beyond versions stay visible. The rule exists only while
// this route is mounted: once you navigate to any other page, it is removed
// and the master Header and Footer reappear automatically.
import BeyondHeader from './BeyondHeader';
import BeyondFooter from './BeyondFooter';

export default function GlobalHiringLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        header:not([data-beyond-header]) { display: none !important; }
        footer:not([data-beyond-footer]) { display: none !important; }
      `}</style>

      <BeyondHeader />
      {children}
      <BeyondFooter />
    </>
  );
}
