import { type Order } from '../types';

export const FeaturesTbl = ({
  rows,
}: {
  rows?: Order[];
}) => {
  return (
    <div class="relative rounded-xl overflow-auto"><div class="shadow-sm overflow-hidden my-8">
      <table class="border-collapse table-auto w-full text-sm">
        <thead>
          <tr>
            <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">order_id</th>
            <th class="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">user_id</th>
            <th class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">eval_set</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-slate-800" hx-target="closest tr" hx-swap="outerHTML">
          {
            rows?.map((rr:Order) => <Row order={rr}/>)
          }
        </tbody>
      </table>
    </div></div>
  );
}

export const Row = ({ order }: { order: Order }) => (
  <tr>
    <Cell item={order.order_id} />
    <Cell item={order.user_id} />
    <Cell item={order.eval_set} />
  </tr>
)
 // class="flex row items-center justify-between py-1 px-4 my-1 rounded-lg text-lg border bg-gray-100 text-gray-600 mb-2"
export const Cell = ({ item }: { item: number | string }) => (
  <td hx-swap="outerHTML" class="row items-center justify-between py-1 px-4 my-1 rounded-lg text-lg border bg-gray-100 text-gray-600 mb-2">
    {item}
  </td>
)
