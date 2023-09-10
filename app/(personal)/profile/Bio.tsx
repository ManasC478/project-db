"use client";

import TextArea from "@/components/TextArea";
import TextInput from "@/components/TextInput";
import { ChangeEvent, useState } from "react";

type BioProps = {
  username: string;
  bio: string | null;
  available: boolean;
};

export default function Bio({ bio, username, available }: BioProps) {
  const [updatedBio, setUpdatedBio] = useState<BioProps>({
    bio,
    username,
    available,
  });

  return (
    <div>
      <p className='text-xl font-bold mb-3'>Biography</p>
      <form>
        <div className='flex flex-col gap-y-2'>
          <TextInput
            className='text-lg font-semibold'
            name='username'
            value={updatedBio.username}
            placeholder='Username'
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUpdatedBio({ ...updatedBio, username: e.target.value })
            }
          />
          <TextArea
            name='bio'
            value={updatedBio.bio || ""}
            placeholder='Description'
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setUpdatedBio({ ...updatedBio, bio: e.target.value })
            }
          />
          <div className='flex space-x-3 items-center'>
            <TextInput
              type='checkbox'
              name='available'
              checked={updatedBio.available}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUpdatedBio({ ...updatedBio, available: e.target.checked })
              }
              w='fit'
            />
            <p
              className={`${
                updatedBio.available ? "text-green-500" : "text-red-500"
              } font-semibold`}
            >
              Are you interested in joining new projects?
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
