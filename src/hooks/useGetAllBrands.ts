import { useCallback, useEffect, useState } from "react";
import { getBrands } from "../service/Brands";
import { Brands } from "../types/Brands.type";

export default function useGetAllBrands() {
  const [brands, setBrands] = useState<Brands[]>([]);

  const sendRequest = useCallback(async () => {
    try {
      const resp = await getBrands();

      if (resp.data.status) {
        setBrands(resp.data.data);
      }
    } catch (error) {}
  }, []);

  useEffect(() => {
    sendRequest();
  }, []);

  return {
    brands,
    sendRequest,
  };
}
