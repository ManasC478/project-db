"use client";
import {
  SupabaseClient,
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

// components
import { Menu, MenuList, MenuButton, MenuItem } from "@/components/Menu";
import { Avatar } from "@chakra-ui/react";
import Icon from "./Icon";
import { useEffect } from "react";

import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import Link from "next/link";

export default function ProfileNav({ user }: { user: User | null }) {
  const router = useRouter();
  const supabase: SupabaseClient = createClientComponentClient();

  useEffect(() => {
    supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        if (event == "SIGNED_IN" || event == "SIGNED_OUT") {
          router.refresh();
        }
      }
    );
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }
    } catch (error: any) {
      router.push("/server-error");
    }
  };

  return (
    <Menu>
      <MenuButton>
        <div className='flex space-x-2 items-center'>
          <Avatar size='sm' name={user?.user_metadata.username} />
          <p> {user?.user_metadata.username}</p>
        </div>
      </MenuButton>
      <MenuList>
        <Link href='/profile'>
          <MenuItem icon={<Icon name={"Profile"} />}>Profile</MenuItem>
        </Link>
        <Link href='/settings'>
          <MenuItem icon={<Icon name={"Settings"} />}>Settings</MenuItem>
        </Link>
        <button onClick={handleLogout}>
          <MenuItem icon={<Icon name={"Logout"} />}>Logout</MenuItem>
        </button>
      </MenuList>
    </Menu>
  );
}
