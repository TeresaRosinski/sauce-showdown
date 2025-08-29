import Image from 'next/image'

export function Header() {
  return (
    <div>
      <div className="flex justify-center pt-5 drop-shadow-lg mb-2" style={{height: '40%'}}>
            <Image
              src="https://michaelvaughngreen.com/McPollster/mcArch.svg"
              alt="McDonald's Logo"
              width={40}
              height={40}
              //className="animate-pulse"
              style={{
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4)) drop-shadow(0 0 20px rgba(255,199,44,0.3))'
              }}
            />
      </div>
    
    <div className="text-center mb-2">  {/* Reduced from mb-8 */}
          {/* Main Title - Optimized for banner */}
          <h1 
            className="text-white font-black mb-1 leading-none tracking-tight drop-shadow-2xl" 
            style={{ 
              fontSize: '28px',  // Scaled down from text-4xl for banner proportions
              textShadow: '0 4px 12px rgba(0,0,0,0.6), 0 0 15px rgba(255, 199, 44, 0.4)' 
            }}
          >
            SAUCE<br/>SHOWDOWN!
          </h1>
        
          {/* Subtitle - Tighter spacing */}
          <div 
            className="text-yellow-100 font-semibold uppercase tracking-widest mb-3"
            style={{ 
              fontSize: '11px',  // Slightly smaller for banner
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            8 Influencers • 8 Epic Sauces
          </div>
          
        </div>
    </div>
  )
}
