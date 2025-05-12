import Form from "next/form";
import Link from "next/link";

type Params = Promise<{
  id: string;
}>;
type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export default async function UserPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { id } = await params;
  const { q } = await searchParams;

  return (
    <div>
      <h1 className="text-2xl font-bold">User ID: {id}</h1>
      <p>Search Query: {q}</p>

      <Form action="">
        <input type="text" name="q" />
        <button type="submit">Submit</button>
      </Form>
      <Link href="/" prefetch={false}>
        Go to Home
      </Link>
    </div>
  );
}
