import React from 'react'
import Dashboard from '../src/User/dashboard'
import { render } from '@testing-library/react'

import { expect } from '@jest/globals'

jest.mock(
    '../src/User/fetchCalories',
    () => {
        return {
            fetchUserrecentCalories: jest
                .fn()
                .mockImplementation([1301, 1350, 1400]),
        }
    } // Mocked function
)

it('renders user daily calorie histories', async () => {
    const { findByText } = render(<Dashboard />)

    const historiesElement = await findByText(/Day 1: 1301 calories/i)
  
    expect(historiesElement).toBeInTheDocument()
})
