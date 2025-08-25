import { getAllEntries, getItaiji } from "@/lib/data";

async function Home() {
  const itaiji = await getItaiji();
  const all = await getAllEntries();
  return (
    <div>
      {itaiji.slice(0,10).map((entry) => (
        <div key={entry}>
          {entry}
        </div>
      ))}

      <div>
        {all.slice(0,100).map((entry) => (
          <div key={entry.id}>
            {entry.entry} - {entry.variant} 
          </div>
        ))}
      </div>
    </div>
  );
}
export default Home;
