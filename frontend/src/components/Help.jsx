import React from "react";
import "./help.css";

const HelpPage = () => {
  return (
    <div className="help-container">
      <h1 className="help-title">Help & Support</h1>

      {/* FAQ Section */}
      <div className="help-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq">
          <h4>1. How do I book a hotel?</h4>
          <p>
            Go to the hotel page, select check-in and check-out dates, then click
            on "Reserve". Complete the payment to confirm your booking.
          </p>
        </div>

        <div className="faq">
          <h4>2. What payment methods are accepted?</h4>
          <p>
            We accept payments via UPI, debit card, credit card, and net banking
            through Razorpay.
          </p>
        </div>

        <div className="faq">
          <h4>3. My payment failed. What should I do?</h4>
          <p>
            If payment fails, your money will be refunded automatically within
            5-7 working days. You can try booking again.
          </p>
        </div>

        <div className="faq">
          <h4>4. Can I cancel my booking?</h4>
          <p>
            Yes, cancellation depends on hotel policy. Please check details on
            the hotel page before booking.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="help-section">
        <h2>Contact Us</h2>
        <p>If you still need help, feel free to contact us:</p>

        <ul>
          <li>Email: support@traveliia.com</li>
          <li>Phone: +91 9876543210</li>
        </ul>
      </div>

      {/* Report Issue */}
      <div className="help-section">
        <h2>Report an Issue</h2>

        <form className="help-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Describe your issue..." required />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default HelpPage;