import { fetchUserrecentCalories } from '../src/User/dashboard'
import { expect } from '@jest/globals'


beforeEach(() => {
    fetch.resetMocks() // Reset mock history before each test
})

describe('fetchUserrecentCalories', () => {
    it('should successfully fetch recent calories', async () => {
        const mockHistories = [
            { date: '2024-10-01', calories: 500 },
            { date: '2024-10-02', calories: 300 },
        ]

        // Mocking a successful response
        fetch.mockResponses([JSON.stringify(mockHistories), { status: 200 }])

        const result = await fetchUserrecentCalories()

        // Check if fetch was called correctly
        expect(fetch).toHaveBeenCalledWith('/api/histories')
        // Check if the returned data matches the mock data
        expect(result).toEqual(mockHistories)
        expect(fetch).toHaveBeenCalledTimes(1)
    })

    it('should catch error if fetch fails', async () => {
        fetch.mockReject('fake error message')
        const result = await fetchUserrecentCalories()
        expect(result).toEqual('fake error message')
        expect(fetch).toHaveBeenCalledWith('/api/histories')
        expect(fetch).toHaveBeenCalledTimes(1)
    })
})


