"use client";
import { useState } from "react";

// components
import { Stack } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const validLink = (link) => {
  if (link.length > 8 && link.slice(0, 8) === "https://") return true;
  if (link.length > 7 && link.slice(0, 7) === "http://") return true;
  return false;
};

export default function LinksForm({ links, handleChange }) {
  const [link, setLink] = useState({ name: "", link: "" });

  const addLink = () => {
    if (link.name !== "" && link.link !== "" && validLink(link.link)) {
      handleChange("links", [...links, link]);
      setLink({ name: "", link: "" });
    }
  };

  const deleteLink = (link) => {
    const filteredLinks = links.filter((l) => l !== link);
    handleChange("links", filteredLinks);
  };

  return (
    <div className='p-3 shadow-md border-slate-200 border'>
      <Stack spacing={1}>
        <p className='text-md font-semibold text-slate-600'>
          Links -{" "}
          <small className='text-xs'>
            Add any links or sources related to your project.
          </small>
        </p>
        <Stack spacing={1}>
          <Stack
            spacing={1}
            alignItems={"end"}
            className='text-sm text-slate-600'
          >
            <input
              className='w-full px-2 py-1 border-slate-400 border'
              type='text'
              name='name'
              placeholder='Name'
              value={link.name}
              onChange={(e) =>
                setLink({ ...link, [e.target.name]: e.target.value })
              }
            />
            <input
              className='w-full px-2 py-1 border-slate-400 border'
              type='text'
              name='link'
              placeholder='Link'
              value={link.link}
              onChange={(e) =>
                setLink({ ...link, [e.target.name]: e.target.value })
              }
            />
            <button
              type='button'
              className='px-5 py-2 w-fit text-sm bg-slate-800 text-white rounded'
              onClick={addLink}
            >
              Add
            </button>
          </Stack>
          <div className='flex flex-wrap w-full text-md p-2 border-slate-400 border text-slate-600'>
            {links.map((link, index) => (
              <Stack
                key={index}
                direction={"row"}
                spacing={1}
                alignItems={"center"}
                className='px-3 m-1 py-1 text-sm font-bold h-fit shadow-md border-slate-200 border rounded'
              >
                <a href={link.link} target='_blank'>
                  {link.name}
                </a>
                <button type='button' onClick={() => deleteLink(link)}>
                  <ClearIcon fontSize={"small"} />
                </button>
              </Stack>
            ))}
          </div>
        </Stack>
      </Stack>
    </div>
  );
}
