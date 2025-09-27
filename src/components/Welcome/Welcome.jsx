import './welcome.css'
import Tab from '../Tab'
import WelcomeShortcuts from './WelcomeShortcuts'

export default function Welcome () {
  return (
    <div className='welcome'>
      <h2>Welcome 🤙</h2>
      <p>Your goto app for creating guitar tabs!</p>
      <p>
        Try <strong>Quick Tab mode</strong> using the `q` key.
      </p>
      <p>
        TODO: Use <strong>Tab Collections</strong> for the whole suite.
      </p>
      <br />
      <p>
        Tabs look like this <em>(an E major chord here)</em>:
      </p>

      <Tab chord='E' />
      <WelcomeShortcuts />
    </div>
  )
}
