import {
  createRouteHandlerClient,
  SupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const supabase: SupabaseClient = createRouteHandlerClient({ cookies });

const memberExists = async (email: string): Promise<boolean> => {
  const { data, error }: any = await supabase
    .from("members")
    .select("email")
    .eq("email", email);

  if (error) {
    throw new Error(error.message);
  }

  if (data.length > 0) {
    return true;
  }
  return false;
};

export default {
  memberExists,
};
