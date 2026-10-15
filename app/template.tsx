/** Re-mounts on every page change: temple doors swing open, then the page fades up. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="doors" aria-hidden="true">
        <div className="doors__leaf doors__leaf--l" />
        <div className="doors__leaf doors__leaf--r" />
        <span className="doors__om hi">ॐ</span>
      </div>
      <div className="page-in">{children}</div>
    </>
  );
}
