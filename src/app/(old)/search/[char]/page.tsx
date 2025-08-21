async function OldSearchCharacterPage({params}:{params: Promise<{char: string}>}) {
  const { char } = await params;
  return (
    <div>
      <p>Character: {char}</p>
      <p>TODO: redirect to new search page</p>
    </div>
  )
}
export default OldSearchCharacterPage