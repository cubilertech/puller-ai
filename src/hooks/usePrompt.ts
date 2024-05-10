import { submitPromptPayload, Prompt } from "@/utils/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useSubmitPrompt = () => {
  const router = useRouter();

  async function submit(data: submitPromptPayload): Promise<Prompt | null> {
    try {
      const res = await axios({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v0/query/prompt`,
        method: "POST",
        data,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
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
      const id = data?.id?.includes("#") ? data?.id?.split("#")?.[1] : data?.id;
      setTimeout(() => {
        router.push(`/request/${id}/validate`);
      }, 1000);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? (error.message as string));
      console.log(error, "error in validating request");
    },
  });
};

export const useGetSinglePrompt = (promptId: string) => {
  const router = useRouter();
  async function submit(promptId: string): Promise<Prompt | null> {
    try {
      const encodedPromptId = encodeURIComponent(`query#${promptId}`);
      const res = await axios({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v0/query/prompt/${encodedPromptId}`,
        method: "GET",
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
    queryKey: ["single-prompt", promptId],
    queryFn: () => submit(promptId),
    enabled: false,
    //   refetchInterval: 60_000,
    // placeholderData: [],
  });
};

export const useGetAllPrompt = () => {
  // const router = useRouter();
  async function submit(): Promise<Prompt[] | null> {
    try {
      const res = await axios({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v0/query/prompt`,
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
    queryKey: ["all-prompt"],
    queryFn: submit,
    enabled: false,
    refetchInterval: 60_000,
    // placeholderData: [],
  });
};