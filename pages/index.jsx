import Link from "next/link";
import Head from "next/head";
import { Card, Row, Col, Container } from "react-bootstrap";
import apiFetch from "../utils/apiFetch";

export async function getStaticProps() {
  const response = await apiFetch("/articles");
  const articles = await response.json();

  return {
    props: {
      articles,
    },
  };
}

export default function Home({ articles }) {
  return (
    <Container className="mt-3">
      <Head>
        <title>List of Article</title>
      </Head>

      <Row className="g-3">
        {articles.map((article) => (
          <Col lg={4} key={article.id}>
            <Card body>
              <Link href={`/articles/${article.id}`}>
                <a>{article.title}</a>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
