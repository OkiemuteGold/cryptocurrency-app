import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const cryptoApiHeaders = {
    'X-RapidAPI-Key': '96999827d3msh01896d68090ff2bp1a50a0jsne4028b9e27a7',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const createRequest = (url) => ({
    url: url,
    headers: cryptoApiHeaders
});

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',

    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),

    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: () => createRequest('/coins'),
        }),
    }),
});

export const { useGetCryptosQuery } = cryptoApi;