export const FooterSection = () => {
  return (
    <footer className="section-surface-dark relative border-t border-border">
      <div className="container flex flex-col items-start justify-between gap-6 py-10 text-sm text-muted-foreground md:flex-row md:items-center">
        <p className="text-xs">
          © {new Date().getFullYear()} Sean Michael Borje. All rights reserved.
        </p>

        <p className="flex flex-wrap items-center gap-2 text-xs">
          Built with
          <span className="inline-flex items-center gap-1 text-foreground/80">
            <i className="devicon-react-original text-base" />
            React
          </span>
          , styled with
          <span className="inline-flex items-center gap-1 text-foreground/80">
            <i className="devicon-tailwindcss-plain text-base" />
            Tailwind CSS
          </span>
          , and deployed on
          <span className="inline-flex items-center gap-1 text-foreground/80">
            <i className="devicon-vercel-original text-base" />
            Vercel
          </span>
          .
        </p>
      </div>
    </footer>
  );
};
