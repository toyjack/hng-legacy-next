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

      {/* name of each tab group should be unique */}
      <div className="tabs tabs-lift">
        <input
          type="radio"
          name="my_tabs_3"
          className="tab"
          aria-label="人"
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
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

        <input
          type="radio"
          name="my_tabs_3"
          className="tab"
          aria-label="Tab 2"
          defaultChecked
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          Tab content 2
        </div>

        <input
          type="radio"
          name="my_tabs_3"
          className="tab"
          aria-label="Tab 3"
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          Tab content 3
        </div>
      </div>
    </div>
  );
}
export default Home;
