import React from 'react'


const Footer: React.FC = () => {


  return (
    <div className='mx-auto px-4 md:px-2'>
        <footer className="footer p-10 bg-base-200 text-base-content">
            <nav>
                <h6 className="footer-title">Services</h6> 
                <a className="link link-hover">Our Services</a>
                <a className="link link-hover">Design</a>
            </nav> 
            <nav>
                <h6 className="footer-title">Company</h6> 
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
            </nav> 
            <nav>
                <h6 className="footer-title">Legal</h6> 
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
            </nav> 
            <form>
                <h6 className="footer-title">Newsletter</h6> 
                <fieldset className="form-control w-80">
                    <label className="label">
                        <span className="label-text">Enter your email address</span>
                    </label> 
                    <div className="join">
                        <input type="text" placeholder="username@site.com" className="input input-bordered join-item" /> 
                        <button className="btn bg-yellow-500 hover:bg-yellow-400 text-white join-item">Subscribe</button>
                    </div>
                </fieldset>
            </form>
        </footer>
    </div>
   
  )
}

export default Footer