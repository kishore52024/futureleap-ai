import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
 process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      plan,
    } = req.body

    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex')

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        error: 'Payment verification failed',
      })
    }

// Update subscription

const { error: subError } = await supabase
  .from('subscriptions')
  .upsert(
    {
      user_id: userId,
      plan,
      status: 'active',
      start_date: new Date().toISOString(),
    },
    {
      onConflict: 'user_id',
    }
  )

if (subError) throw subError

// Save payment

const amountMap = {
  student: 199,
  pro: 299,
  ultimate: 499,
}

const { error: payError } = await supabase
  .from('payments')
  .insert({
    user_id: userId,
    plan,
    amount: amountMap[plan],
    payment_id: razorpay_payment_id,
    status: 'success',
  })

if (payError) throw payError

    return res.status(200).json({
      success: true,
    })

  } catch (err) {
    console.error(err)

    return res.status(500).json({
      success: false,
      error: err.message,
    })
  }
}