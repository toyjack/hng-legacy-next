"use client";

import Link from "next/link";
import { HeaderProps } from "@/types/components";
import SearchInput from "./ui/search-input";
import { cn } from "@/lib/utils";
import { Locale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

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

  const pathname = usePathname();

  const handleChangeLocale = (newLocale:Locale) => {
    router.push(pathname, { locale: newLocale });
  };

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
        <ul className="menu menu-horizontal px-1">
          <li>
            <details className="dropdown dropdown-end">
              <summary className="btn btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <g fill="none">
                    <path
                      d="M17.25 1a.75.75 0 0 1 .75.75V3h4.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V4.5h-9.5v.75a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 11.5 3h5V1.75a.75.75 0 0 1 .75-.75zm-3.5 5a.75.75 0 0 0 0 1.5h4.428L16.77 8.674a.75.75 0 0 0-.27.576v.25h-4.75a.75.75 0 0 0 0 1.5h4.75v2.734a.75.75 0 0 1-.966.718l-.569-.17a.75.75 0 0 0-.43 1.436l.569.171A2.25 2.25 0 0 0 18 13.734V11h4.25a.75.75 0 0 0 0-1.5h-4.128l2.608-2.174A.75.75 0 0 0 20.25 6h-6.5zm-5.361.477l-.049-.104a.73.73 0 0 0-1.315.087l-5.964 14.5l-.032.096a.754.754 0 0 0 .426.886a.73.73 0 0 0 .963-.402l1.547-3.76l.094.006h7.087l1.433 3.737l.042.092a.73.73 0 0 0 .91.334a.755.755 0 0 0 .418-.972l-5.56-14.5zm-3.74 9.809L7.81 8.747l2.947 7.539h-6.11z"
                      fill="currentColor"
                    />
                  </g>
                </svg>
              </summary>
              <ul className="menu dropdown-content bg-base-100 p-2 shadow rounded-box w-24 mt-4">
                <li>
                  <a className="text-primary" onClick={() => handleChangeLocale("ja")}>日本語</a>
                </li>
                <li>
                  <a className="text-primary" onClick={() => handleChangeLocale("zh")}>简体中文</a>
                </li>
                <li>
                  <a className="text-primary" onClick={() => handleChangeLocale("en")}>English</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
