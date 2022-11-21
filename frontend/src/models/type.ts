import type { Reducer, Effect, Subscription } from 'umi'
import type { PaginationConfig } from 'antd/es/pagination'
export { TablePaginationConfig } from 'antd/es/table/interface'

export enum EffectType {
    takeEvery = 'takeEvery',
    takeLatest = 'takeLatest',
    throttle = 'throttle',
    watcher = 'watcher',
}

export type EffectWithType = [
    Effect,
    { [name: string]: any; type: keyof typeof EffectType },
]

export type EffectsMapObject = Record<string, Effect | EffectWithType>;
export type SubscriptionObject = Record<string, Subscription>;
export type ReducerObject<T> = Record<string, Reducer<T>>;
export interface ModelType<T> {
    reducer?: Reducer<T>
    effects?: EffectsMapObject
    state?: T
    subscriptions?: SubscriptionObject
    namespace?: string
    reducers?: ReducerObject<T>
}

export type Pagination = PaginationConfig
export type Filters<T = any> = {
    [K in keyof (T & Record<string, any>)]?: {
        title: string
        value: any
        closable?: boolean
        values?: any
    }
}
export interface Query<T = any> {
    pagination?: Pagination
    filters?: Filters<T>
    keywords?: string
    sorter?: any
}
