import { isClient, isPilotMode } from "@/utils/constants";
import { Client } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export const useGetClientInfo = () => {
  const token = isClient ? localStorage.getItem("token") : "";
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const orgId = searchParams.get("orgId");
  async function submit(): Promise<Client | null> {
    const backendUrl =
      isPilotMode && projectId && orgId
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/v0/org/${orgId}/project/${projectId}`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/v0`;
    try {
      const res = await axios({
        url: `${backendUrl}/meta`,
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
      toast.error(error.message as string);
      // setTimeout(() => {
      //   router.push("/request");
      // }, 5000);
      console.error("Network error:", error);
      return null;
    }
  }

  return useQuery(["client-info"], submit, {
    refetchInterval: 60_000,
    enabled: false,
    keepPreviousData: false,
  });
};
