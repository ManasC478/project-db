import { useState, useEffect, useContext, createContext } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { useSnackbar } from "notistack";

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}

function useAuthProvider() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const handleResponse = async (res, snackbar = "") => {
    if (res.status >= 500) {
      router.push("/error/server-error");
    } else if (res.status >= 400) {
      const data = await res.json();
      return data.message;
    } else {
      if (snackbar) {
        enqueueSnackbar(snackbar, { variant: "success" });
      }
      router.replace(`/member/${getCookie("idt")}/dashboard`);
    }
  };

  const signup = async (credentials) => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const error = handleResponse(res);
    return error;
  };

  const signin = async (credentials) => {
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const error = handleResponse(res);
    return error;
  };

  const createProject = async (project) => {
    const res = await fetch("/api/project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });

    const error = handleResponse(res, "New project created.");
    return error;
  };

  return {
    signup,
    signin,
    createProject,
  };
}
