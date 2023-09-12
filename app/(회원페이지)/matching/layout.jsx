import axios from "axios";

export default async function MatchingLayout({ application }) {
  const status = await axios.get('/api/matching/stauts')

  return ("")
}