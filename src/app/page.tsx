import CardContainer from "@/components/card-container";
import GlyphCard from "@/components/glyph-card";

function Home() {
  return (
    <div>
      <div className="text-4xl">すると、夜空に最初の流れ星が現れた。</div>
      <div className="text-4xl font-serif">
        すると、夜空に最初の流れ星が現れた。
      </div>
      <div className="text-4xl font-sans">
        すると、夜空に最初の流れ星が現れた。
      </div>
      <div className="text-4xl font-mono">
        すると、夜空に最初の流れ星が現れた。
      </div>
      <div className="flex gap-2 flex-wrap">
        <button className="btn btn-primary font-sans">primary</button>
        <button className="btn btn-secondary">secondary</button>
        <button className="btn btn-accent">accent</button>
        <button className="btn btn-info">info</button>
        <button className="btn btn-error">error</button>
        <button className="btn btn-success">success</button>
        <button className="btn btn-warning">warning</button>
      </div>

      <div>
        <input type="text" className="input" />
      </div>

      <CardContainer title="中国版本">
        <GlyphCard />
        <GlyphCard />
        <GlyphCard />
        <GlyphCard />
        <GlyphCard />
        <GlyphCard />
        <GlyphCard />
        <GlyphCard />
        <GlyphCard />
        <GlyphCard />
      </CardContainer>
    </div>
  );
}
export default Home;
