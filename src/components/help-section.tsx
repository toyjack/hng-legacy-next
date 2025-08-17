import Link from "next/link";

function HelpSection() {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-center text-4xl font-bold">使い方</h2>

      <div className="text-xl pt-4 flex flex-col gap-2">
        <p>
          「漢字字体規範史データセット単字検索（略称：HNG単字検索）」は、「漢字字体規範史データセット」用の検索サービスです。「漢字字体規範史データセット」については、
          <Link className="link link-hover" href="https://www.hng-data.org/" target="_blank">こちら</Link>
          をご覧ください。
        </p>
        <p>
          検索窓に漢字1文字を入力して、検索ボタンを押してください。検索結果の一覧画面が表示されます。
        </p>
        <p>
          検索結果は、中国写本、中国版本、日本写本、日本版本、韓国資料、その他資料の6種に分けて、文字画像を表示します。
        </p>
        <p>
          文字画像の上には資料名の略称を記述しています。資料名の略称は、
          <Link className="link link-hover" href="https://www.hng-data.org/sources.ja.html" target="_blank">こちら</Link>
          をご覧ください。
        </p>
        <p>文字画像をクリックすると、文字の詳細情報が表示されます。</p>
        <p>
          また、文字画像の下には用例数を記述しています。用例数をクリックすると、文字のカード画像が表示されます。
        </p>
      </div>
    </div>
  );
}
export default HelpSection;
