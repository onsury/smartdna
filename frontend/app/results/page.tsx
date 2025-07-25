'use client'
import { useEffect, useState } from 'react'

export default function Results() {
  const [results, setResults] = useState<any>(null)
  
  useEffect(() => {
    const savedResults = localStorage.getItem('dna_results')
    if (savedResults) {
      setResults(JSON.parse(savedResults))
    }
  }, [])
  
  if (!results) {
    return <div className="min-h-screen flex items-center justify-center">Loading results...</div>
  }
  
  const getHubColor = (hub: string) => {
    const colors: any = {
      HRHub: 'purple',
      FinHub: 'green',
      TechHub: 'blue',
      SalesHub: 'red',
      MarketingHub: 'yellow',
      OmniHub: 'indigo'
    }
    return colors[hub] || 'gray'
  }
  
 const getHubDescription = (hub: string) => {
  const descriptions: any = {
    HRHub: 'Human Resources & Talent Management',
    FinHub: 'Finance & Business Operations',
    TechHub: 'Technology & Digital Innovation',
    SalesHub: 'Sales Strategy & Revenue Growth',
    MarketingHub: 'Marketing & Brand Development',
    OmniHub: 'Cross-functional Operations: Online, Retail & Core Business Models'
  }
  return descriptions[hub] || ''
}
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Your FunctionPersonaDNA Profile</h1>
          <p className="text-xl text-gray-600">StartHub Media AI Assessment Results</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Your Functional DNA Scores</h2>
          
          <div className="space-y-4">
            {Object.entries(results.dna_scores).map(([hub, score]: [string, any]) => (
              <div key={hub}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{hub}</span>
                  <span className="font-bold">{score}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full bg-gradient-to-r from-${getHubColor(hub)}-400 to-${getHubColor(hub)}-600`}
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(results.dna_scores).map(([hub, score]: [string, any]) => (
            <div key={hub} className={`bg-white p-6 rounded-xl shadow border-t-4 border-${getHubColor(hub)}-500`}>
              <h3 className={`text-xl font-bold text-${getHubColor(hub)}-600 mb-2`}>{hub}</h3>
              <p className="text-sm text-gray-600 mb-2">{getHubDescription(hub)}</p>
              <p className="text-3xl font-bold mb-2">{score}%</p>
              <p className="text-gray-600">
                {score >= 80 ? '🌟 Exceptional strength' :
                 score >= 60 ? '💪 Strong capability' :
                 score >= 40 ? '📈 Moderate ability' :
                 '🎯 Development opportunity'}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-blue-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3">Next Steps:</h3>
          <ul className="space-y-2 text-gray-700">
            <li>✅ Complete CorePersonaDNA video assessment with founders</li>
            <li>✅ Schedule team assessments for comprehensive mapping</li>
            <li>✅ Generate detailed organizational DNA report</li>
          </ul>
        </div>
        
        <div className="text-center mt-8 space-x-4">
          <button 
            onClick={() => window.print()}
            className="bg-gray-600 text-white font-bold py-3 px-6 rounded-full"
          >
            Download PDF
          </button>
          <a href="/video-assessment">
  <button className="bg-gradient-to-r from-orange-500 to-blue-600 text-white font-bold py-3 px-6 rounded-full">
    Start CorePersonaDNA
  </button>
</a>
          <a href="/">
            <button className="bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-full">
              Back to Home
            </button>
          </a>
        </div>
      </div>
    </main>
  )
}