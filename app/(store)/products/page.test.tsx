import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ProductsPage from './page'

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
  },
}))

import axios from 'axios'

describe('ProductsPage', () => {
  beforeEach(() => {
    vi.mocked(axios.get).mockResolvedValue({
      data: {
        data: {
          items: [
            { _id: 1, name: 'Leather Bag', price: 99 },
            { _id: 2, name: 'Cotton Tee', price: 29 },
          ],
        },
      },
    })
  })

  it('shows products from API', async () => {
    render(<ProductsPage />)

    await waitFor(() => {
      expect(screen.getByText('Leather Bag')).toBeInTheDocument()
    })
  })

  it('filters products by search', async () => {
    const user = userEvent.setup()
    render(<ProductsPage />)

    await screen.findByText('Leather Bag')

    const input = screen.getByPlaceholderText(/search/i) // adjust to your real placeholder
    await user.type(input, 'cotton')

    expect(screen.getByText('Cotton Tee')).toBeInTheDocument()
    expect(screen.queryByText('Leather Bag')).not.toBeInTheDocument()
  })
})