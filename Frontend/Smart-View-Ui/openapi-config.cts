import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: './swagger.json', // your backend's swagger
  apiFile: './src/app/api/baseApi.ts',
  apiImport: 'baseApi',
  outputFiles: {
    './src/app/features/auth/AuthApi.ts': {
      filterEndpoints: [/Auth/i], 
    },
    './src/app/Components/admin/UsersApi.ts':{
      filterEndpoints:[/User/i],
    },
    './src/app/Components/questions/QuestionsApi.ts':{
      filterEndpoints:[/Questions/i],
    },
     './src/app/Components/answers/AnswersApi.ts':{
      filterEndpoints:[/Answer/i],
    }

  },
  hooks: {
    queries: true,
    lazyQueries: true,
    mutations: true,
  },
  useEnumType: true
};

export default config;
