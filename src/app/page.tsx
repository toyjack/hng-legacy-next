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
      <div className="flex gap-2">
        <button className="btn btn-primary font-sans">primary</button>
        <button className="btn btn-secondary">secondary</button>
        <button className="btn btn-accent">accent</button>
        <button className="btn btn-info">info</button>
        <button className="btn btn-error">error</button>
        <button className="btn btn-success">success</button>
        <button className="btn btn-warning">warning</button>
      </div>
    </div>
  );
}
export default Home;
