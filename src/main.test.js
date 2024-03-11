const { fetchData } = require("./apiService.js");

describe("main-fetchData", () => {
  test('given all params but source id should return missing source.id param"', async () => {
    await expect(
      fetchData({
        "publisher id": "taboola-templates",
        "app.type": "desktop",
        "app.apikey": "f9040ab1b9c802857aa783c469d0e0ff7e7366e4",
        "source.type": "video",
        "count": "20",
      })
    ).rejects.toThrow(
      "widget did not recieve all needed params, missing: source.id"
    );
  });

  test('given empty object should return missing all params"', async () => {
    await expect(fetchData({})).rejects.toThrow(
      "widget did not recieve all needed params, missing: publisher id, app.type, app.apikey, source.id, source.type, count"
    );
  });
  test('given no args should return missing all params"', async () => {
    await expect(fetchData()).rejects.toThrow(
      "widget did not recieve all needed params, missing: publisher id, app.type, app.apikey, source.id, source.type, count"
    );
  });
});
