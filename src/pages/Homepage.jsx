import Layout from "../components/Layout/Layout";
import useAuth from "../hooks/useAuth";

const Homepage = () => {
  const [auth] = useAuth();

  return (
    <Layout title="Best offers">
      <h1>Home</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
};

export default Homepage;
