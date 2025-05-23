import Header from '@/Components/Header'
import MainSection from '@/Components/MainSection'
import React from 'react'

const index = () => {
  return (
    <main>
      <header className=' sticky top-0 z-50'>
        <Header />
      </header>
      <div className=' mt-0'>
        <section>
          <MainSection />
        </section>
      </div>
    </main>
  )
}

export default index
