import { tween, css, transform } from 'popmotion'
import timeline from 'popmotion-timeline'

const { interpolate } = transform
const onUpdate = (elRenderer, x) => {
  elRenderer.set({
    'x': x,
    'opacity': interpolate([0, 50], [1, 0])(x)
  })
}

export const onReveal = params => {
  if (Array.isArray(params.el)) {
    const tweens = params.el.map(el => tween({ from: 50, to: 0, onUpdate: onUpdate.bind(undefined, css(el)) }))
    timeline(tweens).start()
  } else {
    const elRenderer = css(params.el)
    tween({
      from: 50,
      to: 0,
      duration: 600,
      onUpdate: onUpdate.bind(undefined, elRenderer)
    }).start()
  }
}
