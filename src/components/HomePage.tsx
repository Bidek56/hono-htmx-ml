import { Layout } from "./Layout";
import { FeaturesTbl } from "./FeaturesTbl"
import { type Order } from '../types';

export const HomePage = (
  {
    title,
    rows,
  }: {
    title: string;
    rows?: Order[];
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
