import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { plan } = req.body

    let amount = 0

    switch (plan) {
        
     case 'student':
       amount = 19900; // ₹199.00
       break;
       
      case 'pro':
        amount = 29900 // ₹299.00
        break

      case 'ultimate':
        amount = 49900 // ₹499.00
        break

      default:
        return res.status(400).json({
          error: 'Invalid plan',
        })
    }

    const options = {
      amount,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    }

    const order = await razorpay.orders.create(options)

    res.status(200).json(order)

  } catch (err) {
    console.error(err)

    res.status(500).json({
      error: err.message,
    })
  }
}