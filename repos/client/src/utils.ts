export const uniq = <T>(o: T[]) => [...new Set(o)]
export const last = <T>(o: T[]) => o[o.length - 1]

export const error = (o: string) => {
  throw new Error(...o)
}
export const bug = (o?: string) => error(o ? `BUG: ${o}` : 'BUG')
export const never = (o: never) => error('BUG (NEVER)')
export const todo = () => error('NOT IMPLEMENTED')

export function clamp(o: number, min: number, max: number) {
  return Math.min(max, Math.max(min, o))
}

export const download = (data: BlobPart, name: string, mime?: string) => {
  const blob = new Blob([data], { type: mime ?? 'application/octet-stream' })
  const url = URL.createObjectURL(blob)
  const o = document.createElement('a')
  o.style.display = 'none'
  o.href = url
  o.setAttribute('download', name)

  document.body.appendChild(o)
  o.click()
  document.body.removeChild(o)

  URL.revokeObjectURL(url)
}

export const upload = (accept?: string) => {
  return new Promise<File | undefined>((res, rej) => {
    const o = document.createElement('input')
    o.type = 'file'
    if (accept) o.accept = accept
    document.body.appendChild(o)
    o.click()
    document.body.removeChild(o)
    o.addEventListener('change', () => res(o.files?.[0] ?? undefined))
  })
}

export const mutex = <T extends any[], U>(fn: (...args: T) => Promise<U>) => {
  let lock: Promise<any> = Promise.resolve()
  return (...args: T): Promise<U> => {
    const result = lock.then(() => fn(...args))
    lock = result.catch(() => {})
    return result
  }
}

/** @returns `[wait, go]` : When `go()` is called, `wait` becomes resolved promise. */
export function waitForCall() {
  let go: (() => void) | undefined
  const wait = new Promise<void>((res) => (go = res))
  return [wait, go!] as const
}

export function debounce(timeout: number) {
  return (fn: () => void) => {
    let timer: any = null
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      if (timer !== null) clearTimeout(timer)
      timer = setTimeout(fn, timeout)
    }
  }
}
