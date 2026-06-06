export function BlueprintGrid() {
  return (
    <div className="blueprint-grid" aria-hidden="true">
      <svg className="blueprint-grid__svg" preserveAspectRatio="none">
        {/* Main vertical divider — offset, not centered */}
        <line x1="54%" y1="0" x2="54%" y2="100%" className="blueprint-line blueprint-line--strong" />

        {/* Irregular horizontal guides — varying lengths */}
        <line x1="8%" y1="18%" x2="92%" y2="18%" className="blueprint-line" />
        <line x1="0" y1="42%" x2="38%" y2="42%" className="blueprint-line" />
        <line x1="62%" y1="42%" x2="100%" y2="42%" className="blueprint-line" />
        <line x1="12%" y1="68%" x2="88%" y2="68%" className="blueprint-line" />
        <line x1="54%" y1="82%" x2="100%" y2="82%" className="blueprint-line" />

        {/* Partial vertical accents */}
        <line x1="12%" y1="18%" x2="12%" y2="42%" className="blueprint-line" />
        <line x1="88%" y1="18%" x2="88%" y2="35%" className="blueprint-line" />
        <line x1="38%" y1="42%" x2="38%" y2="68%" className="blueprint-line" />
        <line x1="62%" y1="42%" x2="62%" y2="58%" className="blueprint-line" />
      </svg>

      {/* Corner + markers at key intersections */}
      <span className="blueprint-marker" style={{ top: "18%", left: "12%" }} />
      <span className="blueprint-marker" style={{ top: "18%", left: "54%" }} />
      <span className="blueprint-marker" style={{ top: "18%", left: "88%" }} />
      <span className="blueprint-marker" style={{ top: "42%", left: "12%" }} />
      <span className="blueprint-marker" style={{ top: "42%", left: "38%" }} />
      <span className="blueprint-marker" style={{ top: "42%", left: "54%" }} />
      <span className="blueprint-marker" style={{ top: "42%", left: "62%" }} />
      <span className="blueprint-marker" style={{ top: "68%", left: "38%" }} />
      <span className="blueprint-marker" style={{ top: "68%", left: "88%" }} />
      <span className="blueprint-marker" style={{ top: "82%", left: "54%" }} />
    </div>
  );
}
