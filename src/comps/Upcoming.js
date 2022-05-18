import '../style/upcoming.css'
import upcoming from '../config/upcoming'
import List from './List'

function Upcoming() {
  return (
    <div className="upcoming mb-3" >
        <h2 className='mb-3'>Upcoming</h2>
        <List data={upcoming} />
    </div>
  )
}

export default Upcoming