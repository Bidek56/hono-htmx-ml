
DB=instacart.sqlite
TABLE=orders

sqlite3 $DB << EOF

DROP TABLE IF EXISTS $TABLE;
CREATE TABLE IF NOT EXISTS $TABLE (
    order_id bigint,
    user_id int,
    eval_set string,
    order_number int,
    order_dow int,
    order_hour_of_day string,
    days_since_prior_order int
);
EOF

# .import --csv --skip 1 completions.csv objective_completion
#    | awk -F, 'NR > 1 {printf("260000,1000,1,%d,%s,%d,%d,%d\n",$1,$2,$3,$4,$5)}' OFS=, \

unzip -p orders.csv.zip | head -1000 \
		| sqlite3 -csv -separator ',' $DB ".import --csv --skip 1 /dev/stdin $TABLE"