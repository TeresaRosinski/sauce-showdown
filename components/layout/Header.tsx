import Image from 'next/image'

export function Header() {
  return (
    <div>
      <div className="flex justify-center drop-shadow-lg" style={{ margin: '20px 0px 2px 0px'}}>
            <Image
              src="https://michaelvaughngreen.com/McPollster/mcArch.svg"
              alt="McDonald's Logo"
              width={40}
              height={40}
              //className="animate-pulse"
              style={{
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4)) drop-shadow(0 0 10px rgba(255,199,44,0.3))'
              }}
            />

  
      </div>

    
    <div className="text-center">  
          <p style={{ fontSize: '12px', fontWeight: '900', color: '#FED22D', textShadow: '0 2px 4px rgba(0,0,0,0.2)', margin: '0px 0px 8px 0px', textAlign: 'center', letterSpacing: '0.6px', wordSpacing: '2px'}}>
          VOTE NOW
        </p>
          {/* Main Title - Optimized for banner */}
          <p 
            className=" font-black leading-none tracking-tight" 
            style={{ 
              color: '#FCF0E3',
              fontSize: '36px',  // Scaled down from text-4xl for banner proportions
              marginBottom: '4px'
            }}
          >
            SAUCE SHOWDOWN!
          </p>


                    {/* Subtitle - Tighter spacing */}
           <div 

          style={{ 
            fontSize: '13px',  // Slightly smaller for banner
            marginBottom: '0px',
            color: '#FED22D',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.4px'
          }}
          >
          8 Influencers • 8 Epic Sauces
          </div>


     
          <div>
      </div>


     
          
        </div>
    </div>
  )
}
