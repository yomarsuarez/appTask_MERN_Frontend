import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/AuthAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/api/AuthAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useAuth = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return { data, isError, isLoading };
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      navigate("/auth/login");
      toast.success("Logged out successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
