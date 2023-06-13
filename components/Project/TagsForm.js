"use client";
import { useState } from "react";

// components
import { Stack } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export default function TagsForm({ tags, handleChange }) {
  const [tag, setTag] = useState("");
  const addTag = () => {
    if (tag) {
      handleChange("tags", [...tags, tag]);
      setTag("");
    }
  };

  const deleteTag = (tag) => {
    const filteredTags = tags.filter((t) => t !== tag);
    handleChange("tags", filteredTags);
  };

  return (
    <div className='p-3 shadow-md border-slate-200 border'>
      <Stack spacing={1}>
        <p className='text-md font-semibold text-slate-600'>Tags</p>
        <Stack spacing={1}>
          <Stack
            direction={"row"}
            spacing={2}
            className='flex text-md text-slate-600'
          >
            <input
              className='w-full px-2 py-1 border-slate-400 border'
              type='text'
              name='tag'
              placeholder='Name'
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
            <button
              type='button'
              className='px-5 text-sm bg-slate-800 text-white rounded'
              onClick={addTag}
            >
              Add
            </button>
          </Stack>
          <div className='flex flex-wrap w-full text-md p-2 border-slate-400 border text-slate-600'>
            {tags.map((tag, index) => (
              <Stack
                key={index}
                direction={"row"}
                spacing={1}
                alignItems={"center"}
                className='px-3 m-1 py-1 text-sm font-bold h-fit bg-sky-200 text-sky-600 rounded'
              >
                <p>{tag}</p>
                <button type='button' onClick={() => deleteTag(tag)}>
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
