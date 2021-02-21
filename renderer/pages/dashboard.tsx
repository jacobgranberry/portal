import React, { useState, useEffect } from "react";
import { Dashboard } from "../components/dashboard/dashboard";
import { Layout } from "../components/layout";
import { useAuth } from "../utils/auth/auth";
import { NonAuthRoutes } from "../components/authRoute";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

const Home = () => {
  const router = useRouter();
  const [session, loading] = useSession();

  // Redirect to login page
  // if not validated.
  useEffect(() => {
    if (!session) {
      router.push(NonAuthRoutes.login);
    }
  }, [session, router]);

  console.log("SESSION: ", session);

  return (
    <Layout loading={loading}>
      <Dashboard />
    </Layout>
  );
};

export default Home;
