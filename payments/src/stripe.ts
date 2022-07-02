import Stripe from 'stripe'

const SECRET_KEY = 'sk_test_51LEPLnSDY8ulaATOtKtXwrJEwAtwylDpFTfJH4kiiaqDRmYWVfdw2Im6ubt4VcMaZyWDMet9UpcM25BxLU3a2jyx00au74cEFf'

export const stripe = new Stripe(SECRET_KEY,{
    apiVersion: '2020-08-27'
})