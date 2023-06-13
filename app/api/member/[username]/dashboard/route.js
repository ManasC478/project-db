import { NextResponse } from "next/server";
import { Project, Member } from "@/mongodb/api";
import { Redis } from "@/redis";

export async function GET(req, { params }) {
  const username = params.username;
  try {
    // const cachedDashboard = await Redis.getIfObjectExists(req.nextUrl.pathname);
    // if (cachedDashboard) {
    //   return NextResponse.json({ success: true, data: cachedDashboard });
    // }

    const member = await Member.getMemberWithoutId(
      { username },
      {
        projects: 1,
        banned_projects: 1,
        saved_projects: 1,
        liked_projects: 1,
      }
    );

    let dashboardData = {};
    dashboardData.joined_projects = await Project.getProjects(
      member.projects.map((project) => project.project),
      {
        start_date: 1,
        end_date: 1,
        title: 1,
        description: 1,
        logo: 1,
        status: 1,
        availability: 1,
        tags: 1,
        members_size: { $size: "$members" },
        member: {
          $first: {
            $filter: {
              input: "$members",
              as: "member",
              cond: { $eq: ["$$member.member_username", username] },
            },
          },
        },
      }
    );

    dashboardData.banned_projects = await Project.getProjects(
      member.banned_projects,
      {
        start_date: 1,
        end_date: 1,
        title: 1,
        description: 1,
        logo: 1,
        status: 1,
        availability: 1,
        tags: 1,
        members_size: { $size: "$members" },
      }
    );

    dashboardData.saved_projects = await Project.getProjects(
      member.saved_projects,
      {
        start_date: 1,
        end_date: 1,
        title: 1,
        description: 1,
        logo: 1,
        status: 1,
        availability: 1,
        tags: 1,
        members_size: { $size: "$members" },
      }
    );

    dashboardData.liked_projects = await Project.getProjects(
      member.liked_projects,
      {
        start_date: 1,
        end_date: 1,
        title: 1,
        description: 1,
        logo: 1,
        status: 1,
        availability: 1,
        tags: 1,
        members_size: { $size: "$members" },
      }
    );

    // await Redis.setObject(req.nextUrl.pathname, dashboardData);
    return NextResponse.json({ success: true, data: dashboardData });
  } catch (error) {
    console.log("/api/member/[username]/dashboard----------");
    console.log(error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: error.status || 500 }
    );
  }
}
