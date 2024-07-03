// src/api/profile_pic/route.js
import { User } from '../../../models/user';

export default async function handler(req, res) {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json({ profileURL: user.profileURL });
}