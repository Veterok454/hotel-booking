import Hotel from '../models/Hotel.js';
import User from '../models/User.js';
import connectDB from '../configs/db.js';

export const registerHotel = async (req, res) => {
  try {
    await connectDB();

    const { name, address, contact, city } = req.body;
    const owner = req.user._id;

    // Check if User already registered
    const hotel = await Hotel.findOne({ owner });
    if (hotel) {
      return res.json({ success: false, message: 'Hotel already registered' });
    }

    await Hotel.create({ name, address, contact, city, owner });

    await User.findByIdAndUpdate(owner, { role: 'hotelOwner' });

    res.json({ success: true, message: 'Hotel registered successfully' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
