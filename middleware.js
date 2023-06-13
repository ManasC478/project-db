import { NextResponse } from "next/server";
import { Cognito } from "./aws";

const res = NextResponse.next();

async function redirectIfAuthenticated(req) {
  const idToken = req.cookies.get("idt");
  if (idToken) {
    return NextResponse.redirect(
      new URL(`/member/${idToken.value}/dashboard`, req.url)
    );
  }
  return res;
}

async function redirectIfNotAuthenticated(req) {
  const accessToken = req.cookies.get("at")?.value;

  try {
    let accessPayload;
    if (!accessToken) {
      accessPayload = null;
    } else {
      accessPayload = await Cognito.verifyAuthToken("access", accessToken);
    }
    if (!accessPayload) {
      const username = req.cookies.get("idt")?.value;
      const refresh = req.cookies.get("rft")?.value;
      if (!refresh) {
        throw new Error("User not authenticated");
      }
      const { AuthenticationResult } = await Cognito.authenticateUser(
        "REFRESH_TOKEN_AUTH",
        username,
        {
          REFRESH_TOKEN: refresh,
        }
      );

      res.cookies.set("at", AuthenticationResult.AccessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        sameSite: "strict",
      });
    }

    return res;
  } catch (error) {
    console.log("/middleware/authorizeMember----------");
    console.log(error.message);
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
}

export async function middleware(req) {
  if (req.nextUrl.pathname.startsWith("/auth")) {
    return await redirectIfAuthenticated(req);
  } else {
    return await redirectIfNotAuthenticated(req);
  }
}

export const config = {
  matcher: ["/project/:path*", "/member/:path*", "/auth/:path*"],
};
