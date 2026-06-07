export function BlueprintFrame({ children, className = "" }) {
    return (
      <div className={`about-frame ${className}`.trim()}>
        <span className="about-frame__corner about-frame__corner--tl" aria-hidden="true" />
        <span className="about-frame__corner about-frame__corner--tr" aria-hidden="true" />
        <span className="about-frame__corner about-frame__corner--bl" aria-hidden="true" />
        <span className="about-frame__corner about-frame__corner--br" aria-hidden="true" />
        <span className="about-frame__guide about-frame__guide--top" aria-hidden="true" />
        <span className="about-frame__guide about-frame__guide--left" aria-hidden="true" />
        {children}
      </div>
    );
  }