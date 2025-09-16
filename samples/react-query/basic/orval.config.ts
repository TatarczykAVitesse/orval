import { faker } from '@faker-js/faker';
import { defineConfig } from 'orval';

export default defineConfig({
  petstore: {
    output: {
      mode: 'split',
      target: 'src/api/endpoints/petstoreFromFileSpecWithTransformer.ts',
      schemas: 'src/api/model',
      client: 'react-query',
      mock: true,
      prettier: true,
      override: {
        mutator: {
          path: './src/api/mutator/custom-instance.ts',
          name: 'customInstance',
        },

        query: {
          // this doesn't generate the useQuery hooks
          useQuery: true,
          // uncommenting this causes no hook to be generated
          // useMutation: false,
        },
        // transformer: (openApiObject) => {
        //  // this has the same effect as override.query        
        //   openApiObject.override.query.useQuery = true;
        //   openApiObject.override.query.useMutation = false;
        //   return openApiObject;
        // },
        operations: {
          // this works when uncommented
          // createPets: {
          //   query: {
          //     useQuery: true,
          //   },
          // },

          // listPets: {
          //   mock: {
          //     properties: () => ({
          //       '[].id': () => faker.number.int({ min: 1, max: 99999 }),
          //     }),
          //   },
          //   query: {
          //     useQuery: true,
          //     useSuspenseQuery: true,
          //     useSuspenseInfiniteQuery: true,
          //     useInfinite: true,
          //     useInfiniteQueryParam: 'limit',
          //   },
          // },
          // showPetById: {
          //   mock: {
          //     data: () => ({
          //       id: faker.number.int({ min: 1, max: 99 }),
          //       name: faker.person.firstName(),
          //       tag: faker.helpers.arrayElement([
          //         faker.word.sample(),
          //         undefined,
          //       ]),
          //     }),
          //   },
          // },
        },
        mock: {
          properties: {
            '/tag|name/': () => faker.person.lastName(),
          },
        },
      },
    },
    input: {
      target: './petstore.yaml',
      override: {
        transformer: './src/api/transformer/add-version.js',
      },
    },
  },
});
