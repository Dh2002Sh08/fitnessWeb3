import { SubsCription } from '@/components/subs';
import React from 'react'
import { ThirdwebProvider } from 'thirdweb/react';

function page() {
  return (
    <div>
      <ThirdwebProvider>
        <SubsCription />
      </ThirdwebProvider>
      
    </div>
  )
}

export default page
