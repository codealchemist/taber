import Tab from '../Tab'
import QuickTabShortcuts from './QuickTabShortcuts'

export default function QuickTab () {
  return (
    <div className='quick-tab'>
      <h3>Quick Tab</h3>
      <p>Create and edit guitar tabs with ease.</p>
      <p>Use keyboard shortcuts for faster editing.</p>

      <Tab edit={true} />
      <QuickTabShortcuts />
    </div>
  )
}
