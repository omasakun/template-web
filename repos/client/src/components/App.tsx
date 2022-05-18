import { css } from '@linaria/core'
import { useState } from 'react'

const root = css`
  text-align: center;
  padding: 3rem;
`

const header = css`
  text-transform: uppercase;
`

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className={root}>
      <h1 className={header}>Hello!</h1>

      <button type='button' onClick={() => setCount((o) => o + 1)}>
        count is: {count}
      </button>
    </div>
  )
}

export default App
