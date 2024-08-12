import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import './contact.css'
import {FaFileAlt, FaLinkedin} from 'react-icons/fa'
// import Pdf from '../../../public/resume.pdf';
import pdf from './resume.pdf'

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_xdthdyk', 'template_xi8zwe7', form.current, 'cTGWawCLI7aVlwsN2')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset();
  };

  return (
    <section id='contact'>
      <h5>Get in Touch</h5>
      <h2>Contact Me</h2>
      <div className="container contact_container">
        <div className="contact_options">
          <article className='contact_option'>
            <a href={pdf} without target="_blank" rel="noopener noreferrer" className="contact_option-link">
              <button trailingIcon="picture_as_pdf" label="Resume"></button>
              <FaFileAlt className='contact_option-icon'/>
              <h4>Check out my resume!</h4>
            </a>
          </article>
          <article className='contact_option'>
            <a href='https://www.linkedin.com/in/andrewsaifnoorian/' target="_blank" rel="noreferrer" className="contact_option-link">
              <FaLinkedin className='contact_option-icon'/>
              <h4>Send a message to my LinkedIn!</h4>
            </a>
          </article>
        </div>
        <form ref={form} onSubmit={sendEmail} >
          <textarea name='message' rows="9" placeholder="Please include your full name, contact, and message here!" required></textarea>
          <button type='submit' className='btn btn-primary'>Send Message</button>
        </form>
      </div>
    </section>
  )
}

export default Contact