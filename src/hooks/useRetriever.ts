import { getBackendURL } from "@/utils/common";
import { isClient, MODES } from "@/utils/constants";
import {
  ConnectItem,
  Retriever,
  appUpdatePayload,
  createRetrieverPayload,
} from "@/utils/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const useGetAllRetriever = () => {
  const token = isClient ? localStorage.getItem("token") : "";
  async function submit(): Promise<Retriever[] | null> {
    try {
      const backendUrl = getBackendURL(MODES.DEMO as string);
      const res = await axios({
        url: `${backendUrl}/retriever`,
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
    queryKey: ["all-retrievers"],
    queryFn: submit,
    enabled: false,
    refetchInterval: 60_000,
    // placeholderData: [],
  });
};

export const useGetAllApps = () => {
  const token = isClient ? localStorage.getItem("token") : "";
  async function submit(): Promise<ConnectItem[] | null> {
    try {
      const backendUrl = getBackendURL(MODES.DEMO as string);
      const res = await axios({
        url: `${backendUrl}/retriever/apps`,
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
    queryKey: ["all-apps"],
    queryFn: submit,
    enabled: false,
    refetchInterval: 60_000,
    // placeholderData: [],
  });
};

export const useUpdateAppStatus = () => {
  //   const dispatch = useAppDispatch();
  const token = isClient ? localStorage.getItem("token") : "";
  async function submit(
    data: appUpdatePayload
  ): Promise<ConnectItem[] | null | undefined> {
    try {
      const backendUrl = getBackendURL(MODES.DEMO as string);
      const res = await axios({
        url: `${backendUrl}/retriever/apps/${data.id}`,
        method: "put",
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
    onSuccess: (data) => {
      // dispatch(UpdateIsLoadingRequest(false));
      toast.success("App Status updated successfully.");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? (error.message as string));
      console.log(error, "error in updating status");
    },
  });
};
export const useUpdateAppName = () => {
  //   const dispatch = useAppDispatch();
  const token = isClient ? localStorage.getItem("token") : "";
  async function submit(
    data: appUpdatePayload
  ): Promise<ConnectItem[] | null | undefined> {
    try {
      const backendUrl = getBackendURL(MODES.DEMO as string);
      const res = await axios({
        url: `${backendUrl}/retriever/apps/${data.id}`,
        method: "put",
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
    onSuccess: (data) => {
      // dispatch(UpdateIsLoadingRequest(false));
      toast.success("App Name updated successfully.");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? (error.message as string));
      console.log(error, "error in updating status");
    },
  });
};

export const useCreateRetriever = () => {
  // const dispatch = useAppDispatch();
  const token = isClient ? localStorage.getItem("token") : "";
  async function submit(
    data: createRetrieverPayload
  ): Promise<Retriever | null> {
    try {
      const formData = new FormData();

      formData.append("title", data.title);

      formData.append(
        "files",
        JSON.stringify(
          data.files.map((file) => ({ description: file.description }))
        )
      );
      data.files.forEach((file, index) => {
        formData.append(`image${index}`, file.file);
      });

      formData.append("description", data.description);
      formData.append("status", data.status);
      formData.append("timestamp", data.timestamp.toString());

      const backendUrl = getBackendURL(MODES.DEMO as string);
      const res = await axios({
        url: `${backendUrl}/retriever`,
        method: "POST",
        data: formData,
        headers: {
          // "Content-Type": "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
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
