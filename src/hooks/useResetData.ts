import { getBackendURL } from "@/utils/common";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const useResetData = () => {
  async function submit(): Promise<any> {
    try {
      const backendUrl = getBackendURL(process.env.NEXT_PUBLIC_MODE as string);
      const res = await axios({
        url: `${backendUrl}/reset`,
        method: "put",
      
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
