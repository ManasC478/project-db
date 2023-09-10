import { Metadata } from "next";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { fetchData } from "@/util/fetch";
import { redirect } from "next/navigation";
import { cache } from "react";
import "server-only";

import type { Session } from "@supabase/auth-helpers-nextjs";
import type { AuthError } from "@supabase/supabase-js";

// components
import Box from "@/components/Box";
import Avatar from "./Avatar";
import Bio from "./Bio";
import PersonalData from "./PersonalData";
import Files from "./Files";
import Projects from "./Projects";
import Skills from "./Skills";
import Links from "./Links";

export const metadata: Metadata = {
  title: "Profile",
};

const getAuthUser = cache(async () => {
  const supabase = await createServerComponentClient({ cookies });
  const {
    data: { session },
    error,
  }: { data: { session: Session | null }; error: AuthError | null } =
    await supabase.auth.getSession();

  if (error) {
    redirect("/server-error");
  }
  return await fetchData(
    `/api/member/${session?.user.id}?filter=avatar_url,username,bio,available,first_name,last_name,email,links,sex,skills,phone_number`
  );
});

export default async function Profile() {
  const { data } = await getAuthUser();

  return (
    <div className='flex flex-col gap-y-10'>
      <Box className={"grid grid-cols-[128px_1fr] gap-x-10 p-8 relative"}>
        <Avatar avatar_url={data.avatar_url} />
        <Bio
          username={data.username}
          bio={data.bio}
          available={data.available}
        />
      </Box>
      <PersonalData
        first_name={data.first_name}
        last_name={data.last_name}
        email={data.email}
        sex={data.sex}
        phone_number={data.phone_number}
      />
      <Files />
      <Projects />
      <div className='grid grid-cols-2 gap-x-5'>
        <Skills skills={data.skills} />
        <Links />
      </div>
    </div>
  );
}
