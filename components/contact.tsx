"use client";
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

function ContactForm() {
  const [state, handleSubmit] = useForm("mjkbnpre");

  if (state.succeeded) {
    return (
      <div className="bg-green-600 text-white text-center p-4 rounded-lg mb-4">
        Thanks for joining! We will contact you soon.
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-center text-white mb-4">
          Contact Us for More Details!
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="email" className="text-white mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="p-2 rounded-lg mb-4 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
          />
          
          <label htmlFor="message" className="text-white mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="p-2 rounded-lg mb-4 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message here"
            required
          />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />
          
          <button
            type="submit"
            disabled={state.submitting}
            className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
