function MenuItem({title, link}) {
  return (
    <li className="nav-item active">
        <a className="nav-link" href={link}>{title}</a>
    </li>
  )
}

export default MenuItem