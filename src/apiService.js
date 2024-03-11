async function fetchData(params) {
  let url = new URL(
    "http://api.taboola.com/1.0/json/taboola-templates/recommendations.get"
  );
  let neededParams = new Set([
    "publisher id",
    "app.type",
    "app.apikey",
    "source.id",
    "source.type",
    "count",
  ]);

  // make sure all required params are provided
  for (const key in params) {
    if (neededParams.has(key)) {
      neededParams.delete(key);
    }
    url.searchParams.append(key, params[key]);
  }
  if (neededParams.size) {
    throw new Error(
      `widget did not recieve all needed params, missing: ${[
        ...neededParams,
      ].join(", ")}`
    );
  }
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `response was not ok, res: ${res.status}, ${res.statusText}`
    );
  }
  const resJson = await res.json();
  if (!resJson || !resJson.list) {
    throw new Error("wrong data recieved");
  }
  return resJson.list;
}

export { fetchData };
