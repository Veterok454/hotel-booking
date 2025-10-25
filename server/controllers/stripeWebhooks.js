import stripe from 'stripe';
import Booking from '../models/Booking.js';
import connectDB from '../configs/db.js';

// API to handle Stripe Webhooks

export const stripeWebhooks = async (request, response) => {
  try {
    await connectDB();

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
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log('Received event:', event.type);

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const { bookingId } = session.metadata;

      console.log('Processing booking:', bookingId);

      if (!bookingId) {
        console.error('No bookingId in metadata');
        return response.json({ error: 'No bookingId found' });
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

      console.log('Booking updated:', updatedBooking);

      if (!updatedBooking) {
        console.error('Booking not found:', bookingId);
        return response.json({ error: 'Booking not found' });
      }
    } else {
      console.log('Unhandled event type:', event.type);
    }

    response.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    response.json({ error: error.message });
  }
};
