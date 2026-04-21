import { AuthLoginRequestDto, AuthLoginResponseDto } from "@/features/login/types";
import { apiClient } from "./clientApi";


export const authApi = {
  login: async (
    payload: AuthLoginRequestDto
  ): Promise<AuthLoginResponseDto> => {

    const USE_FAKE = import.meta.env.VITE_USE_FAKE_API === "true";
    if (USE_FAKE) {
        return {
          accessToken: "ey.fake.jwt",
          tokenType: "Bearer",
          expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // +1h
          userName: "Long Nguyen",
          email: payload.loginIdOrEmail,
        };
    }
    

    const response = await apiClient.post<AuthLoginResponseDto>(
      "/Auth/login",
      payload
    );

    return response.data;
  },
};