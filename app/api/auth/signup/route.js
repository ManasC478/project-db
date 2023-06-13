import { NextResponse } from "next/server";
import { Member } from "../../../../mongodb/api";
import { Cognito } from "../../../../aws";
import { handleCredentials } from "../../../../util/auth";

export async function POST(req) {
  const credentials = await req.json();
  try {
    handleCredentials(credentials);

    await Member.hasMember(credentials);

    const member = await Member.createMember(credentials);

    await Cognito.createUser({ ...credentials, _id: member._id });
    await Cognito.changeUserPassword({
      username: credentials.username,
      password: credentials.password,
    });
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  } catch (error) {
    console.log("/api/auth/signsup----------");
    console.log(error.message);

    return NextResponse.json(
      { success: false, message: error.message },
      { status: error.status || 500 }
    );
  }
}
