export function resize(node: HTMLElement) {
  const ro = new ResizeObserver(() => {
    node.dispatchEvent(new Event('resize'))
  })

  ro.observe(node)

  return {
    destroy() {
      ro.disconnect()
    },
  }
}

export type DragTiming = 'start' | 'move' | 'end'
export function drag(
  node: HTMLElement,
  fn: (e: MouseEvent | Touch, timing: DragTiming, nativeE: MouseEvent | TouchEvent) => void,
) {
  const mouse = dragMouse(node, (e, timing) => fn(e, timing, e))
  const touch = dragTouch(node, (e, timing) => fn(e.touches[0], timing, e))
  return {
    destroy() {
      mouse.destroy()
      touch.destroy()
    },
  }
}

export function dragMouse(node: HTMLElement, fn: (e: MouseEvent, timing: DragTiming) => any) {
  const start = (e: MouseEvent) => {
    // if (e.button !== 0) return
    e.preventDefault() // TODO: comment out: Receiving mousemove events outside dragged iframe
    fn(e, 'start')
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', end)
  }
  const move = (e: MouseEvent) => fn(e, 'move')
  const end = (e: MouseEvent) => {
    fn(e, 'end')
    window.removeEventListener('mousemove', move)
    window.removeEventListener('mouseup', end)
  }
  node.addEventListener('mousedown', start)
  return {
    destroy() {
      node.removeEventListener('mousedown', start)
    },
  }
}
export function dragTouch(node: HTMLElement, fn: (e: TouchEvent, timing: DragTiming) => any) {
  const start = (e: TouchEvent) => {
    if (e.targetTouches.length > 1) return
    e.preventDefault() // TODO: comment out: Receiving mousemove events outside dragged iframe
    fn(e, 'start')
    window.addEventListener('touchmove', move)
    window.addEventListener('touchend', end)
  }
  const move = (e: TouchEvent) => fn(e, 'move')
  const end = (e: TouchEvent) => {
    fn(e, 'end')
    window.removeEventListener('touchmove', move)
    window.removeEventListener('touchend', end)
  }
  node.addEventListener('touchstart', start)
  return {
    destroy() {
      node.removeEventListener('touchstart', start)
    },
  }
}
