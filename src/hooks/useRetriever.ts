import { getBackendURL } from "@/utils/common";
import {
  ConnectItem,
  Retriever,
  appUpdatePayload,
  createRetrieverPayload,
} from "@/utils/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import App from "next/app";
import { toast } from "react-toastify";

export const useGetAllRetriever = () => {
  async function submit(): Promise<Retriever[] | null> {
    try {
      const backendUrl = getBackendURL(process.env.NEXT_PUBLIC_MODE as string);
      const res = await axios({
        url: `${backendUrl}/v0/retriever`,
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
  async function submit(): Promise<ConnectItem[] | null> {
    try {
      const backendUrl = getBackendURL(process.env.NEXT_PUBLIC_MODE as string);
      const res = await axios({
        url: `${backendUrl}/v0/retriever/apps`,
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
  async function submit(data: appUpdatePayload): Promise<ConnectItem[] | null | undefined> {
    try {
      const backendUrl = getBackendURL(process.env.NEXT_PUBLIC_MODE as string);
      const res = await axios({
        url: `${backendUrl}/v0/retriever/apps/${data.id}`,
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

export const useCreateRetriever = () => {
  // const dispatch = useAppDispatch();
  async function submit(
    data: createRetrieverPayload
  ): Promise<Retriever | null> {
    try {
      const formData = new FormData();

      formData.append("title", data.title);

      formData.append("files", JSON.stringify(data.files.map(file => ({ description: file.description }))));
      data.files.forEach((file, index) => {
        formData.append(`image${index}`, file.file);
      });

      formData.append("description", data.description);
      formData.append("status", data.status);
      // formData.append("icon", data.icon);

      console.log(data, formData, "payload");
      const backendUrl = getBackendURL(process.env.NEXT_PUBLIC_MODE as string);
      const res = await axios({
        url: `${backendUrl}/v0/retriever`,
        method: "POST",
        data: formData,
        headers: {
          // "Content-Type": "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        return res.data;
      } else {
        return null;
      }
      // return null;
    } catch (error) {
      console.error("Network error:", error);
      return null;
    }
  }
  return useMutation({
    mutationFn: submit,
    onSuccess: (data) => {
      toast.success("Retriever created successfully.");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? (error.message as string));
      console.log(error, "error in creating retriever");
    },
  });
};
