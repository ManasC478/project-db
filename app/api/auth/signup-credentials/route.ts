import { handleCredentials } from "@/util/auth";
import { UserError } from "@/util/error";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Member } from "@/supabase/api";

import type { AuthResponse } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const username = String(formData.get("username"));
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const supabase = createRouteHandlerClient({ cookies });

  try {
    handleCredentials(username, email, password);

    const { data, error: queryError }: any = await supabase
      .from("members")
      .select("email")
      .eq("email", email);

    if (queryError) {
      throw new Error(queryError.message);
    }

    if (data.length > 0) {
      throw new UserError("Email already exists", 400);
    }

    const { error: authError }: AuthResponse = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${requestUrl.origin}/api/auth/verify-email`,
        data: {
          username,
        },
      },
    });

    if (authError) {
      throw new Error(authError.message);
    }

    return NextResponse.redirect(
      `${requestUrl.origin}/auth/signup?message=Check your email for verification link`,
      {
        status: 301,
      }
    );
  } catch (error: any) {
    console.log(error.message);
    if (error instanceof UserError) {
      return NextResponse.redirect(
        `${requestUrl.origin}/auth/signup?error=${error.message}`,
        {
          status: 301,
        }
      );
    }

    return NextResponse.redirect(`${requestUrl.origin}/server-error`, {
      status: 301,
    });
  }
}
