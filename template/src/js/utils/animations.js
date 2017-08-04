import { TweenLite, Bounce } from 'gsap'

export const onHomePanelReveal = (params) => {
  TweenLite.fromTo(params.el, 0.8, { opacity: 0, x: 50, zIndex: 'auto' }, { opacity: 1, x: 0, zIndex: 'auto', ease: Bounce.easeOut, onComplete: params.onComplete })
}