// api/reviews.js
export default async function handler(req, res) {
  const placeId = 'ChIJ1xmfJeJDYg0RR7MQ4bgvNwk'; // ← Tu Place ID
  const apiKey = 'AIzaSyArnDe_dIkbOhBFuw_czfGO1JZ_Uim0ITE'; // ← Tu API Key

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.result?.reviews) {
      return res.status(200).json([]);
    }

    const reviews = data.result.reviews.map(r => ({
      author_name: r.author_name,
      rating: r.rating,
      text: r.text,
      time: r.time,
      profile_photo_url: r.profile_photo_url
    }));

    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al cargar reseñas' });
  }
}