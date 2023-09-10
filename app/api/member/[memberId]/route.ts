import { UserError } from "@/util/error";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: any) {
  const requestUrl = new URL(req.url);
  const filters = requestUrl.searchParams.get("filter");
  const memberId = params.memberId;
  const supabase = createRouteHandlerClient({ cookies });

  try {
    const { data, error } = await supabase
      .from("members")
      .select(filters || "*")
      .eq("id", memberId);
    if (error) {
      throw new Error(error.message);
    }
    if (data?.length === 0) {
      throw new UserError("Member not found", 404);
    }

    return NextResponse.json({ success: true, data: data[0] }, { status: 200 });
  } catch (error: any) {
    console.log(error.message);

    if (error instanceof UserError) {
      return NextResponse.redirect(
        `${requestUrl.origin}/client-error?status=${error.status}&error=${error.message}`,
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
