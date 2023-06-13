import { NextResponse } from "next/server";
import { Project, Member } from "../../../mongodb/api";
// import { Cognito } from "../../../aws";
// import { handleCredentials } from "../../../util/auth";

export async function POST(req) {
  const username = req.cookies.get("idt").value;
  const projectData = await req.json();
  try {
    const project = await Project.createProject(projectData, username);

    await Member.addProject(username, project._id);

    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (error) {
    console.log("/project/controllers/createProject----------");
    console.log(error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: error.status || 500 }
    );
  }
}
