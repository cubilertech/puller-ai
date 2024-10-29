import { UpdateCurrentPage } from "@/libs/redux/features/isLoadingRequest";
import { useAppDispatch } from "@/libs/redux/hooks";
import { getBackendURL } from "@/utils/common";
import { isClient, isDemoMode, isPilotMode } from "@/utils/constants";
import { submitExecutePayload, Query } from "@/utils/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export const useSubmitExecute = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = isClient ? localStorage.getItem("token") : "";
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const orgId = searchParams.get("orgId");
  async function submit(data: submitExecutePayload): Promise<Query | null> {
    try {
      const backendUrl = getBackendURL(
        process.env.NEXT_PUBLIC_MODE as string,
        projectId as string,
        orgId as string,
        true
      );
      const res = await axios({
        url: `${backendUrl}${isDemoMode ? "/execute" : "/query/execute"}`,
        method: "POST",
        data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
      const id = data?.id; // "run#1717580893"
      const formatedId = id?.replace(/^run#/, "");
      if (isPilotMode) {
        if (projectId && orgId) {
          router.push(
            `/request/results/${formatedId}?projectId=${projectId}&orgId=${orgId}`
          );
        } else {
          router.push(`/request/results/${formatedId}`);
        }
      }
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      // dispatch(UpdateIsLoadingRequest(false));
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
  const token = isClient ? localStorage.getItem("token") : "";
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const orgId = searchParams.get("orgId");
  async function submit(executeId: string): Promise<Query | null> {
    try {
      const backendUrl = getBackendURL(
        process.env.NEXT_PUBLIC_MODE as string,
        projectId as string,
        orgId as string,
        true
      );
      const encodedExecuteId = encodeURIComponent(
        `${isDemoMode ? "run#" : ""}${executeId}`
      );
      const res = await axios({
        url: `${backendUrl}${isDemoMode ? "/execute" : "/query/execute"}${encodedExecuteId}`,
        method: "get",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
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
  const token = isClient ? localStorage.getItem("token") : "";
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const orgId = searchParams.get("orgId");
  async function submit(): Promise<Query[] | null> {
    try {
      const backendUrl = getBackendURL(
        process.env.NEXT_PUBLIC_MODE as string,
        projectId as string,
        orgId as string,
        true
      );
      const res = await axios({
        url: `${backendUrl}${isDemoMode ? "/execute" : "/query/execute"}`,
        method: "get",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
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
