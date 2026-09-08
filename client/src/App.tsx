import { useState } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import Dashboard from './pages/Dashboard'
import Navbar from './components/layout/Navbar'
import Transactions from './pages/Transactions'
import Accounts from './pages/Accounts'
import Cards from './pages/Cards'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'

function Layout(){
  return(
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-1/5 h-screen bg-slate-50 dark:bg-[#030c1b] sticky top-0 hidden md:block">
        <Sidebar />
      </div>
      {/* <MobileSidebar /> */}
      <div className="flex-1 overflow-y-auto">
        <Navbar />

        <div className="p-4 2xl:px-10 h-full">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <main className='w-full bg-slate-100 dark:bg-[#0F172A]'>
    <Routes>
      <Route element={<Layout/>}>
        <Route path='/' element={<Navigate to='/dashboard'/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/accounts' element={<Accounts/>}/>
        <Route path='/transactions' element={<Transactions/>}/>
        <Route path='/cards' element={<Cards/>}/>
        <Route path='/analytics' element={<Analytics/>}/>
        <Route path='/settings' element={<Settings/>}/>
      </Route>
    </Routes>
    </main>
  )
}

export default App
