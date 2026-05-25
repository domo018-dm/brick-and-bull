export function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="logo logo-foot">
            <span className="logo-stack">
              <span className="logo-word">BRICK <span className="amp">&amp;</span> BULL</span>
              <span className="logo-sub">F-SERIES SPECIALISTS · EST. 2014</span>
            </span>
          </div>
          <p className="footer-blurb">
            Independent dealer. Licensed in AZ, TX, CO, NM, UT, OK, KS &amp; AR. We don&apos;t take consignment from
            anyone whose paperwork we couldn&apos;t audit ourselves.
          </p>
          <div className="footer-licenses mono">
            AZ #L00329472 · TX #TDB50291 · CO #IM2481 · NM #58102 · OK #VD-8831 · BBB A+ · NIADA MEMBER
          </div>
        </div>
        <div className="footer-cols">
          <div className="footer-col">
            <h4>Browse</h4>
            <a href="#inventory">All inventory</a>
            <a href="#inventory">Bullnose &apos;80–&apos;86</a>
            <a href="#inventory">Bricknose &apos;87–&apos;91</a>
            <a href="#inventory">Recently sold</a>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#process">The Process</a>
            <a href="#">The Garage</a>
            <a href="#">Press</a>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <a href="#eras">Era guide</a>
            <a href="#">Inspection checklist</a>
            <a href="#">Shipping</a>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <a href="tel:5052049009">(505) 204-9009</a>
            <a href="mailto:trucks@brickbull.co">trucks@brickbull.co</a>
            <span>4218 W Buckeye Rd</span>
            <span>Phoenix, AZ 85009</span>
          </div>
        </div>
      </div>
      <div className="footer-bot">
        <span className="mono">© 2014–2026 BRICK &amp; BULL TRUCK CO., LLC</span>
        <span className="mono">PRIVACY · TERMS · CALIFORNIA NOTICE</span>
        <span className="mono">VINs &amp; IMAGES BY APPOINTMENT</span>
      </div>
    </footer>
  )
}
