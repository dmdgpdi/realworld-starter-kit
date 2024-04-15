function ContentPageLayout({ children }: LayoutProps) {
  return (
    <div className="container page">
      <div className="row">{children}</div>
    </div>
  );
}

export { ContentPageLayout };
export type LayoutProps = React.HTMLAttributes<HTMLElement>;
