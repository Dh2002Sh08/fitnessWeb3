import Test from '@/components/subs'
import React from 'react'
import { ThirdwebProvider } from 'thirdweb/react'

function page() {
  return (
    
    <ThirdwebProvider>
      <Test />
    </ThirdwebProvider>
  )
}

export default page