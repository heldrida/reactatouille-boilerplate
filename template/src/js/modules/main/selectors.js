// main/selectors.js
import { NAME } from './constants'
import { get } from 'lodash'

export const getAll = state => state[NAME]

export const getMapRouteComponent = (locationState) => {
  const { type, routesMap } = locationState
  const component = get(routesMap, [type, 'component'], undefined)
  return component
}
