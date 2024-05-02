import { setActiveRequest } from "@/libs/redux/features/activeRequest";
import { useAppDispatch } from "@/libs/redux/hooks";
import { runQueryPayload, validateRequestPayload, validateRequestResponse } from "@/utils/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useValidate = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  async function submit(
    data: validateRequestPayload
  ): Promise<validateRequestResponse | null> {
    try {
      const res = await axios({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v0/query/prompt`,
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
      dispatch(setActiveRequest(data));
      setTimeout(() => {
        router.push("/request/abcd/validate");
      }, 1000);
    },
    onError: (err) => {
      console.log(err, "error in validating request");
    },
  });
};

export const useRunQuery = () => {
    // const dispatch = useAppDispatch();
    const router = useRouter();
  
    async function submit(
      data: runQueryPayload
    ): Promise<validateRequestResponse | null> {
      try {
        const res = await axios({
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v0/query/execute`,
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
        setTimeout(() => {
          router.push("/request/results");
        }, 1000);
      },
      onError: (err) => {
        console.log(err, "error in validating request");
      },
    });
  };

export const useGetQueryStatus = (executionID: string) => {
  async function submit() {
    try {
      const res = await axios({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v0/query/execute/${executionID}`,
        method: "get",
        headers: {
          accept: "application/json",
        },
      });
      if (res.status === 200) {
        return res.data;
      } else {
        return null;
      }
    } catch (error: any) {
      toast.error(error.message as string);
      console.error("Network error:", error);
      return null;
    }
  }

    return useQuery(
      ["query-status", executionID],
      submit,
      {
        refetchInterval: 10_000,
        enabled: false,
      }
    );
  };
