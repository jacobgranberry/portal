import React, { useState, useEffect } from "react";
import { Dashboard } from "../components/dashboard/dashboard";
import { Layout } from "../components/layout";
import { useAuth } from "../utils/auth/auth";
import { NonAuthRoutes } from "../components/authRoute";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

const Home = () => {
  const router = useRouter();
  const auth = useAuth();
  const [session, loading] = useSession();

  // Redirect to login page
  // if not validated.
  // useEffect(() => {
  //   if (auth.user === false || auth.user.accessToken === null) {
  //     console.log(auth.user);
  //     router.push(NonAuthRoutes.login);
  //   }
  //   setLoading(false);
  // }, [auth, router]);

  console.log("SESSION: ", session);

  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};

export default Home;
