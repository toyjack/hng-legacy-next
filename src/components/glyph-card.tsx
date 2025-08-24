function GlyphCard({ cardTitle, imgSrc, sampleCount }: { cardTitle: string; imgSrc: string; sampleCount: string }) {
  return (
    <div className="card w-32">
      <div className="card-body">
        <h2 className="card-title">{cardTitle}</h2>
      </div>

      <figure>
        <img
          className="w-full"
          src={imgSrc}
          alt={`Glyph ${cardTitle}`}
        />
      </figure>

      <div className="p-4 bg-base-100 w-full">
        <p className="text-center">{sampleCount}例</p>
      </div>
    </div>

  );
}
export default GlyphCard;
