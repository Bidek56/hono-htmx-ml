import { type Column } from '../types';

export const FeaturesTbl = ({
  rows,
}: {
  rows?: Column[];
}) => {
  if (!rows)
    return <div>Emtpy dt</div>

  return (
    <div className="grid grid-flow-col-dense grid-cols-12 gap-0">
      <div id="feature-div" className="col-span-10 rounded-xl bg-slate-500">
        <h3 className="text-center text-xl">Features for orders table</h3>
        <table className="border-collapse table-zebra w-fit text-sm">
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
          <tbody className="bg-white dark:bg-slate-800" hx-target="closest tr" hx-swap="outerHTML">
            {
              rows?.map((rr:Column) => <Row order={rr}/>)
            }
          </tbody>
        </table>
      </div>
      <div className="col-span-2">
        <h3 className="text-center text-xl">Experiment configuration</h3>
        <div>
          <h5 className="text-center text-xl">Training data</h5>
          <div className="grid grid-cols-3 gap-0">
            <div></div>
            <div>
              Columns
            </div>
            <div>
              Rows
            </div>
            <div>Included</div>
            <div>7</div>
            <div>999</div>
            <div>Total</div>
            <div>7</div>
            <div>999</div>
            <button type="button" className="py-1 px-1 btn-outline bg-transparent text-primary rounded-lg shadow-md focus:outline-none">Filter data</button>
          </div>
        </div>
        <div>
          <h5 className="text-center text-xl">Target</h5>
          <div>NBA</div>
        </div>
        <div>
          <h5 className="text-center text-xl">Features</h5>
          <div>Selected 6 out of 7</div>
        </div>
        <div>
          <h5 className="text-center text-xl">Algorithms</h5>
          <div>Random forest classifier</div>
        </div>
        <div className="justify-center">
          <button type="button" className="py-2 px-2 btn-outline bg-transparent text-primary rounded-lg shadow-md focus:outline-none" hx-post="/submitModel"
              hx-trigger="click"
              hx-target="#feature-div"
              hx-swap="outerHTML"
          >
              Submit experiment
          </button>
        </div>
      </div>
    </div>
  );
}
//<button class="py-2 px-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
// className="border-b p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200"
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

 // className="flex row items-center justify-between py-1 px-4 my-1 rounded-lg text-lg border bg-gray-100 text-gray-600 mb-2"
export const Cell = ({ item }: { item: number | string }) => (
  <td hx-swap="outerHTML" className="row items-center justify-between py-1 px-4 my-1 border">
    {item}
  </td>
)

export const Select = ({ item }: { item: number | string }) => (
  <td hx-swap="outerHTML" className="row items-center justify-between py-1 px-4 my-1 border">
    <div className="flex items-center">
      <input id={"checkbox-table-search-" + item} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
      </input>
    </div>
  </td>
)