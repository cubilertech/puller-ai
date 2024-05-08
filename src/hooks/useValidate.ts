// import { useAppDispatch } from "@/libs/redux/hooks";
import { Prompt, submitValidatePayload } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
// import { useRouter } from "next/navigation";

export const useSubmitValidate = () => {
  //   const dispatch = useAppDispatch();
  //   const router = useRouter();

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
    onSuccess: (data) => {
      // dispatch(setActiveRequest(data));
      // setTimeout(() => {
      //   router.push("/request/abcd/validate");
      // }, 1000);
    },
    onError: (err) => {
      console.log(err, "error in validating request");
    },
  });
};
