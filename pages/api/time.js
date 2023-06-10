export default async function timeHandler(req, res) {
  const currentTime = new Date().toLocaleTimeString();

  res.json({ time: currentTime });
}
