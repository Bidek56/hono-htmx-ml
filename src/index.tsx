import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { Database } from "bun:sqlite";
import { type Column } from './types';

// import { z } from 'zod'
// import { zValidator } from '@hono/zod-validator'

import { HomePage } from './components/HomePage'
import { AboutPage } from './components/AboutPage'

const app = new Hono()

app.use('/favicon.ico', serveStatic({ path: './public/favicon.ico' }));
app.use('/htmx.js', serveStatic({ path: './public/htmx.js' }));
app.use('/tailwind.css', serveStatic({ path: './public/tailwind.css' }));
app.get('/about', async (c) => c.render(<AboutPage />) );

app.get('/', async (c) => {
  const db = new Database('./db/instacart.sqlite');
  const query = db.query("PRAGMA table_info(orders)");
  const colsRes: Column[] = query.all() as Column[];

  // console.log(results);

  const distinctLst = colsRes.map((c: Column) => {
      const distRes: any = db.query(`SELECT count(distinct ${c.name}) as distCnt FROM orders`).get();
      const nullRes: any = db.query(`SELECT count(1) as nullCnt FROM orders WHERE ${c.name} IS NULL OR trim(${c.name}, ' ') = '';`).get();
      const grpsRes: any = db.query(`SELECT ${c.name}, count(1) as grpCnt FROM orders GROUP BY 1 ORDER BY 2 DESC LIMIT 3`).all();

      // console.log(grpsRes);
      // const grps = grpsRes.map(() => (g.) )

      return {name: c.name, distCnt: distRes["distCnt"], nullCnt: nullRes["nullCnt"], grpsRes: grpsRes};
    });

  // console.log(distinctLst);
  
  const mergedLst: any[] = [colsRes, distinctLst].reduce((a, b) => a.map((c: any, i) => Object.assign({}, c, b[i]) ));

  // console.log(mergedLst);
  db.close();

  return c.render(
    <div id="homepage">
      <HomePage title="AutoML FE" rows={mergedLst} />
    </div>
  )
})

app.post(
  '/submitModel',
  async (c) => {
    console.log("Reg: " + JSON.stringify(c.req));
    return c.html(<div>Hello from model</div>)
  }
)

// app.post(
//   '/todo',
//   zValidator(
//     'form',
//     z.object({
//       title: z.string().min(1)
//     })
//   ),
//   async (c) => {
//     const { title } = c.req.valid('form')
//     const id = crypto.randomUUID()
//     await c.env.DB.prepare(`INSERT INTO todo(id, title) VALUES(?, ?);`).bind(id, title).run()
//     return c.html(<Item title={title} id={id} />)
//   }
// )

// app.delete('/todo/:id', async (c) => {
//   const id = c.req.param('id')
//   await c.env.DB.prepare(`DELETE FROM todo WHERE id = ?;`).bind(id).run()
//   c.status(200)
//   return c.body(null)
// })

export default app
