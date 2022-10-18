import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useAuth } from './AuthContext';

const YOUR_SERVICE_ID = "service_px53msi";
const YOUR_TEMPLATE_ID = "template_h7ggtip";
const YOUR_PUBLIC_KEY = "bGSqopmNF1TmerpdF"


export default function welcomeEmail (email, username) {

  const templateParams = {
    to_name: username,
    from_name: "Kinema",
    to_email: email
  }

    emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, templateParams, YOUR_PUBLIC_KEY)
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });

};