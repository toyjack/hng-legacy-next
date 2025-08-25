import Link from "next/link";

function Footer() {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
      <aside className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm">
        <div>
          Copyright © 2019 - {new Date().getFullYear()} &nbsp;
          
        </div>
        <div>
          <Link href="https://www.hng-data.org/" target="_blank" className="link link-hover">
            漢字字体規範史データセット保存会
          </Link>
        </div>
      </aside>
    </footer>
  );
}
export default Footer;
