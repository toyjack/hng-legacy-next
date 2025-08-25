import { getBooks } from "@/lib/data"
import Link from "next/link";

async function BooksIndex() {
  const allBooks = await getBooks();
  return (
    <div>
      <h1>資料一覧</h1>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>No.(Code)</th>
            <th>ID</th>
            <th>区分</th>
            <th>文献名	</th>
            <th>略称</th>
            <th>作成年代</th>
            <th>標準</th>
            <th>公／私</th>
          </tr>
        </thead>
        <tbody>
          {allBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.code}</td>
              <td>{book.id}</td>
              <td>{book.type2}</td>
              <td>
                <Link href={`/books/${book.id}`} className="link link-hover">{book.title}</Link>
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
  )
}
export default BooksIndex