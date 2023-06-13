"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

// components
import { Stack } from "@mui/material";
import TagsForm from "@/components/Project/TagsForm";
import LinksForm from "@/components/Project/LinksForm";

export default function CreateForm({}) {
  const router = useRouter();
  const { createProject } = useAuth();

  const [project, setProject] = useState({
    title: "",
    description: "",
    qualifications: "",
    tags: [],
    links: [],
    max_members: 10,
    request_limit: 3,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (name, value) => {
    setProject({ ...project, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const error = await createProject(project);
    if (error) {
      setError(error);
    }

    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p className='text-lg text-red-400 mb-2'>{error}</p>
        <Stack spacing={5}>
          <div className='p-8 shadow-md border-slate-200 border'>
            <h3 className='text-xl mb-3 font-bold'>Project Information</h3>
            <Stack spacing={2}>
              <Stack spacing={1}>
                <p className='text-md font-semibold text-slate-600'>Title</p>
                <input
                  required
                  className='w-full text-md px-2 py-1 border-slate-400 border text-slate-600'
                  type='text'
                  name='title'
                  // value={project.title}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </Stack>
              <Stack spacing={1}>
                <p className='text-md font-semibold text-slate-600'>
                  Description -{" "}
                  <small className='text-xs'>
                    The description of the project.
                  </small>
                </p>
                <textarea
                  className='w-full text-md px-2 py-1 border-slate-400 border text-slate-600'
                  type='text'
                  name='description'
                  //   value={title}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </Stack>
              <Stack spacing={1}>
                <p className='text-md font-semibold text-slate-600'>
                  Qualifications -{" "}
                  <small className='text-xs'>
                    The expected qualifications needed in order to join the
                    project.
                  </small>
                </p>
                <textarea
                  className='w-full text-md px-2 py-1 border-slate-400 border text-slate-600'
                  type='text'
                  name='qualifications'
                  //   value={title}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </Stack>
            </Stack>
          </div>
          <div className='p-8 shadow-md border-slate-200 border'>
            <h3 className='text-xl mb-3 font-bold'>Project Details</h3>
            <Stack spacing={2}>
              <Stack direction={"row"} spacing={2} className='grid grid-cols-2'>
                <TagsForm tags={project.tags} handleChange={handleChange} />
                <LinksForm links={project.links} handleChange={handleChange} />
              </Stack>
              <Stack spacing={1}>
                <p className='text-md font-semibold text-slate-600'>
                  Maximum Member -{" "}
                  <small className='text-xs'>
                    The maximum number of members allowed in this project. This
                    value can be changed later.
                  </small>
                </p>
                <input
                  className='w-full text-md px-2 py-1 border-slate-400 border text-slate-600'
                  type='number'
                  defaultValue={10}
                  min={1}
                  name='max_members'
                  //   value={title}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </Stack>
              <Stack spacing={1}>
                <p className='text-md font-semibold text-slate-600'>
                  Request Limit -{" "}
                  <small className='text-xs'>
                    The period of time until which a denied join request can
                    send a new request to join. Minimum and default is 3 months.
                  </small>
                </p>
                <input
                  className='w-full text-md px-2 py-1 border-slate-400 border text-slate-600'
                  type='number'
                  defaultValue={3}
                  min={3}
                  max={24}
                  name='request_limit'
                  //   value={title}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </Stack>
            </Stack>
          </div>
          <Stack
            direction={"row"}
            spacing={2}
            className='flex justify-end text-md'
          >
            <button
              onClick={() => router.back()}
              className='rounded px-5 py-2 bg-slate-300'
              type='button'
            >
              Cancel
            </button>
            <button
              className='rounded px-5 py-2 bg-slate-800 text-white'
              type='submit'
              disabled={loading}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </Stack>
        </Stack>
      </form>
    </div>
  );
}
