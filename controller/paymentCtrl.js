const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: "YOUR_KEY_ID",
  key_secret: "YOUR_KEY_SECRET",
});

const checkOut = async (req, res) => {
  const option = {
    amount: 50000,
    currency: "INR",
  };
  const order = await instance.orders.create(option);
  res.json({
    success: true,
    order,
  });
};

const paymentVerification = async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId } = req.body;
  req.json({
    razorpayOrderId,
    razorpayPaymentId,
  });
};

module.exports = {
  checkOut,
  paymentVerification,
};
