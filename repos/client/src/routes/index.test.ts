import { cleanup, render, screen } from '@testing-library/svelte'
import { describe, expect, test, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import Index from './index.svelte'

beforeEach(cleanup)

describe('App', () => {
  test('the title is visible', () => {
    render(Index)
    expect(screen.getByText(/Hello!/i)).toBeInTheDocument()
  })

  test('should increment count on click', async () => {
    const user = userEvent.setup()
    render(Index)
    await user.click(screen.getByRole('button'))
    expect(await screen.findByText(/count is: 1/i)).toBeInTheDocument()
  })
})
