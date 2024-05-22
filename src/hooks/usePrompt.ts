import {
  UpdateCurrentPage,
  UpdateIsLoadingPrompt,
  UpdateIsLoadingRequest,
} from "@/libs/redux/features/isLoadingRequest";
import { useAppDispatch } from "@/libs/redux/hooks";
import { getBackendURL } from "@/utils/common";
import { toastTimeout } from "@/utils/constants";
import { submitPromptPayload, Prompt } from "@/utils/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useSubmitPrompt = (
  handleConsoleMessages: (message: string) => void
) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  async function submit(data: submitPromptPayload): Promise<Prompt | null> {
    try {
      const backendUrl = getBackendURL(process.env.NEXT_PUBLIC_MODE as string);
      const res = await axios({
        url: `${backendUrl}/v0/query/prompt`,
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

  const { mutate, ...mutationProps } = useMutation({
    mutationFn: submit,
    onSuccess: async (data) => {
      // dispatch(UpdateIsLoadingRequest(false));
      const id = data?.id?.includes("#") ? data?.id?.split("#")?.[1] : data?.id;
      router.push( '/request', { param: { id: id } });
      // router.push(`/request?id=${id}`, `/request?id=${id}`, { shallow: true});
      // setTimeout(() => {
      //   router.push(`/request?id=${id}`);
      // }, 1000);
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      // dispatch(UpdateCurrentPage("validate"));
      // dispatch(UpdateIsLoadingRequest(false));
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? (error.message as string));
      console.log(error, "error in validating request");
    },
  });

  // Timeout logic
  let timeoutId: NodeJS.Timeout | null = null;
  const handleTimeout = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    handleConsoleMessages("Generating SQL");
    timeoutId = setTimeout(() => {
      handleConsoleMessages("Preparing Graph");
      timeoutId = setTimeout(() => {
        handleConsoleMessages("Finalizing");
        timeoutId = null;
      }, 2000); // Finalizing after 2 seconds of preparing graph
    }, 2000); // Preparing graph after 2 seconds of generating SQL
  };

  const customMutate = async (...args: Parameters<typeof mutate>) => {
    handleTimeout();
    await mutate(...args);
  };

  return { customMutate, ...mutationProps };
};

// export const useSubmitPrompt = () => {
//   const router = useRouter();
//   async function submit(data: submitPromptPayload): Promise<Prompt | null> {
//     try {
//       const res = await axios({
//         url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v0/query/prompt`,
//         method: "POST",
//         data,
//         headers: {
//           "Content-Type": "application/json",
//         },
//         withCredentials: true,
//       });
//       if (res.status === 200) {
//         return res.data;
//       } else {
//         return null;
//       }
//     } catch (error) {
//       console.error("Network error:", error);
//       return null;
//     }
//   }
//   return useMutation({
//     mutationFn: submit,
//     onSuccess: (data) => {
//       const id = data?.id?.includes("#") ? data?.id?.split("#")?.[1] : data?.id;
//       setTimeout(() => {
//         router.push(`/request?id=${id}`);
//       }, 1000);
//     },
//     onError: (error: any) => {
//       toast.error(error?.response?.data?.message ?? (error.message as string));
//       console.log(error, "error in validating request");
//     },
//   });
// };

export const useGetSinglePrompt = (promptId: string) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  async function submit(promptId: string): Promise<Prompt | null> {
    try {
      const backendUrl = getBackendURL(process.env.NEXT_PUBLIC_MODE as string);
      const encodedPromptId = encodeURIComponent(`query#${promptId}`);
      const res = await axios({
        url: `${backendUrl}/v0/query/prompt/${encodedPromptId}`,
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
        dispatch(UpdateCurrentPage("create"));
      }, toastTimeout);
      console.error("Network error:", error);
      return null;
    }
  }

  return useQuery({
    queryKey: ["single-prompt", promptId],
    queryFn: () => submit(promptId),
    enabled: false,
    onSuccess: () => {
      dispatch(UpdateIsLoadingRequest(false));
      dispatch(UpdateIsLoadingPrompt(false));
    },
    onError: () => {
      dispatch(UpdateCurrentPage("create"));
    },
    //   refetchInterval: 60_000,
    // placeholderData: [],
  });
};

export const useGetAllPrompt = () => {
  async function submit(): Promise<Prompt[] | null> {
    try {
      const backendUrl = getBackendURL(process.env.NEXT_PUBLIC_MODE as string);
      const res = await axios({
        url: `${backendUrl}/v0/query/prompt`,
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
