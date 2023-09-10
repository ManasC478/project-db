import { UserError } from "@/util/error";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { compare } from "bcrypt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const supabase = createRouteHandlerClient({ cookies });

  try {
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      if (authError.message === "Invalid login credentials") {
        throw new UserError(authError.message);
      }
      throw new Error(authError.message);
    }

    return NextResponse.redirect(`${requestUrl.origin}/dashboard`, {
      status: 301,
    });
  } catch (error: any) {
    console.log(error.message);

    if (error instanceof UserError) {
      return NextResponse.redirect(
        `${requestUrl.origin}/auth/signin?error=${error.message}`,
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
