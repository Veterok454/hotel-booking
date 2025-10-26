import stripe from 'stripe';
import Booking from '../models/Booking.js';
import connectDB from '../configs/db.js';

// API to handle Stripe Webhooks

export const stripeWebhooks = async (request, response) => {
  console.log('Webhook received!');
  try {
    await connectDB();
    console.log('Database connected');

    // Stripe Gateway Initialize
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    const sig = request.headers['stripe-signature'];
    let event;

    try {
      event = stripeInstance.webhooks.constructEvent(
        request.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
      console.log('Webhook signature verified');
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return response.send(`Webhook Error: ${err.message}`);
    }

    console.log('Event type:', event.type);

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const { bookingId } = session.metadata;

      console.log('Booking ID from metadata:', bookingId);

      if (!bookingId) {
        console.error('No bookingId in metadata');
        return response.json({ error: 'No bookingId found' });
      }

      const existingBooking = await Booking.findById(bookingId);
      console.log('Found booking:', existingBooking);

      if (!existingBooking) {
        console.error('Booking not found:', bookingId);
        return response.json({ error: 'Booking not found' });
      }

      //Mark Payment as Paid
      const updatedBooking = await Booking.findByIdAndUpdate(
        bookingId,
        {
          isPaid: true,
          paymentMethod: 'Stripe',
        },
        { new: true }
      );

      console.log('Booking updated successfully:', updatedBooking);
    } else {
      console.log('Unhandled event type:', event.type);
    }

    response.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    response.json({ error: error.message });
  }
};
