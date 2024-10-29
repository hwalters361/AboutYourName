export default function Info({ name, data }) {
  return !data || !name ? (
    <p></p>
  ) : !data?.sprites || !data?.moves ? (
    <p>No data for {name}</p>
  ) : (
    <div>
      <h2>Here's {name} !</h2>
      <img src={data.sprites.front_shiny} alt="Pokémon info" />
      <ul>
        {data.moves.map((move, index) => (
          <li key={index}>
            <a href={move.move.url}>{move.move.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
