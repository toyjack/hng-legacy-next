type Props = { title: string; children: React.ReactNode };

function CardContainer({ title, children }: Props) {
  return (
    <div className="shadow-md p-4 mb-4 bg-base-200">
      <h4 className="font-bold text-2xl py-2 md:py-4">{title}</h4>
      <div className="flex overflow-x-auto md:flex-wrap gap-2 md:gap-4">
        {children}
      </div>
    </div>
  );
}
export default CardContainer;
