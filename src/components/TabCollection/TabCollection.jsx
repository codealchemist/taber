import './tab-collection.css'
import Tab from '../Tab'
import Shortcuts from '../Shortcuts'

function log () {
  console.log('[ TabCollection ]', ...arguments)
}

export default function TabCollection ({ tabs = [] }) {
  log('Rendering TabCollection with tabs:', tabs)

  if (tabs.length === 0) {
    log('No tabs available to display.')
    return null
  }

  return (
    <div className='tab-collection'>
      <h2>Your Tabs</h2>
      {tabs.map((tab, index) => (
        <Tab key={index} {...tab} />
      ))}
    </div>
  )
}
