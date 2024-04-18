import { Layout } from "./Layout";

export const AboutPage = () => {
  const title = "About";
  return (
    <Layout title={title}>
        <p>
          This app was created by <a href="https://github.com/bidek56">Bidek56</a> as a test bed for
          using Bun and Hono to test how it would work with tools like HTMX and TailwindCSS.
        </p>
    </Layout>
  );
}
