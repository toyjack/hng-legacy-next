import { getBooks } from "@/lib/data";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

async function BooksIndex() {
  const allBooks = await getBooks();
  const t = await getTranslations();
  return (
    <div>
      <h1 className="text-4xl font-bold py-2">{t("bookList")}</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>No.(Code)</th>
              <th>ID</th>
              <th>{t("kubun")}</th>
              <th>{t("titleOfBook")} </th>
              <th>{t("aliasOfBook")}</th>
              <th>{t("yearOfBook")}</th>
              <th>{t("standardOfBook")}</th>
              <th>{t("privateOfBook")}</th>
            </tr>
          </thead>
          <tbody>
            {allBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.code}</td>
                <td>{book.id}</td>
                <td>{book.type2}</td>
                <td>
                  <Link href={`/books/${book.id}`} className="link link-hover">
                    {book.title}
                  </Link>
                </td>
                <td>{book.alias}</td>
                <td>{book.year}</td>
                <td>{book.standard}</td>
                <td>{book.isPrivate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default BooksIndex;
