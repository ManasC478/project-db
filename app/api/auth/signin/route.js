import { NextResponse } from "next/server";
import { Member } from "../../../../mongodb/api";
import { Cognito } from "../../../../aws";
import { createCookies } from "../../../../util/auth";

export async function POST(req) {
  const credentials = await req.json();

  try {
    const member = await Member.verifyMemberCredentials(credentials);

    const { AuthenticationResult } = await Cognito.authenticateUser(
      "ADMIN_USER_PASSWORD_AUTH",
      member.username,
      {
        USERNAME: member.username,
        PASSWORD: credentials.password,
      }
    );

    await createCookies(AuthenticationResult);

    return NextResponse.json({ success: true, member }, { status: 200 });
  } catch (error) {
    console.log("/api/auth/signin----------");
    console.log(error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: error.status || 500 }
    );
  }
}
