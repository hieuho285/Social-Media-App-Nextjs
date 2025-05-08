import Link from "next/link";

export default async function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <div className="flex items-center justify-center gap-4">
        <Link href={"/users/1"} className="text-blue-500 hover:underline">
          User
        </Link>
      </div>
    </div>
  );
}
