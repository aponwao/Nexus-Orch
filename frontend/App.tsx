import { ClerkProvider } from '@clerk/clerk-react';
import AppLayout from '@/components/layout/AppLayout';

const PUBLISHABLE_KEY = "pk_test_cmVmaW5lZC1maXNoLTg0LmNsZXJrLmFjY291bnRzLmRldiQ";

const AppInner = () => {
  return <AppLayout />;
};

const App = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <AppInner />
    </ClerkProvider>
  );
};

export default App;
