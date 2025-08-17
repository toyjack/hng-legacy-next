import Link from "next/link";

function Footer() {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
      <aside>
        <p>
          Copyright © 2019 - {new Date().getFullYear()} &nbsp;
          <Link href="https://www.hng-data.org/" target="_blank" className="link link-hover">
            漢字字体規範史データセット保存会
          </Link>
        </p>
      </aside>
    </footer>
  );
}
export default Footer;
