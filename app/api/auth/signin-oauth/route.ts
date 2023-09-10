import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { Provider, OAuthResponse } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const provider = requestUrl.searchParams.get("provider") as Provider;
  const supabase = createRouteHandlerClient({ cookies });

  try {
    if (!provider) {
      throw new Error("No provider selected");
    }

    let scopes: string;
    if (provider === "google") {
      scopes =
        "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
    } else {
      scopes = "read:user user:email";
    }

    const { data, error }: OAuthResponse = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${requestUrl.origin}/api/auth/verify-email`,
        scopes,
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    return NextResponse.redirect(data.url, {
      status: 301,
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.redirect(`${requestUrl.origin}/server-error`, {
      status: 301,
    });
  }
}
