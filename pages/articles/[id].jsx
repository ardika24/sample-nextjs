import { unstable_getServerSession } from "next-auth";
import Head from "next/head";
import { Container } from "react-bootstrap";
import { authOptions } from "../api/auth/[...nextauth]";
import apiFetch from "../../utils/apiFetch";

export async function getServerSideProps({ req, res, params }) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const response = await apiFetch(`/articles/${params.id}`, {
    headers: {
      Authorization: session.user.accessToken,
    },
  });

  if (response.status === 404) {
    return {
      notFound: true,
    };
  }

  const article = await response.json();

  return {
    props: {
      article,
    },
  };
}

export default function ArticleDetail({ article }) {
  return (
    <Container className="mt-3">
      <Head>
        <title>{article.title}</title>
      </Head>

      <h1>{article.title}</h1>
      <p>{article.body}</p>
    </Container>
  );
}
