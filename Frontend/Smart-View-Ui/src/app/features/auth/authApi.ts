import { baseApi as api } from "../../api/baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postApiAuthLogin: build.mutation<
      PostApiAuthLoginApiResponse,
      PostApiAuthLoginApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Auth/login`,
        method: "POST",
        body: queryArg.loginDto,
      }),
    }),
    postApiAuthRegister: build.mutation<
      PostApiAuthRegisterApiResponse,
      PostApiAuthRegisterApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Auth/Register`,
        method: "POST",
        body: queryArg.registerDto,
      }),
    }),
    getApiAuthConfirmEmail: build.query<
      GetApiAuthConfirmEmailApiResponse,
      GetApiAuthConfirmEmailApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Auth/confirm-email`,
        params: {
          userId: queryArg.userId,
          token: queryArg.token,
        },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type PostApiAuthLoginApiResponse = unknown;
export type PostApiAuthLoginApiArg = {
  loginDto: LoginDto;
};
export type PostApiAuthRegisterApiResponse = /** status 200 Success */ string;
export type PostApiAuthRegisterApiArg = {
  registerDto: RegisterDto;
};
export type GetApiAuthConfirmEmailApiResponse = unknown;
export type GetApiAuthConfirmEmailApiArg = {
  userId?: string;
  token?: string;
};
export type LoginDto = {
  email: string;
  password: string;
};
export type RegisterDto = {
  fullName?: string | null;
  email?: string | null;
  password?: string | null;
  frontendUrl?: string | null;
};
export const {
  usePostApiAuthLoginMutation,
  usePostApiAuthRegisterMutation,
  useGetApiAuthConfirmEmailQuery,
  useLazyGetApiAuthConfirmEmailQuery,
} = injectedRtkApi;
