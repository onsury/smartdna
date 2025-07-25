export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-16">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-2">
            <span className="text-blue-600">Start</span>
            <span className="text-orange-500">Hub</span>
            <span className="text-gray-700"> Media AI</span>
          </h1>
          <p className="text-xl text-gray-600">SmartDNA Platform</p>
        </div>
        
        <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          CorePersonaDNA + FunctionPersonaDNA
        </h2>
        
        <p className="text-xl text-center text-gray-700 mb-16">
          5 Video Rounds with Founders mapped to 6 Functional Hubs
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* HRHub */}
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-purple-500">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">HRHub</h2>
            <p className="text-gray-600">Human Resources & Talent Management</p>
          </div>
          
          {/* FinHub */}
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-green-500">
            <h2 className="text-2xl font-bold text-green-600 mb-4">FinHub</h2>
            <p className="text-gray-600">Finance & Business Operations</p>
          </div>
          
          {/* TechHub */}
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-500">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">TechHub</h2>
            <p className="text-gray-600">Technology & Digital Innovation</p>
          </div>
          
          {/* SalesHub */}
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-red-500">
            <h2 className="text-2xl font-bold text-red-600 mb-4">SalesHub</h2>
            <p className="text-gray-600">Sales Strategy & Revenue Growth</p>
          </div>
          
          {/* MarketingHub */}
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-yellow-500">
            <h2 className="text-2xl font-bold text-yellow-600 mb-4">MarketingHub</h2>
            <p className="text-gray-600">Marketing & Brand Development</p>
          </div>
          
          {/* OmniHub */}
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-indigo-500">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">OmniHub</h2>
            <p className="text-gray-600">Cross-functional Operations: Online, Retail & Core Business Models</p>
          </div>
        </div>
        
        <div className="text-center mt-16 space-y-4">
          <p className="text-lg text-gray-600">Available in: English | हिन्दी | தமிழ் | తెలుగు | ಕನ್ನಡ | മലയാളം</p>
          <a href="/video-assessment">
            <button className="bg-gradient-to-r from-orange-500 to-blue-600 text-white font-bold py-4 px-8 rounded-full text-xl hover:shadow-lg transform hover:scale-105 transition">
              Start CorePersonaDNA Assessment
            </button>
          </a>
        </div>
      </div>
    </main>
  )
}