"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useGetProjectsData } from "../useLogin";

export const Projects = () => {
  const router = useRouter();
  const currentPath = window.location.href;
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const orgId = searchParams.get("orgId");
  const { data, refetch, error } = useGetProjectsData();

  useEffect(() => {
    if (data && !orgId && !projectId && currentPath) {
      router.push(
        `${currentPath}?projectId=${data?.items[0]?.id}&orgId=${data?.items[0]?.org}`
      );
    }
  }, [data, currentPath, projectId]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching document:", error);
    }
  }, [error]);
  useEffect(() => {
    if (!orgId || !projectId) {
      refetch();
    }
  }, [projectId, orgId]);

  return null;
};
