import Image from 'next/image'

export function Header() {
  return (
    <div>
      <div className="flex justify-center drop-shadow-lg" style={{ margin: '10px 0px 10px 0px'}}>
            <Image
              src="https://michaelvaughngreen.com/McPollster/mcArch.svg"
              alt="McDonald's Logo"
              width={35}
              height={35}
              //className="animate-pulse"
              style={{
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4)) drop-shadow(0 0 20px rgba(255,199,44,0.3))'
              }}
            />
      </div>
    
    <div className="text-center">  
          {/* Main Title - Optimized for banner */}
          <p 
            className=" font-black leading-none tracking-tight" 
            style={{ 
              color: '#FCF0E3',
              fontSize: '38px',  // Scaled down from text-4xl for banner proportions
 
              marginBottom: '4px'
            }}
          >
            SAUCE SHOWDOWN!
          </p>
        
     

          {/* Subtitle - Tighter spacing */}
          <div 

            style={{ 
              fontSize: '15px',  // Slightly smaller for banner
              marginBottom: '0px',
              color: '#FED22D',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.4px'
            }}
          >
            8 Influencers • 8 Epic Sauces
          </div>


          
        </div>
    </div>
  )
}
