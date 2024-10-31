import { getBackendURL } from "@/utils/common";
import { isClient, MODES } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const useResetData = () => {
  const token = isClient ? localStorage.getItem("token") : "";
  async function submit(): Promise<any> {
    try {
      const backendUrl = getBackendURL(
        MODES.DEMO as string,
        undefined,
        undefined,
        true
      );
      const res = await axios({
        url: `${backendUrl}/reset`,
        method: "put",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error("Failed to reset data");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? (error.message as string));
      console.error("Network error:", error);
      throw error; // Rethrow the error so that React Query handles it
    }
  }

  return useMutation({
    mutationFn: submit,
    onSuccess: (data) => {
      if (data) {
        toast.success("Data reset successfully");
      } else {
        toast.error("Failed to reset data");
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? (error.message as string));
      console.log(error, "error in validating request");
    },
  });
};
