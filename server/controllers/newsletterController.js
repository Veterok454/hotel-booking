import connectDB from '../configs/db.js';
import Subscriber from '../models/Subscriber.js';
import transporter from '../configs/nodemailer.js';

export const subscribeToNewsletter = async (req, res) => {
  try {
    await connectDB();

    const { email } = req.body;
    if (!email) {
      return res.json({ success: false, message: 'Email is required' });
    }

    const normalized = String(email).toLowerCase().trim();

    // Check duplicate
    const existing = await Subscriber.findOne({ email: normalized });
    if (existing) {
      return res.json({ success: false, message: 'Already subscribed' });
    }

    // Save subscriber
    const subscriber = await Subscriber.create({ email: normalized });

    // Prepare mail (subject chosen: "New Newsletter Subscriber")
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: process.env.SENDER_EMAIL,
      subject: 'New Newsletter Subscriber',
      html: `
        <h2>New Newsletter Subscription</h2>
        <p><strong>Email:</strong> ${normalized}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        <p>This user has subscribed to your BestToStay newsletter.</p>
      `,
    };

    // Send mail
    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    res.json({ success: false, message: error.message });

    // handle duplicate key race case (another request inserted between findOne and create)
    if (error.code === 11000) {
      return res.json({ success: false, message: 'Already subscribed' });
    }

    return res.json({ success: false, message: 'Failed to subscribe' });
  }
};
