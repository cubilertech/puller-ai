import { getBackendURL } from "@/utils/common";
import { isPilotMode } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useSubmitLogin = () => {
  const router = useRouter();

  async function submit(data: any): Promise<any | null> {
    try {
      const backendUrl = getBackendURL(process.env.NEXT_PUBLIC_MODE as string);
      const res = await axios({
        url: `${backendUrl}/v0/login`,
        method: "POST",
        data,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        return res.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Network error:", error);
      return null;
    }
  }
  return useMutation({
    mutationFn: submit,
    onSuccess: async (data) => {
      //   const id = data?.id; // "run#1717580893"
      //   const formatedId = id?.replace(/^run#/, "");

      if (isPilotMode) {
        if (data.authentication) {
          document.cookie = `token=${data.authentication.token}; path=/; secure; samesite=strict`;
          localStorage.setItem("token", data.authentication?.token);
          router.push("/request");
        }
        if (data.challenge && data.challenge === "NEW_PASSWORD_REQUIRED") {
          localStorage.setItem("challenge", data?.challenge);
          localStorage.setItem("session", data?.session);
          router.push("/challenge");
        }
        //   router.push(`/request/results/${formatedId}`);
      }
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      // dispatch(UpdateIsLoadingRequest(false));
    },
    onError: (error: any) => {
      // dispatch(UpdateCurrentPage("create"));
      toast.error(error?.response?.data?.message ?? (error.message as string));
      console.log(error, "error in validating request");
    },
  });
};

export const useSubmitNewPassword = () => {
  const router = useRouter();

  async function submit(data: any): Promise<any | null> {
    try {
      const backendUrl = getBackendURL(process.env.NEXT_PUBLIC_MODE as string);
      const res = await axios({
        url: `${backendUrl}/v0/login/challenge`,
        method: "POST",
        data,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        return res.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Network error:", error);
      return null;
    }
  }
  return useMutation({
    mutationFn: submit,
    onSuccess: async (data) => {
      if (data.authentication) {
        document.cookie = `token=${data.authentication.token}; path=/; secure; samesite=strict`;
        localStorage.setItem("token", data.authentication?.token);
        router.push("/request");
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? (error.message as string));
      console.log(error, "error in validating request");
    },
  });
};
