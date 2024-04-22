-- SQLite
-- SELECT * FROM orders LIMIT 10

PRAGMA table_info(orders);
-- SELECT * FROM orders LIMIT 10

SELECT count(distinct order_id) as dist_cnt FROM orders LIMIT 10

SELECT count(1) as dist_cnt FROM orders
WHERE order_id IS NULL OR trim(order_id, ' ') = '';


SELECT order_id, count(1) as dist_cnt FROM orders GROUP BY 1 ORDER BY 1 LIMIT 10;