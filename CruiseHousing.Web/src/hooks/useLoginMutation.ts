import { useMutation } from "@tanstack/react-query";

import { authApi } from "../api/authApi";

import { useAuthStore } from "../stores/authStore";
import { AuthLoginRequestDto, AuthLoginResponseDto } from "@/features/login/types";

export function useLoginMutation() {
  const login = useAuthStore((state) => state.login);

  return useMutation<AuthLoginResponseDto, Error, AuthLoginRequestDto>({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      login({
        accessToken: response.accessToken,
        expiresAt: response.expiresAt,
        userName: response.userName,
        email: response.email,
      });
    },
  });
}