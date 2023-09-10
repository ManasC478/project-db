"use client";

import Box from "@/components/Box";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import TextInput from "@/components/TextInput";
import { ChangeEvent, useRef, useState } from "react";

type SkillsProps = {
  skills: Array<string>;
};

type SkillInputProps = {
  handleAddSkill: (skill: string) => void;
};

export default function Skills({ skills }: SkillsProps) {
  const [updatedSkills, setUpdatedSkills] = useState<Array<string>>(skills);

  const handleAddSkill = (skill: string) => {
    setUpdatedSkills([...updatedSkills, skill]);
  };

  const handleDeleteSkill = (i: number) => {
    const filteredSkills = updatedSkills.filter((skill, index) => i !== index);
    setUpdatedSkills(filteredSkills);
  };

  return (
    <Box className='p-3'>
      <div className='flex flex-col space-y-3'>
        <SkillInput handleAddSkill={handleAddSkill} />
        <Box className='min-h-10 flex items-center flex-wrap p-2'>
          {updatedSkills.map((skill, i) => (
            <Box
              key={i}
              className='p-1 font-semibold bg-sky-200 text-sky-400 m-2 grid grid-cols-[1fr_22px] items-center'
            >
              <p className='break-all'>{skill}</p>
              <button onClick={() => handleDeleteSkill(i)}>
                <Icon name='Clear' />
              </button>
            </Box>
          ))}
        </Box>
      </div>
    </Box>
  );
}

function SkillInput({ handleAddSkill }: SkillInputProps) {
  const [skill, setSkill] = useState<string>("");

  const handleOnClick = () => {
    if (!skill) return;
    handleAddSkill(skill);
    setSkill("");
  };

  return (
    <div className='grid grid-cols-[1fr_100px]'>
      <TextInput
        type='text'
        value={skill}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSkill(e.target.value)
        }
      />
      <Button type='button' onClick={handleOnClick}>
        Add
      </Button>
    </div>
  );
}
