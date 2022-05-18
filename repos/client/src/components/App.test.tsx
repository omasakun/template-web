import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  test('the title is visible', () => {
    render(<App />)
    expect(screen.getByText(/Hello!/i)).toBeInTheDocument()
  })

  test('should increment count on click', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button'))
    expect(await screen.findByText(/count is: 1/i)).toBeInTheDocument()
  })
})
