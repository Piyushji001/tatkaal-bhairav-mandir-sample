type Props = {
  src?: string;
  alt: string;
  label: string;
  className?: string;
};

/** Shows the real photo when `src` is set in data/temple.ts, otherwise a labelled placeholder. */
export default function Photo({ src, alt, label, className = "" }: Props) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={`photo ${className}`} loading="lazy" />;
  }
  return (
    <div className={`photo photo--empty ${className}`} role="img" aria-label={alt}>
      <span>{label}</span>
    </div>
  );
}
