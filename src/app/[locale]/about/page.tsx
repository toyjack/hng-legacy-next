import LICENSE from "../../../../license.json"

async function AboutPage() {
  return (
    <div>
      <h1>About</h1>
      {LICENSE.map((item) => (
        <div key={item.name}>
          <h2>{item.name}</h2>
          <p>Author: {item.author}</p>
          <p>License Type: {item.licenseType}</p>
          <p>Link: <a href={item.link}>{item.link}</a></p>
        </div>
      ))}
    </div>
  )
}
export default AboutPage