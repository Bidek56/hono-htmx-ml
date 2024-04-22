import { type Column } from '../types';

export const FeaturesTbl = ({
  rows,
}: {
  rows?: Column[];
}) => {
  if (!rows)
    return <div>Emtpy dt</div>

  return (
    <div class="grid grid-flow-col-dense grid-cols-12 gap-0">
      <div class="col-span-10 rounded-xl	bg-slate-500">
        <h3 class="text-center text-xl">Orders table features</h3>
        <table class="border-collapse table-zebra w-fit text-sm">
          <thead>
            <tr>
              <th>Select</th>
              <th>Feature</th>
              <th>Data type</th>
              <th>Feature type</th>
              <th>Distinct count</th>
              <th>Null count</th>
              <th>Samples</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-slate-800" hx-target="closest tr" hx-swap="outerHTML">
            {
              rows?.map((rr:Column) => <Row order={rr}/>)
            }
          </tbody>
        </table>
      </div>
      <div class="col-span-2">
        <h3 class="text-center text-xl">Experiment configuration</h3>
        <div>Training data</div>
        <div>Target</div>
        <div>Features</div>
        <div>Alogorithms</div>
      </div>
    </div>
  );
}
// class="border-b p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200"
export const Row = ({ order: col }: { order: Column }) => (
  <tr>
    <Select item={col.name}/>
    <Cell item={col.name} />
    <Cell item={col.type} />
    <Cell item={col.type == "string" ? "categorical" : "numeric" } />
    <Cell item={col.distCnt} />
    <Cell item={col.nullCnt} />
    <Cell item={JSON.stringify(col.grpsRes)} />
  </tr>
)

 // class="flex row items-center justify-between py-1 px-4 my-1 rounded-lg text-lg border bg-gray-100 text-gray-600 mb-2"
export const Cell = ({ item }: { item: number | string }) => (
  <td hx-swap="outerHTML" class="row items-center justify-between py-1 px-4 my-1 border">
    {item}
  </td>
)

export const Select = ({ item }: { item: number | string }) => (
  <td hx-swap="outerHTML" class="row items-center justify-between py-1 px-4 my-1 border">
    <div class="flex items-center">
      <input id={"checkbox-table-search-" + item} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
      </input>
    </div>
  </td>
)