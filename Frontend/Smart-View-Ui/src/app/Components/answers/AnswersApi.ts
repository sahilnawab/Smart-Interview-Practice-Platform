import { baseApi as api } from "../../api/baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postApiAnswer: build.mutation<
      PostApiAnswerApiResponse,
      PostApiAnswerApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Answer`,
        method: "POST",
        body: queryArg.answerCreateDto,
      }),
    }),
    getApiAnswerMine: build.query<
      GetApiAnswerMineApiResponse,
      GetApiAnswerMineApiArg
    >({
      query: () => ({ url: `/api/Answer/mine` }),
    }),
    getApiAnswerById: build.query<
      GetApiAnswerByIdApiResponse,
      GetApiAnswerByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/Answer/${queryArg.id}` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type PostApiAnswerApiResponse = unknown;
export type PostApiAnswerApiArg = {
  answerCreateDto: AnswerCreateDto;
};
export type GetApiAnswerMineApiResponse = unknown;
export type GetApiAnswerMineApiArg = void;
export type GetApiAnswerByIdApiResponse = unknown;
export type GetApiAnswerByIdApiArg = {
  id: number;
};
export type AnswerCreateDto = {
  questionId?: number;
  submittedAnswer?: string | null;
  timeTaken?: number;
};
export const {
  usePostApiAnswerMutation,
  useGetApiAnswerMineQuery,
  useLazyGetApiAnswerMineQuery,
  useGetApiAnswerByIdQuery,
  useLazyGetApiAnswerByIdQuery,
} = injectedRtkApi;
