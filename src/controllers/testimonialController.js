import Testimonial from "../models/testimonial.js";

export const postTestimonial = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const customer_name = req.user.nama;

    if (!rating || !comment) {
      return res
        .status(400)
        .json({ success: false, message: "Rating dan komentar wajib diisi" });
    }

    await Testimonial.create({ customer_name, rating, comment });
    res
      .status(201)
      .json({ success: true, message: "Terima kasih atas penilaian Anda!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPublicTestimonials = async (req, res) => {
  try {
    const data = await Testimonial.getActive();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminTestimonials = async (req, res) => {
  try {
    const data = await Testimonial.getAllAdmin();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const approveTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_approved } = req.body;
    await Testimonial.updateStatus(id, is_approved);
    res.json({ success: true, message: "Status testimoni diperbarui" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
