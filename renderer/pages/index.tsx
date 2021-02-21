import React from "react";
import { AuthRoutes, NonAuthRoutes } from "../components/authRoute";
import { Layout } from "../components/layout";
import { useSession, getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { Spinner } from "../components/spinner";

const Login = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  // route to dashboard
  // if validated
  if (loading) return null;
  if (session) {
    //make sure accesstoken/clienttoken is still valid. if not, sign out user
    router.push(AuthRoutes.dashboard);
  } else {
    router.push(NonAuthRoutes.login);
  }

  return <Spinner />;
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}

export default Login;
