import React from 'react'
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className='bg-gradient-to-r from-blue-600 to-purple-500 text-white py-16'>
        <div className='max-w-7xl mx-auto px-4'>
            <div className='grid md:grid-cols-2 gap-8 items-center'>
                <div>
                    <h1 className='text-4xl md:text-6xl mb-4 font-bold'>Latest Electronics at best prices</h1>
                    <p className='text-xl mb-6 text-blue-100'>Discover cutting-edge tehnology with unbeatable deals on smartphones.</p>
                    <div className='flex flex-col gap-4 sm:flex-row'>
                        <Button className="bg-white text-blue-600 hover:bg-gray-100 cursor-pointer">Shop Now</Button>
                        <Button variant='outline' className="text-blue-700 border-white hover:bg-white hover:text-blue-600 cursor-pointer">View Deals</Button>
                    </div>
                    
                </div>
                <div>
                        <img src='/ekart-hero1.png' alt="" />
                    </div>
            </div>
        </div>
    </section>
  )
}

export default Hero