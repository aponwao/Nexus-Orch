import { ClerkProvider } from '@clerk/clerk-react';

const PUBLISHABLE_KEY = "pk_test_cmVmaW5lZC1maXNoLTg0LmNsZXJrLmFjY291bnRzLmRldiQ";

const AppInner = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <h1 className="text-4xl font-bold text-center py-8">Project Management</h1>
    </div>
  );
};

const App = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <AppInner />
    </ClerkProvider>
  );
};

export default App;
