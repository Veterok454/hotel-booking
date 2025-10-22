import connectDB from '../configs/db.js';
import User from '../models/User.js';

// Get /api/user/
export const getUserData = async (req, res) => {
  try {
    await connectDB();

    const role = req.user.role || 'user';
    const recentSearchedCities = req.user.recentSearchedCities || [];

    res.json({ success: true, role, recentSearchedCities });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Store User Recent Searched Cities
export const storeRecentSearchedCities = async (req, res) => {
  try {
    await connectDB();

    const { recentSearchedCity } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    if (user.recentSearchedCities.length < 3) {
      user.recentSearchedCities.push(recentSearchedCity);
    } else {
      user.recentSearchedCities.shift();
      u;
      ser.recentSearchedCities.push(recentSearchedCity);
    }
    await user.save();

    res.json({
      success: true,
      message: 'City added successfully',
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
