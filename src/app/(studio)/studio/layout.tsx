import { HydrateClient, prefetch, trpc } from "@/trpc/server";

type StudioLayoutProps = {
  section: React.ReactNode;
};

export default async function StudioLayout({ section }: StudioLayoutProps) {
  prefetch(trpc.studio.getMany.infiniteQueryOptions({}));
  return <HydrateClient>{section}</HydrateClient>;
}
