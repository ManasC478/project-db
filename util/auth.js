import { Cognito } from "../aws";
import { UserError } from "@/util/error";
import { cookies } from "next/headers";

export const handleCredentials = ({ username, email, password }) => {
  if (username.includes(" "))
    throw new UserError("Username cannot have spaces.", 400);
  else if (
    !email.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )
  )
    throw new UserError("Not valid email.", 400);
  else if (
    password.length < 8 ||
    !/[a-z]/.test(password) ||
    !/[0-9]/.test(password)
  )
    throw new UserError(
      "Password must be atleast 8 characters long and must have alteast 1 lowercase character and 1 numeric value",
      400
    );
};

export const createCookies = async (authTokens) => {
  const payload = await Cognito.verifyAuthToken("id", authTokens.IdToken);
  cookies().set("idt", payload["cognito:username"], {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
  });
  cookies().set("at", authTokens.AccessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
    sameSite: "strict",
  });
  cookies().set("rft", authTokens.RefreshToken, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
  });
};

export const isForbidden = (username) => {
  return username !== cookies().get("idt")?.value;
};
