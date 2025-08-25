"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { HeaderProps } from "@/types/components";
import SearchInput from "./ui/search-input";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

function Header({
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

  const t = useTranslations();

  const navbarClasses = cn("navbar bg-base-100 shadow-sm", className);
  const title = t("navbarTitle");
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
          {t("bookList")}
        </Link>
        <Link className="btn btn-ghost btn-sm hidden md:flex" href="/#help">
          {t("helpBtn")}
        </Link>
        {showSearch && (
          <SearchInput
            onSearch={handleSearch}
            placeholder={t("inputText")}
            size="sm"
            {...searchProps}
          />
        )}
      </div>
    </div>
  );
}

export default Header;
