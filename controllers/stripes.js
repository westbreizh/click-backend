const stripe = require('stripe')('sk_test_51NGdYqI8HrVwrRfPKAmQ17TgZh2yWZtGjNNqhHyMXhebWNh03YR5zgGhibzt5oHJM1eRD5UrwRAvhZPNhs48fC9L00UjaCIuJq');

const YOUR_DOMAIN = 'https://click-and-raquette.com/';



  
  exports.createCheckOutSession = async (req, res) => {
    console.log("je rentre dans stripe backend")

    try {

      const session = await stripe.checkout.sessions.create({

        line_items: [ //peut decrire mon panier
          {
            price_data: {
              currency: 'eur',
              unit_amount: 15 * 100, // Montant total du panier en cents (conversion en euros)
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

  







