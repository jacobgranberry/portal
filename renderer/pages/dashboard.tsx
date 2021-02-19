import React, { useState, useEffect } from 'react';
import { Dashboard } from '../components/dashboard/dashboard';
import { Layout } from '../components/layout';
import { useAuth } from '../utils/auth/auth';
import { NonAuthRoutes } from '../components/authRoute';
import { useRouter } from 'next/router';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const auth = useAuth();

  // Redirect to login page
  // if not validated.
  useEffect(() => {
    (async () => {
      const isValidated = await auth?.validate();
      if (!isValidated) {
        router.push(NonAuthRoutes.login);
      }
      setLoading(false);
    })();
  }, [auth, router]);

  return (
    <Layout loading={loading}>
      <Dashboard />
    </Layout>
  );
};

export default Home;
