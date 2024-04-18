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
  const results: Column[] = query.all() as Column[];
  db.close();

  // console.log(results);

  return c.render(
    <div id="homepage">
      <HomePage title="AutoML FE" rows={results} />
    </div>
  )
})

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
