export default async function handler(req, res) {
  const { endpoint, ...params } = req.query;

  if (!endpoint) {
    return res.status(400).json({ error: 'Endpoint não especificado.' });
  }

  try {
    let targetUrl = `https://tabuamare.api.br/api/v2/${endpoint}`;
    
    const queryParts = [];
    for (const key in params) {
      if (key !== 'endpoint') {
        queryParts.push(`${key}=${encodeURIComponent(params[key])}`);
      }
    }
    if (queryParts.length > 0) {
      targetUrl += `?${queryParts.join('&')}`;
    }

    const apiResponse = await fetch(targetUrl, {
      headers: { 'Accept': 'application/json' }
    });

    const data = await apiResponse.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}