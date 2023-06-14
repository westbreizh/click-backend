const stripe = require('stripe')('sk_test_51NGdYqI8HrVwrRfPKAmQ17TgZh2yWZtGjNNqhHyMXhebWNh03YR5zgGhibzt5oHJM1eRD5UrwRAvhZPNhs48fC9L00UjaCIuJq');
const YOUR_DOMAIN = 'http://localhost:3000';



exports.createCheckOutSession2 = async (req, res) => {


  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1NIf38I8HrVwrRfPhB9jwg4q',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    automatic_tax: {enabled: true},
  });

  res.redirect(303, session.url);
};
  
  




  
  exports.createCheckOutSession = async (req, res) => {

    try {

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'eur',
              unit_amount: 10 * 100, // Montant total du panier en cents (conversion en euros)
              product_data: {
                name: 'Panier', // Nom du produit ou description du panier
              },
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}?success=true`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true`,
        automatic_tax: { enabled: true },
      });
      console.log("je suis dans stripe avant redirection");
      res.redirect(303, session.url);


      console.log(session.url)
      
    } catch (error) {
      console.error('Une erreur est survenue lors de la création de la session de paiement', error);
      res.status(500).json({ error: 'Erreur lors de la création de la session de paiement' });
    }
  };