import { type Column } from '../types';

export const FeaturesTbl = ({
  rows,
}: {
  rows?: Column[];
}) => {
  if (!rows)
    return <div>Emtpy dt</div>

  return (
    <div class="relative rounded-xl overflow-auto"><div class="shadow-sm overflow-hidden my-8">
      <table class="border-collapse table-auto w-full text-sm">
        <thead>
          <tr>
            <th>Feature</th>
            <th>Data type</th>
            <th>Feature type</th>
            <th>Distinct count</th>
            <th>Null count</th>
            <th>Samples</th>
            <th>Histogram</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-slate-800" hx-target="closest tr" hx-swap="outerHTML">
          {
            rows?.map((rr:Column) => <Row order={rr}/>)
          }
        </tbody>
      </table>
    </div></div>
  );
}
// class="border-b p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200"
export const Row = ({ order: col }: { order: Column }) => (
  <tr>
    <Cell item={col.name} />
    <Cell item={col.type} />
    <Cell item={col.type == "string" ? "categorical" : "numeric" } />
    <Cell item={col.dist_cnt} />
    <Cell item={col.null_cnt} />
  </tr>
)

 // class="flex row items-center justify-between py-1 px-4 my-1 rounded-lg text-lg border bg-gray-100 text-gray-600 mb-2"
export const Cell = ({ item }: { item: number | string }) => (
  <td hx-swap="outerHTML" class="row items-center justify-between py-1 px-4 my-1 border">
    {item}
  </td>
)
