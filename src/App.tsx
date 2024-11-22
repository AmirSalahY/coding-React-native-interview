import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import DrawerNavigator from './navigation/DrawerNavigator';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes
      retry: 2,
    },
  },
});

const App = () => {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <DrawerNavigator />
      </QueryClientProvider>
    </NavigationContainer>
  );
};

export default App;
