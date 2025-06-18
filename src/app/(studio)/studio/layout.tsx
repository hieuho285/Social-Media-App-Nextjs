type StudioLayoutProps = {
  infinite: React.ReactNode;
  paginate: React.ReactNode;
};

export default async function StudioLayout({
  infinite,
  paginate,
}: StudioLayoutProps) {
  return (
    <div>
      {infinite}
      {paginate}
    </div>
  );
}
