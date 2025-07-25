// API connection helper
const API_URL = 'http://localhost:8000'

export const api = {
  // Create a new user
  createUser: async (email: string, name: string, company: string) => {
    const response = await fetch(`${API_URL}/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, company })
    })
    return response.json()
  },

  // Submit assessment
  submitAssessment: async (userId: string, answers: number[]) => {
    const response = await fetch(`${API_URL}/api/assessment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, answers })
    })
    return response.json()
  },

  // Get results
  getResults: async (userId: string) => {
    const response = await fetch(`${API_URL}/api/results/${userId}`)
    return response.json()
  }
}