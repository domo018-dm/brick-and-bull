'use client'

import { useSaved } from '@/context/SavedContext'

export function Nav() {
  const { saved } = useSaved()

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a className="logo" href="#">
          <span className="logo-mark">B&amp;B</span>
          <span className="logo-stack">
            <span className="logo-word">BRICK <span className="amp">&amp;</span> BULL</span>
            <span className="logo-sub">F-SERIES SPECIALISTS · EST. 2014</span>
          </span>
        </a>
        <div className="nav-links">
          <a href="#inventory">Inventory <em>{saved.size || ''}</em></a>
          <a href="#eras">The Eras</a>
          <a href="#process">The Process</a>
          <a href="#sell">Sell Yours</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="nav-tools">
          <button className="ghost-btn" aria-label="Search">SEARCH</button>
          {saved.size > 0 && (
            <button className="ghost-btn">SAVED <em>{saved.size}</em></button>
          )}
        </div>
      </div>
    </nav>
  )
}
