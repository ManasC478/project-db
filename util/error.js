import { redirect } from "next/navigation";

export class UserError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export const handleApiError = (status, message) => {
  try {
    if (status >= 500) {
      redirect("http://localhost:3001/error/server-error");
    }
  } catch (error) {
    console.log(error.message);
  }
  if (status >= 400) {
    return { message, status };
  }

  return {};
};
