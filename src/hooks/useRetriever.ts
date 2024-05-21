import { getBackendURL } from "@/utils/common";
import { Retriever, appUpdatePayload } from "@/utils/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import App from "next/app";
import { toast } from "react-toastify";

export const useGetAllPrompt = () => {
  async function submit(): Promise<Retriever[] | null> {
    try {
      const backendUrl = getBackendURL(process.env.NEXT_PUBLIC_MODE as string);
      const res = await axios({
        url: `${backendUrl}/v0/query/retriever`,
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
    queryKey: ["all-retrievers"],
    queryFn: submit,
    enabled: false,
    refetchInterval: 60_000,
    // placeholderData: [],
  });
};

export const useGetAllApps = () => {
  async function submit(): Promise<App[] | null> {
    try {
      const backendUrl = getBackendURL(process.env.NEXT_PUBLIC_MODE as string);
      const res = await axios({
        url: `${backendUrl}/v0/query/retriever/apps`,
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
    queryKey: ["all-apps"],
    queryFn: submit,
    enabled: false,
    refetchInterval: 60_000,
    // placeholderData: [],
  });
};

export const useUpdateAppStatus = () => {
  //   const dispatch = useAppDispatch();
  async function submit(data: appUpdatePayload): Promise<App[] | null> {
    try {
      const backendUrl = getBackendURL(process.env.NEXT_PUBLIC_MODE as string);
      const res = await axios({
        url: `${backendUrl}/v0/query/retriever/apps/${data.id}`,
        method: "put",
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
      // dispatch(UpdateIsLoadingRequest(false));
      toast.success("App status updated successfully.");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? (error.message as string));
      console.log(error, "error in updating status");
    },
  });
};

// export const useUploadAppData = () => {
//   // const dispatch = useAppDispatch();
//   async function submit(data: submitValidatePayload): Promise<Prompt | null> {
//     try {
//       const backendUrl = getBackendURL(process.env.NEXT_PUBLIC_MODE as string);
//       const res = await axios({
//         url: `${backendUrl}/v0/query/validate`,
//         method: "POST",
//         data,
//         headers: {
//           "Content-Type": "application/json",
//         },
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
//       dispatch(UpdateIsLoadingRequest(false));
//       toast.success('Variables updated successfully.');
      
//     },
//     onError: (error: any) => {
//       toast.error(error?.response?.data?.message ?? (error.message as string));
//       console.log(error, "error in validating request");
//     },
//   });
// }