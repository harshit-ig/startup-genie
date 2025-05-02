import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'
import Pricing from '../components/Pricing'
import BackgroundGrid from '../components/ui/BackgroundGrid'

const Home = () => {
  return (
    <div>
      <BackgroundGrid />
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
    </div>
  )
}

export default Home