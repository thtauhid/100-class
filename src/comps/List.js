import { Link } from 'react-router-dom'

function List({data}) {
  return (
    <>
      <ul className="list-container">
        {
            data.map(item => {
                return <li className='list-item'><Link className='' to={item.link}> {item.title} </Link></li>
            })
        }
      </ul>
    </>
    // <div className='list-group'>
    //     {
    //         data.map(item => {
    //             return <Link className='list-group-item list-group-item-action' to={item.link}> {item.title} </Link>
    //         })
    //     }
    // </div>
  )
}

export default List