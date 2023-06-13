import { isForbidden } from "@/util/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { fetchData } from "@/util/fetch";

// components
import JoinedProjects from "@/components/Member/Dashboard/JoinedProject";

async function getDashboard(username) {
  return await fetchData(`/api/member/${username}/dashboard`);
}

export default async function Dashboard({ params }) {
  const cookieStore = cookies();
  if (isForbidden(params.username)) {
    redirect(`/member/${cookieStore.get("idt")?.value}/dashboard`);
  }
  const data = await getDashboard(params.username);

  return (
    <div>
      <JoinedProjects projects={data.joined_projects} />
    </div>
  );
}
