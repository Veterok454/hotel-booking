import connectDB from '../configs/db.js';
import transporter from '../configs/nodemailer.js';

export const requestOffer = async (req, res) => {
  try {
    await connectDB();

    const { email, offerTitle, offerDiscount } = req.body;

    if (!email || !offerTitle) {
      return res.json({
        success: false,
        message: 'Email and offer title are required',
      });
    }

    const normalized = String(email).toLowerCase().trim();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: process.env.SENDER_EMAIL,
      subject: 'New Exclusive Offer Request',
      html: `
        <h2>New Offer Request</h2>
        <p><strong>Customer Email:</strong> ${normalized}</p>
        <p><strong>Requested Offer:</strong> ${offerTitle}</p>
        <p><strong>Discount:</strong> ${offerDiscount}% OFF</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        <hr>
        <p>This customer is interested in booking this exclusive offer.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      message: 'Request sent successfully! We will contact you soon.',
    });
  } catch (error) {
    console.error('Error in requestOffer:', error);
    return res.json({
      success: false,
      message: 'Failed to send request. Please try again.',
    });
  }
};
