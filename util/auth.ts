import { UserError } from "./error";

export const handleCredentials = (
  username: string,
  email: string,
  password: string
) => {
  if (username.includes(" ") || username.length < 2 || username.length > 30)
    throw new UserError(
      "Username cannot have spaces and must have a length between 2 and 30 characters, inclusive.",
      400
    );
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
