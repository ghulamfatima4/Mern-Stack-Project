import React from 'react'

const Verify = () => {
  return (
    <div className='relative w-full h-[760px] overflow-hidden'>
        <div className='min-h-screen flex items-center justify-center bg-pink-100 p-4'>
            <div className='bg-white rounded-2xl shadow-lg w-full text-center max-w-md'>
                <div className='font-semibold text-2xl text-green-500 mb-4 p-5'>
                   ✅ Check your Email
                   <p className='text-gray-400 text-sm pt-3'>
                    We,ve Sent an Email on your account. Please check your inbox and click the verification link
                   </p>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Verify