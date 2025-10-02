import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      {/* <Header /> */}
       <main className='background'>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  )
}
