import { Layout } from "./Layout";
import { FeaturesTbl } from "./FeaturesTbl"
import { type Column } from '../types';

export const HomePage = (
  {
    title,
    rows,
  }: {
    title: string;
    rows?: Column[];
  }
) => {
  return (
    <div>
      <Layout title={title}>
        <FeaturesTbl rows={rows} />
      </Layout>
    </div>
  );
}
