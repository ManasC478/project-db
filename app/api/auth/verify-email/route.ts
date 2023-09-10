import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { UserError } from "@/util/error";

import type { UserResponse } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the Auth Helpers package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  try {
    if (code) {
      const supabase = createRouteHandlerClient({ cookies });
      await supabase.auth.exchangeCodeForSession(code);
      const {
        data: { user },
      }: UserResponse = await supabase.auth.getUser();

      if (!user) {
        throw new Error("No user");
      }

      const { data, error: selectError } = await supabase
        .from("members")
        .select("provider")
        .eq("id", user.id);

      if (selectError) {
        throw new Error(selectError.message);
      }

      if (data.length == 0) {
        const updatedMetaData: any = {
          avatar_url: process.env.S3_DEFAULT_AVATAR,
        };
        if (user.app_metadata.provider === "google") {
          updatedMetaData.username = user.user_metadata.name.replace(/\s/g, "");
        } else if (user.app_metadata.provider === "github") {
          updatedMetaData.username = user.user_metadata.user_name.replace(
            /\s/g,
            ""
          );
        }

        if (updatedMetaData.username < 2) {
          updatedMetaData.username += "12";
        } else if (updatedMetaData.username > 30) {
          updatedMetaData.username = updatedMetaData.username.slice(0, 30);
        }

        const {
          data: { user: updatedUser },
          error: updatedError,
        }: UserResponse = await supabase.auth.updateUser({
          data: updatedMetaData,
        });

        if (updatedError) {
          throw new Error(updatedError.message);
        }

        console.log(updatedUser?.user_metadata.username.length);

        const { error: insertError } = await supabase.from("members").insert({
          id: updatedUser?.id,
          created_at: updatedUser?.created_at,
          email: updatedUser?.email,
          username: updatedUser?.user_metadata.username,
          provider: updatedUser?.app_metadata.provider,
        });

        if (insertError) {
          throw new Error(insertError.message);
        }
      }
    }

    return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
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
