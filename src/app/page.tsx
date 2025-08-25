import Link from 'next/link';
import Image from 'next/image';
import HelpSection from '@/components/help-section';

// Main component for the landing page
export default function HomePage() {
  return (
    <div className="space-y-16 my-8">
      {/* Hero Section */}
      <div className="hero min-h-[50vh] bg-base-200 rounded-box">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold tracking-tight">HNG単字検索</h1>
            <HelpSection />
            <Link href="/query" className="btn btn-primary btn-lg">
              検索ページへ
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12">
        <h2 className="text-4xl font-bold text-center mb-12">データベースの特長</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="card bg-base-100 shadow-xl border">
            <figure className="px-10 pt-10">
              <Image src="/images/dng/0001.png" alt="豊富な収録文字" width={100} height={100} className="bg-white p-2 rounded-full ring-2 ring-base-300" />
            </figure>
            <div className="card-body items-center text-center">
              <h3 className="card-title">豊富な収録文字</h3>
              <p>主要な篆書・隷書・楷書字典から、数万に及ぶ文字を網羅的に収録しています。</p>
            </div>
          </div>
          {/* Feature 2 */}
          <div className="card bg-base-100 shadow-xl border">
            <figure className="px-10 pt-10">
               <Image src="/images/dng/0002.png" alt="強力な検索機能" width={100} height={100} className="bg-white p-2 rounded-full ring-2 ring-base-300" />
            </figure>
            <div className="card-body items-center text-center">
              <h3 className="card-title">強力な検索機能</h3>
              <p>部首、画数、読み、部品など、多様な条件を組み合わせて目的の文字を素早く見つけ出せます。</p>
            </div>
          </div>
          {/* Feature 3 */}
          <div className="card bg-base-100 shadow-xl border">
            <figure className="px-10 pt-10">
               <Image src="/images/dng/0003.png" alt="詳細な字形情報" width={100} height={100} className="bg-white p-2 rounded-full ring-2 ring-base-300" />
            </figure>
            <div className="card-body items-center text-center">
              <h3 className="card-title">詳細な字形情報</h3>
              <p>異体字やつながり、出典情報など、各文字に関する詳細な学術的情報を提供します。</p>
            </div>
          </div>
        </div>
      </div>

       {/* Call to Action Section */}
      <div className="text-center py-12">
        <h2 className="text-3xl font-bold mb-4">さあ、始めましょう</h2>
        <p className="mb-8 text-lg max-w-2xl mx-auto">下のボタンから検索ページに移動して、古文字の世界を探索してください。</p>
        <Link href="/query" className="btn btn-primary btn-wide btn-lg">
          今すぐ検索
        </Link>
      </div>
    </div>
  );
}