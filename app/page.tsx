import Spline from '@splinetool/react-spline/next';
import React from 'react'

function HomePage() {
  return (
    <main className='grid flex-center p-10 bg-black'>
      {/* Intro */}
      <Spline
        scene="https://prod.spline.design/HA4T-Vpe4CmLFft2/scene.splinecode" 
      />
    </main>
  );
}

export default HomePage;