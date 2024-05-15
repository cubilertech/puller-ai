import {
  UpdateCurrentPage,
  UpdateIsLoadingRequest,
} from "@/libs/redux/features/isLoadingRequest";
import { useAppDispatch } from "@/libs/redux/hooks";
import { submitExecutePayload, Query } from "@/utils/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useSubmitExecute = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  async function submit(data: submitExecutePayload): Promise<Query | null> {
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
    onSuccess: async (data) => {
      const id = data?.id?.includes("#") ? data?.id?.split("#")?.[1] : data?.id;
      router.push(`/request/results/${id}`);
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
      dispatch(UpdateIsLoadingRequest(false));
    },
    onError: (error: any) => {
      dispatch(UpdateCurrentPage("create"));
      toast.error(error?.response?.data?.message ?? (error.message as string));
      console.log(error, "error in validating request");
    },
  });
};

export const useGetSingleExecute = (executeId: string) => {
  const router = useRouter();
  async function submit(executeId: string): Promise<Query | null> {
    try {
      const encodedExecuteId = encodeURIComponent(`run#${executeId}`);
      const res = await axios({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v0/query/execute/${encodedExecuteId}`,
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
      toast.error(error?.response?.data?.message ?? (error.message as string));
      setTimeout(() => {
        router.push("/request");
      }, 5000);
      console.error("Network error:", error);
      return null;
    }
  }
  return useQuery({
    queryKey: ["single-execute", executeId],
    queryFn: () => submit(executeId),
    enabled: false,
    //   refetchInterval: 60_000,
    // placeholderData: [],
  });
};

export const useGetAllExecute = () => {
  async function submit(): Promise<Query[] | null> {
    try {
      const res = await axios({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v0/query/execute`,
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
      toast.error(error?.response?.data?.message ?? (error.message as string));
      console.error("Network error:", error);
      return null;
    }
  }

  return useQuery({
    queryKey: ["all-execute"],
    queryFn: submit,
    enabled: false,
    refetchInterval: 60_000,
    // placeholderData: [],
  });
};
