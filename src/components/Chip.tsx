/**
 * Kružić člana lige: profilna slika ako je ima (s rubom u boji člana), inače oznaka (inicijali) na boji člana.
 * Isti kružić je u utrci na karti, u traci lige i u popisima.
 */
export function Chip({
  src,
  color,
  className = "",
  style,
  title,
  children,
}: {
  src?: string | null;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <span className={"ghost-chip " + className + (src ? " pic" : "")} title={title} style={{ background: color, ...style }}>
      {src ? <img src={src} alt="" loading="lazy" decoding="async" draggable={false} /> : children}
    </span>
  );
}
