import { redirect } from "next/navigation";

export const fetchData = async (url: string, options: any = {}) => {
  const res = await fetch(process.env.DEV_DOMAIN + url, options);
  const data = await res.json();

  return data;
};
