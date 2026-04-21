export type AuthLoginRequestDto = {
  loginIdOrEmail: string;
  password: string;
};

export type AuthLoginResponseDto = {
  accessToken: string;
  tokenType: "Bearer"; //  "Bearer"
  expiresAt: string; // ISO string (DateTime C#)
  userName: string;
  email: string;
};

export type AuthSession = {
  accessToken: string;
  expiresAt: string;
  userName: string;
  email: string;
};
