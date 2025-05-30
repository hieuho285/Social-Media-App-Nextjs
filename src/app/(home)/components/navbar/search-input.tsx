import { SearchIcon } from "lucide-react";

export default function SearchInput() {
  // TODO: Add search functionality
  return (
    <form className="flex w-full max-w-[600px]">
      <input
        type="text"
        placeholder="Search"
        className="w-full rounded-l-full border py-2 pr-12 pl-4 focus:border-blue-500 focus:outline-none"
      />
      <button
        type="submit"
        className="cursor-pointer rounded-r-full border border-l-0 bg-gray-100 px-5 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <SearchIcon size={20} />
      </button>
    </form>
  );
}
