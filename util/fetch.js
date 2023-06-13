import { redirect } from "next/navigation";

export const fetchData = async (url, options = {}) => {
  const res = await fetch(process.env.DEV_DOMAIN + url, options);
  const data = await res.json();
  if (res.status >= 500) {
    redirect("/error/server-error");
  } else if (res.status >= 400) {
    redirect(
      `/error/client-error?status=${res.status}&message=${data.message}`
    );
  }

  return data.data;
};
