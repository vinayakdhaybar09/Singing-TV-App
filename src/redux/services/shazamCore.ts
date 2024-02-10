// https://shazam.p.rapidapi.com/shazam-events/list?artistId=73406786&l=en-US&from=2022-12-31&limit=50&offset=0

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// const options = {
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Key': '95ea004718msh6f8add9e438e267p1e10fcjsnb4bfe05177cb',
//     'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
//   },
// };

// fetch(
//   'https://shazam.p.rapidapi.com/shazam-events/list?artistId=73406786&l=en-US&from=2022-12-31&limit=50&offset=0',
//   options,
// )
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(error => console.error(error));

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam.p.rapidapi.com/',
    prepareHeaders: headers => {
      headers.set(
        'X-RapidAPI-Key',
        '95ea004718msh6f8add9e438e267p1e10fcjsnb4bfe05177cb',
      );
      return headers;
    },
  }),
  endpoints: builder => ({
    getTopCharts: builder.query({query: () => 'charts/track'}),
  }),
});

export const {useGetTopChartsQuery} = shazamCoreApi;
