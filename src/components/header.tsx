"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { HeaderProps } from "@/types/components";
import SearchInput from "./ui/search-input";
import { cn } from "@/lib/utils";

function Header({
  title = "HNG単字検索",
  showSearch = true,
  searchProps = {},
  className,
}: HeaderProps) {
  const router = useRouter();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/query/${encodeURIComponent(query.charAt(0))}`);
    }
  };

  const navbarClasses = cn("navbar bg-base-100 shadow-sm", className);

  return (
    <div className={navbarClasses}>
      <div className="navbar-start">
        <Link className="btn btn-ghost text-xl font-bold" href="/">
          <span className="hidden sm:inline">{title}</span>
          <span className="sm:hidden">{title.slice(0, 3)}</span>
        </Link>
      </div>
      <div className="navbar-end">
        {" "}
        <Link className="btn btn-ghost btn-sm" href="/books">
          資料一覧
        </Link>
        <Link className="btn btn-ghost btn-sm hidden md:flex" href="/#help">
          使い方
        </Link>
        {showSearch && (
          <SearchInput
            onSearch={handleSearch}
            placeholder="文字を入力"
            size="sm"
            {...searchProps}
          />
        )}
      </div>
    </div>
  );
}

export default Header;
