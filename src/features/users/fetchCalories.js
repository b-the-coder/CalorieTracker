


export default async function fetchUserrecentCalories() {
    try {
        const response = await fetch('/api/histories')

        // Check if the response is ok (status code is in the 200-299 range)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        // Parse the response as JSON
        return await response.json()
    } catch (error) {
        console.error('Error fetching histories:', error)
        return error
    }
}