import { baseApi as api } from "../../api/baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getApiUsers: build.query<GetApiUsersApiResponse, GetApiUsersApiArg>({
      query: () => ({ url: `/api/Users` }),
    }),
    getApiUsersById: build.query<
      GetApiUsersByIdApiResponse,
      GetApiUsersByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/Users/${queryArg.id}` }),
    }),
    getApiUsersSearch: build.query<
      GetApiUsersSearchApiResponse,
      GetApiUsersSearchApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Users/search`,
        params: {
          searchTerm: queryArg.searchTerm,
        },
      }),
    }),
    putApiUsersByIdRole: build.mutation<
      PutApiUsersByIdRoleApiResponse,
      PutApiUsersByIdRoleApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Users/${queryArg.id}/role`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    getApiUsersExport: build.query<
      GetApiUsersExportApiResponse,
      GetApiUsersExportApiArg
    >({
      query: () => ({ url: `/api/Users/export` }),
    }),
    getApiUsersByUserIdAttempts: build.query<
      GetApiUsersByUserIdAttemptsApiResponse,
      GetApiUsersByUserIdAttemptsApiArg
    >({
      query: (queryArg) => ({ url: `/api/Users/${queryArg.userId}/attempts` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type GetApiUsersApiResponse = /** status 200 Success */ UserDto[];
export type GetApiUsersApiArg = void;
export type GetApiUsersByIdApiResponse = /** status 200 Success */ UserDto;
export type GetApiUsersByIdApiArg = {
  id: string;
};
export type GetApiUsersSearchApiResponse = /** status 200 Success */ UserDto[];
export type GetApiUsersSearchApiArg = {
  searchTerm?: string;
};
export type PutApiUsersByIdRoleApiResponse = unknown;
export type PutApiUsersByIdRoleApiArg = {
  id: string;
  body: string;
};
export type GetApiUsersExportApiResponse = unknown;
export type GetApiUsersExportApiArg = void;
export type GetApiUsersByUserIdAttemptsApiResponse =
  /** status 200 Success */ UserAttemptDtoRead[];
export type GetApiUsersByUserIdAttemptsApiArg = {
  userId: string;
};
export type UserDto = {
  id?: string | null;
  userName?: string | null;
  email?: string | null;
  fullName?: string | null;
  roles?: string[] | null;
};
export type TimeSpan = {
  ticks?: number;
};
export type TimeSpanRead = {
  ticks?: number;
  days?: number;
  hours?: number;
  milliseconds?: number;
  microseconds?: number;
  nanoseconds?: number;
  minutes?: number;
  seconds?: number;
  totalDays?: number;
  totalHours?: number;
  totalMilliseconds?: number;
  totalMicroseconds?: number;
  totalNanoseconds?: number;
  totalMinutes?: number;
  totalSeconds?: number;
};
export type UserAttemptDto = {
  id?: number;
  userId?: string | null;
  userName?: string | null;
  questionId?: number;
  questionTitle?: string | null;
  submittedAnswer?: string | null;
  isCorrect?: boolean;
  attemptedAt?: string;
  timeTaken?: TimeSpan;
};
export type UserAttemptDtoRead = {
  id?: number;
  userId?: string | null;
  userName?: string | null;
  questionId?: number;
  questionTitle?: string | null;
  submittedAnswer?: string | null;
  isCorrect?: boolean;
  attemptedAt?: string;
  timeTaken?: TimeSpanRead;
};
export const {
  useGetApiUsersQuery,
  useLazyGetApiUsersQuery,
  useGetApiUsersByIdQuery,
  useLazyGetApiUsersByIdQuery,
  useGetApiUsersSearchQuery,
  useLazyGetApiUsersSearchQuery,
  usePutApiUsersByIdRoleMutation,
  useGetApiUsersExportQuery,
  useLazyGetApiUsersExportQuery,
  useGetApiUsersByUserIdAttemptsQuery,
  useLazyGetApiUsersByUserIdAttemptsQuery,
} = injectedRtkApi;
