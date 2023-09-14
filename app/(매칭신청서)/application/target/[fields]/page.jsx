

export default function Target({ params }) {
  const fields = params.fields.split('%2C')

  console.log(fields)

  return(
    <>
      {fields.map((f, i) => (
        <div key={i}>{f}</div>
      ))}
    </>
  )
}