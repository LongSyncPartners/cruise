import { AuthLoginRequestDto, AuthLoginResponseDto } from "@/features/login/types";
import { apiClient } from "./clientApi";


export const authApi = {
  login: async (
    payload: AuthLoginRequestDto
  ): Promise<AuthLoginResponseDto> => {
    const response = await apiClient.post<AuthLoginResponseDto>(
      "/Auth/login",
      payload
    );

    return response.data;
  },
};