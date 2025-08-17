import Link from "next/link";

function Header() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href="/">HNG単字検索</Link>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="検索"
          className="input input-bordered w-24 md:w-auto"
        />
        {/* <Link className="btn btn-ghost" href="/">使い方</Link> */}
      </div>
    </div>
  );
}
export default Header;
