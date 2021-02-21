import React, { useState, useEffect } from "react";
import { Dashboard } from "../components/dashboard/dashboard";
import { Layout } from "../components/layout";
import { NonAuthRoutes } from "../components/authRoute";
import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/client";

const Home = () => {
  const router = useRouter();
  const [session] = useSession();
  const [loading, setLoading] = useState(true);

  // Redirect to login page
  // if not validated.
  useEffect(() => {
    if (!session) {
      router.push(NonAuthRoutes.login);
    }
    setLoading(false);
  }, [session, router]);

  return (
    <Layout loading={loading}>
      <Dashboard session={session} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}

export default Home;
