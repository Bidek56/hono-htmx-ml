export type Order = {
    order_id: number
    user_id: number
    eval_set: string
    order_number: number
    order_dow: number
    order_hour_of_day: string
    days_since_prior_order: number
}

export type Column = {
    cid: number
    name: string
    type: string
    notnull: number
    dflt_value: string
    pk: number
    dist_cnt: number
    null_cnt: number
}