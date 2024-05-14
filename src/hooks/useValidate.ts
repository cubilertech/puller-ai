import { Prompt, submitValidatePayload } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const useSubmitValidate = () => {
  async function submit(data: submitValidatePayload): Promise<Prompt | null> {
    try {
      const res = await axios({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v0/query/validate`,
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
    onSuccess: (data) => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? (error.message as string));
      console.log(error, "error in validating request");
    },
  });
};
