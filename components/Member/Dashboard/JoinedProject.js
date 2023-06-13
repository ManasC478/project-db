"use client";

import { availabilityColor, statusColor } from "@/util/color";
import Link from "next/link";

// components
import { Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

export default function JoinedProjects({ projects }) {
  return (
    <div>
      <Stack spacing={2}>
        <div className='flex justify-between items-center'>
          <h2 className='text-2xl text-slate-800'>Your Projects</h2>
          <Link href={"/project/create"}>
            <button className='rounded-md bg-slate-800 text-white px-3 py-2'>
              <AddIcon /> Create Project
            </button>
          </Link>
        </div>
        <Stack spacing={2}>
          {projects.map((project, index) => (
            <Stack
              key={index}
              spacing={3}
              direction={"row"}
              className='w-full min-h-fit bg-gray-200 shadow-md p-5'
            >
              <div className='h-52 w-52 bg-slate-500 shadow-md'></div>
              <Stack spacing={2} className='w-full h-full'>
                <div>
                  <p className='text-sm text-slate-400'>
                    {project.start_date.slice(0, 10)} -{" "}
                    {project.end_date?.slice(0, 10) || "Present"}
                  </p>
                  <h4 className='text-lg font-bold text-slate-800'>
                    {project.title}
                  </h4>
                </div>
                <p>{project.description}</p>
                <Stack spacing={5} direction={"row"}>
                  <Stack spacing={1}>
                    <p className='text-sm text-slate-500 font-bold'>Role</p>
                    <p>{project.member.role}</p>
                  </Stack>
                  <Stack spacing={1}>
                    <p className='text-sm text-slate-500 font-bold'>
                      Suspended
                    </p>
                    <p className='text-center'>
                      {project.member.suspended ? <CheckIcon /> : <CloseIcon />}
                    </p>
                  </Stack>
                  <Stack spacing={1}>
                    <p className='text-sm text-slate-500 font-bold'>Members</p>
                    <p className='text-center'>{project.members_size}</p>
                  </Stack>
                  <Stack spacing={1}>
                    <p className='text-sm text-slate-500 font-bold'>Status</p>
                    <p className={`text-${statusColor(project.status)}-500`}>
                      {project.status}
                    </p>
                  </Stack>
                  <Stack spacing={1}>
                    <p className='text-sm text-slate-500 font-bold'>
                      Availability
                    </p>
                    <p
                      className={`text-${availabilityColor(
                        project.availability
                      )}-500`}
                    >
                      {project.availability}
                    </p>
                  </Stack>
                </Stack>
                {/* use role in the project. add role to member docs */}
                <Stack spacing={1} direction={"row"}>
                  {project.tags.map((tag, index) => (
                    <p
                      key={index}
                      className='text-sm rounded bg-slate-300 text-slate-400 font-semibold py-1 px-3'
                    >
                      {tag}
                    </p>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </div>
  );
}
