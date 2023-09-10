"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// components
import Button from "@/components/Button";
import Icon from "@/components/Icon";

export default function GoogleSignIn() {
  const supabase = createClientComponentClient();

  const handleSignin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `http://www.localhost:3000/api/auth/verify-email`,
        scopes:
          "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
      },
    });

    if (error) {
      console.log({ error });
    }
  };

  return (
    <Button
      bgcolor='bg-transparent'
      textcolor='text-black'
      className='border-2 border-slate-300 flex space-x-3 items-center justify-center'
      weight='font-semibold'
      type='submit'
      onClick={handleSignin}
    >
      <Icon name='Google-Colored' />
      <p>Sign Up with Google</p>
    </Button>
  );
}
