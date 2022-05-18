import { Link } from 'react-router-dom'

function List({data}) {
  return (
    <div className='list-group'>
        {
            data.map(item => {
                return <Link className='list-group-item list-group-item-action' to={item.link}> {item.title} </Link>
            })
        }
    </div>
  )
}

export default List