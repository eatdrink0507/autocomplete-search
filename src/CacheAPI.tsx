import axios from "axios";

export class CacheAPI {
  static async getCache(data: string) {
    const cache = await caches.match(data);
    return cache ? cache.json().then((r) => r) : "nothing";
  }

  static createCache(str: string) {
    axios
      .get(`${import.meta.env.VITE_APP_API}/sick`, {
        params: { q: str },
      })
      .then(async (res) => {
        console.info("calling api");
        if (res.data.length) {
          (await caches.open(str)).put(str, new Response(JSON.stringify(res)));
        } else return "no result";
      });
  }
}
