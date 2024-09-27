import React, { Suspense, FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Head } from 'vite-react-ssg';
import { Provider } from 'react-redux';
import store from './store/index';
import { QueryClient, QueryClientProvider, useQuery, UseQueryResult } from "@tanstack/react-query";
import { CircularProgress, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from './store';
import { getUniversal } from './api/dataHub';
import { useEffect } from 'react';
import { setScheme } from './store/dataHubShema';



import theme from './theme'
import { ThemeProvider } from '@mui/material';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: FC<PageWrapperProps> = ({ children }) => {
  const title = useSelector((state: AppState) => state.header.title);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getDataHubShema = async ({ queryKey }: { queryKey: any[] }) => {
    const [, params] = queryKey;
    try {
      const response = await getUniversal('GetMetaData', params);
      if (!response.result.data) {
        navigate('/error')
      }
      return response;
    } catch (error) {
      console.log(error);
      navigate('/error')
      return null;
    }
  };

  const { isLoading, isError, data }: UseQueryResult<any> = useQuery({
    queryKey: ['GetMetaData', [{ key: 'timestamp', value: 0 }]],
    queryFn: getDataHubShema,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 0,
  });

  useEffect(() => {
    if (data && data.result && data.result.data) {
      dispatch(setScheme(data.result.data));
    }
  }, [data]);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/ico" href="/ods/favicon.ico" />
        <title>{title}</title>
      </Head>
      <ThemeProvider theme={theme}>
        {isLoading ? (
          <div className='app__preloaded'><CircularProgress /></div>
        ) : isError ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <span>Ошибка при загрузке данных</span>
          </Box>
        ) : (
          children
        )}
      </ThemeProvider>

    </>
  );
};


export default function Layout() {

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <div className="app">
          <div className="app__base-wrap">
            <Header />
            <main className="content">
              <Suspense fallback={<div className='app__preloaded'><CircularProgress /></div>}>
                <PageWrapper>
                  <Outlet />
                </PageWrapper>
              </Suspense>
            </main>
          </div>
        </div>
      </QueryClientProvider>
    </Provider>
  );
}