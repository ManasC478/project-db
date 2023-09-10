"use client";

import Box from "@/components/Box";
import { Menu, MenuButton, MenuList } from "@/components/Menu";
import Select from "@/components/Select";
import TextInput from "@/components/TextInput";
import { ChangeEvent, useState } from "react";
import codes from "country-calling-code";

type PhoneNumberType = {
  country?: string | null;
  country_code?: string | null;
  number?: string | null;
};

type PersonalDataProps = {
  first_name: string | null;
  last_name: string | null;
  email: string;
  sex: string | null;
  phone_number: PhoneNumberType | null;
};

type PhoneInputProps = {
  phone: PhoneNumberType | null;
  changeISO: (e: ChangeEvent<HTMLSelectElement>) => void;
  changePhoneNum: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function PersonalData({
  first_name,
  last_name,
  sex,
  email,
  phone_number,
}: PersonalDataProps) {
  const [updatedPersonal, setUpdatePersonal] = useState<PersonalDataProps>({
    first_name,
    last_name,
    sex,
    email,
    phone_number: phone_number || { country: "", country_code: "", number: "" },
  });
  return (
    <Box className='flex flex-col gap-y-5 p-8'>
      <p className='text-xl font-bold'>Personal Information</p>
      <div className='grid grid-cols-3 gap-5 w-full'>
        <div>
          <p className='text-slate-400 font-semibold text-sm'>First Name</p>
          <TextInput
            name='first_name'
            value={updatedPersonal.first_name || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUpdatePersonal({
                ...updatedPersonal,
                first_name: e.target.value,
              })
            }
          />
        </div>
        <div>
          <p className='text-slate-400 font-semibold text-sm'>Last Name</p>
          <TextInput
            name='last_name'
            value={updatedPersonal.last_name || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUpdatePersonal({
                ...updatedPersonal,
                last_name: e.target.value,
              })
            }
          />
        </div>
        <div>
          <p className='text-slate-400 font-semibold text-sm'>Sex</p>
          <Select
            name='sex'
            value={updatedPersonal.sex || ""}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setUpdatePersonal({
                ...updatedPersonal,
                sex: e.target.value,
              })
            }
          >
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </Select>
        </div>
        <div>
          <p className='text-slate-400 font-semibold text-sm'>Email</p>
          <p>{email}</p>
        </div>
        <div>
          <p className='text-slate-400 font-semibold text-sm'>Phone Number</p>
          <PhoneInput
            phone={updatedPersonal.phone_number}
            changeISO={(e) =>
              setUpdatePersonal({
                ...updatedPersonal,
                phone_number: {
                  ...updatedPersonal.phone_number,
                  country: e.target.getAttribute("data-country") || null,
                  country_code: e.target.value || null,
                },
              })
            }
            changePhoneNum={(e) =>
              setUpdatePersonal({
                ...updatedPersonal,
                phone_number: {
                  ...updatedPersonal.phone_number,
                  number: e.target.value,
                },
              })
            }
          />
          <p></p>
        </div>
      </div>
    </Box>
  );
}

function PhoneInput({ phone, changeISO, changePhoneNum }: PhoneInputProps) {
  return (
    <div className='grid grid-cols-[100px_1fr]'>
      <div className='h-full'>
        <Select
          name='phone'
          value={phone?.country_code || ""}
          onChange={changeISO}
          className='h-full'
        >
          {codes.map((code, index) => (
            <option
              key={index}
              value={code.countryCodes[0]}
              data-country={code.country}
            >
              {code.country} (+{code.countryCodes[0]})
            </option>
          ))}
        </Select>
      </div>
      <TextInput
        type='number'
        value={phone?.number || ""}
        onChange={changePhoneNum}
      />
    </div>
  );
}
