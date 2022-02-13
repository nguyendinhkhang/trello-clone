import ListWrapper from "../ListWrapper/ListWrapper"
import NavbarDashboard from "../Navbar-Dashboard/Navbar-Dashboard"
import './Dashboard.scss'

const Dashboard = () => {
  return (
    <div className='dashboard-container'>
      <NavbarDashboard />
      <div className='dashboard-content'>
        <ListWrapper />
        <ListWrapper />
        <ListWrapper />
        <ListWrapper />
        <ListWrapper />
        <ListWrapper />
      </div>
    </div>
  )
}

export default Dashboard