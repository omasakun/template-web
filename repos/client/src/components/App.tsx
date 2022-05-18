import { css } from '@linaria/core'
import { useState } from 'react'
import { Smile } from 'react-feather'
import ccc from 'classnames'
import { useCounter } from '@/hooks/useCounter'

const root = css`
  height: 100%;
  width: 100%;

  text-align: center;
  padding: 3rem;
`
const icon = css`
  margin-right: 0.5rem;
`
const header = css`
  text-transform: uppercase;
  margin: 2rem;
`

function App() {
  const { count, increment } = useCounter()

  return (
    <div className={root}>
      <h1 className={ccc('flex-center', header)}>
        <Smile size='1em' className={ccc('feather', icon)} />
        Hello!
      </h1>

      <button type='button' onClick={() => increment()}>
        count is: {count}
      </button>
    </div>
  )
}

export default App
