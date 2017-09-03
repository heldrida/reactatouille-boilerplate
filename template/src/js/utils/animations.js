import { tween, css, transform } from 'popmotion'

const { interpolate } = transform

export const onReveal = params => {
  const elRenderer = css(params.el)
  tween({
    from: 50,
    to: 0,
    duration: 600,
    onUpdate: (x) => {
      elRenderer.set({
        'x': x,
        'opacity': interpolate([0, 50], [1, 0])(x)
      })
    }
  }).start()
}
