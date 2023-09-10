"use client";

import Box from "@/components/Box";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { ChangeEvent, useState } from "react";

type LinkInputProps = {
  links: Arra;
};

export default function Links() {
  return (
    <Box>
      <div>
        <p>links</p>
      </div>
    </Box>
  );
}

function LinkInput() {
  const [link, setLink] = useState<{ name: string; href: string }>({
    name: "",
    href: "",
  });

  const handleOnClick = () => {
    if (!link.name || !link.href) return;
  };

  return (
    <div className='flex flex-col space-y-2'>
      <TextInput
        type='text'
        value={link.name}
        name='name'
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setLink({ ...link, name: e.target.value })
        }
      />
      <TextInput
        type='text'
        value={link.href}
        name='href'
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setLink({ ...link, href: e.target.value })
        }
      />
      <Button type='button'>Add</Button>
    </div>
  );
}
