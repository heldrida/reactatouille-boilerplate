import React from 'react'
import { NOT_FOUND } from 'redux-first-router'
import MainApi from 'modules/main'
import AboutApi from 'modules/about'

const HomePanel = AboutApi.containers.HomePanel
const About = AboutApi.containers.About

const map = {
  [MainApi.constants.HOME]: {
    path: '/',
    thunk: async (dispatch, getState) => {
      const request = await window.fetch(`//www.mocky.io/v2/59a1687b110000471164437a`)
      const data = await request.json()
      if (!data) {
        return dispatch({ type: NOT_FOUND })
      }
      dispatch({ type: 'DATA_FOUND', payload: data })
    },
    component: <HomePanel />
  },
  [MainApi.constants.ABOUT]: {
    path: '/about',
    component: <About />
  }
}

export default map
