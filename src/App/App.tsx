import CategorySection from '../CategorySection/CategorySection.tsx';
import type { JSX } from "react";
import { useOutletContext } from 'react-router';
// import { use, useEffect } from 'react';

const mainClassName = 'min-h-screen p-4';
const sectionClassName = 'flex justify-center flex-col items-center';
const h1ClassName = 'text-2xl font-bold mb-4 text-purple-200';
const pClassName = 'text-lg mb-6 text-purple-100';

function App(): JSX.Element {
  // const [count, setCount] = useState(0)
  const [loginStatus, setLoginStatus] = useOutletContext<[loginStatus: boolean, setLoginStatus: React.Dispatch<React.SetStateAction<boolean>>]>();

  return (
    <main className={mainClassName}>
      <section className={sectionClassName}>
        <h1 className={h1ClassName}>Welcome to the Application Tracker!</h1>
        <p className={pClassName}>Keep track of your job applications by adding a new application below</p>
      </section>
      {
        loginStatus ? <CategorySection loginStatus={loginStatus} /> : <p className='text-red-500 text-center mb-4'>Please log in to access the dashboard.</p>
      }
    </main>
  )
}

export default App;
