// import { useState } from 'react'
// import './App.css'
import Nav from '../Nav/nav.tsx';
// import CategoryBtn from '../CategoryBtn/CategoryBtn.tsx';
import CategorySection from '../CategorySection/CategorySection.tsx';

const AppContainerClass = "bg-linear-to-bl from-violet-600 to-violet-800"
const mainClassName = 'min-h-screen p-4';
const sectionClassName = 'flex justify-center flex-col items-center';
const h1ClassName = 'text-2xl font-bold mb-4 text-purple-200';
const pClassName = 'text-lg mb-6 text-purple-100';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className={AppContainerClass}>
      <Nav />
      <main className={mainClassName}>
        <section className={sectionClassName}>
          <h1 className={h1ClassName}>Welcome to the Application Tracker!</h1>
          <p className={pClassName}>Keep track of your job applications by adding a new application below</p>
        </section>
        <CategorySection />
      </main>
    </div>
  )
}

export default App
