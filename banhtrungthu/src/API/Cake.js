import { useState, useEffect } from "react";

function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function getData() {
      try {
        const res = await fetch(url, options);
        if (!res.ok) throw new Error("Lỗi khi fetch dữ liệu");
        const json = await res.json();
        if (!ignore) setData(json);
      } catch (err) {
        if (!ignore) setError(err);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    getData();

    return () => { ignore = true; };
  }, [url]);

  return { data, loading, error };
}
