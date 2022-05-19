import { Link } from 'react-router-dom'

function MenuItem({title, link}) {
  return (
    <li className="nav-item active">
      <Link to={link} className='nav-link'>{title}</Link>
    </li>
  )
}

export default MenuItem