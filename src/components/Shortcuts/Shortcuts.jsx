import './shortcuts.css'

export default function Shortcuts () {
  return (
    <>
      <div className='shortcuts-title'>
        <h3>Keyboard Shortcuts</h3>
      </div>
      <div className='shortcuts'>
        <ul>
          <li>
            <strong>n</strong> New Tab Collection
          </li>
          <li>
            <strong>o</strong> Open Tab Collection
          </li>
          <li>
            <strong>s</strong> Save Tab Collection
          </li>
          <li>
            <strong>r</strong> Rename Tab Collection
          </li>
          <li>
            <strong>t</strong> New Tab
          </li>
          <li>
            <strong>d</strong> Duplicate Active Tab
          </li>
          <li>
            <strong>c</strong> Copy Active Tab
          </li>
          <li>
            <strong>p</strong> Paste Active Tab
          </li>
          <li>
            <strong>+</strong> Add Fret
          </li>
          <li>
            <strong>-</strong> Subtract Fret
          </li>
          <li>
            <strong>⏵</strong> Move Right
          </li>
          <li>
            <strong>⏴</strong> Move Left
          </li>
          <li>
            <strong>⏶</strong> Move Up
          </li>
          <li>
            <strong>⏷</strong> Move Down
          </li>
          <li>
            <strong>z</strong> Undo
          </li>
          <li>
            <strong>y</strong> Redo
          </li>
          <li>
            <strong>^C</strong> Copy Tab Image
          </li>
          <li>
            <strong>m</strong> Mute String
          </li>
          <li>
            <strong>0-9</strong> Set Start
          </li>
          <li>
            <strong>Enter</strong> Put Finger
          </li>
          <li>
            <strong>ESC</strong> Exit Edit Mode
          </li>
          <li>
            <strong>.</strong> Toggle Shortcuts
          </li>
        </ul>
      </div>
    </>
  )
}
