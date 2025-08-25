import GlyphCard from "@/components/glyph-card";

export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">画像読み込みテスト</h1>
      
      <div className="flex flex-wrap gap-4">
        <GlyphCard
          cardTitle="テスト画像 1"
          imgSrc="/images/dng/0001.png"
          sampleCount="10"
        />
        
        <GlyphCard
          cardTitle="テスト画像 2"
          imgSrc="/images/doh/0001.png"
          sampleCount="5"
        />
        
        <GlyphCard
          cardTitle="存在しない画像"
          imgSrc="/images/nonexistent/0001.png"
          sampleCount="0"
        />
        
        <GlyphCard
          cardTitle="間違ったパス"
          imgSrc="/wrong/path/image.png"
          sampleCount="3"
        />
      </div>
    </div>
  );
}