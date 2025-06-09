import { baseApi as api } from "../../api/baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getApiQuestions: build.query<
      GetApiQuestionsApiResponse,
      GetApiQuestionsApiArg
    >({
      query: () => ({ url: `/api/Questions` }),
    }),
    postApiQuestions: build.mutation<
      PostApiQuestionsApiResponse,
      PostApiQuestionsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Questions`,
        method: "POST",
        body: queryArg.questionCreateDto,
      }),
    }),
    getApiQuestionsById: build.query<
      GetApiQuestionsByIdApiResponse,
      GetApiQuestionsByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/Questions/${queryArg.id}` }),
    }),
    putApiQuestionsById: build.mutation<
      PutApiQuestionsByIdApiResponse,
      PutApiQuestionsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Questions/${queryArg.id}`,
        method: "PUT",
        body: queryArg.questionCreateDto,
      }),
    }),
    deleteApiQuestionsById: build.mutation<
      DeleteApiQuestionsByIdApiResponse,
      DeleteApiQuestionsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Questions/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiQuestionsTagByTag: build.query<
      GetApiQuestionsTagByTagApiResponse,
      GetApiQuestionsTagByTagApiArg
    >({
      query: (queryArg) => ({ url: `/api/Questions/tag/${queryArg.tag}` }),
    }),
    getApiQuestionsSearch: build.query<
      GetApiQuestionsSearchApiResponse,
      GetApiQuestionsSearchApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Questions/search`,
        params: {
          keyword: queryArg.keyword,
        },
      }),
    }),
    getApiQuestionsDifficultyByDifficulty: build.query<
      GetApiQuestionsDifficultyByDifficultyApiResponse,
      GetApiQuestionsDifficultyByDifficultyApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Questions/difficulty/${queryArg.difficulty}`,
      }),
    }),
    getApiQuestionsTags: build.query<
      GetApiQuestionsTagsApiResponse,
      GetApiQuestionsTagsApiArg
    >({
      query: () => ({ url: `/api/Questions/tags` }),
    }),
    getApiQuestionsExport: build.query<
      GetApiQuestionsExportApiResponse,
      GetApiQuestionsExportApiArg
    >({
      query: () => ({ url: `/api/Questions/export` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type GetApiQuestionsApiResponse =
  /** status 200 Success */ QuestionsDto[];
export type GetApiQuestionsApiArg = void;
export type PostApiQuestionsApiResponse =
  /** status 200 Success */ QuestionsDto;
export type PostApiQuestionsApiArg = {
  questionCreateDto: QuestionCreateDto;
};
export type GetApiQuestionsByIdApiResponse =
  /** status 200 Success */ QuestionsDto;
export type GetApiQuestionsByIdApiArg = {
  id: number;
};
export type PutApiQuestionsByIdApiResponse = unknown;
export type PutApiQuestionsByIdApiArg = {
  id: number;
  questionCreateDto: QuestionCreateDto;
};
export type DeleteApiQuestionsByIdApiResponse = unknown;
export type DeleteApiQuestionsByIdApiArg = {
  id: number;
};
export type GetApiQuestionsTagByTagApiResponse =
  /** status 200 Success */ QuestionsDto[];
export type GetApiQuestionsTagByTagApiArg = {
  tag: string;
};
export type GetApiQuestionsSearchApiResponse =
  /** status 200 Success */ QuestionsDto[];
export type GetApiQuestionsSearchApiArg = {
  keyword?: string;
};
export type GetApiQuestionsDifficultyByDifficultyApiResponse =
  /** status 200 Success */ QuestionsDto[];
export type GetApiQuestionsDifficultyByDifficultyApiArg = {
  difficulty: DifficultyLevel;
};
export type GetApiQuestionsTagsApiResponse = /** status 200 Success */ string[];
export type GetApiQuestionsTagsApiArg = void;
export type GetApiQuestionsExportApiResponse = unknown;
export type GetApiQuestionsExportApiArg = void;
export type QuestionTagDto = {
  name?: string | null;
};
export type QuestionsDto = {
  title?: string | null;
  description?: string | null;
  tags?: QuestionTagDto[] | null;
  type?: QuestionType;
  difficulty?: DifficultyLevel;
};
export type QuestionCreateDto = {
  title?: string | null;
  description?: string | null;
  difficulty?: DifficultyLevel;
  type?: QuestionType;
  tags?: string[] | null;
};
export enum QuestionType {
  Text = "Text",
  MultipleChoice = "MultipleChoice",
  Coding = "Coding",
}
export enum DifficultyLevel {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
}
export const {
  useGetApiQuestionsQuery,
  useLazyGetApiQuestionsQuery,
  usePostApiQuestionsMutation,
  useGetApiQuestionsByIdQuery,
  useLazyGetApiQuestionsByIdQuery,
  usePutApiQuestionsByIdMutation,
  useDeleteApiQuestionsByIdMutation,
  useGetApiQuestionsTagByTagQuery,
  useLazyGetApiQuestionsTagByTagQuery,
  useGetApiQuestionsSearchQuery,
  useLazyGetApiQuestionsSearchQuery,
  useGetApiQuestionsDifficultyByDifficultyQuery,
  useLazyGetApiQuestionsDifficultyByDifficultyQuery,
  useGetApiQuestionsTagsQuery,
  useLazyGetApiQuestionsTagsQuery,
  useGetApiQuestionsExportQuery,
  useLazyGetApiQuestionsExportQuery,
} = injectedRtkApi;
