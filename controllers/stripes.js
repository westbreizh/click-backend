const stripe = require('stripe')('sk_test_51NGdYqI8HrVwrRfPKAmQ17TgZh2yWZtGjNNqhHyMXhebWNh03YR5zgGhibzt5oHJM1eRD5UrwRAvhZPNhs48fC9L00UjaCIuJq');
const YOUR_DOMAIN = 'http://localhost:3000';


exports.createCheckOutSession = async (req, res) => {
  console.log("je rentre dans stripe backend");

  try {

    const totalPriceString = req.body.totalPrice;
    const totalPrice = Number(totalPriceString.replace(",", "."));
    const unitAmount = totalPrice * 100;

    const articleList = JSON.parse(req.body.articleList).map(article => ({
      id: article.id,
      categorie: article.categorie,
      price: article.price,
      quantity: article.quantity
    }));

    console.log(req.body.articleList)
    console.log(articleList)


    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'paypal'], // Ajoutez 'paypal' pour activer PayPal
      line_items: [
        {
          price_data: {
            currency: 'eur',
            unit_amount: unitAmount,
            product_data: {
              name: 'Votre commande sur click and raquette',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'payment',

      success_url: `${YOUR_DOMAIN}/paiement-accepte`,
      cancel_url: `${YOUR_DOMAIN}/paiement-refuse`,
      automatic_tax: { enabled: false },
      metadata: {
        articleList: JSON.stringify(articleList),
        totalPrice: totalPrice.toFixed(2),
      },

    });

    console.log("je suis dans stripe avant redirection");
    res.redirect(303, session.url);

  } catch (error) {
    console.error('Une erreur est survenue lors de la création de la session de paiement', error);
    res.status(500).json({ error: 'Erreur lors de la création de la session de paiement' });
  }
};






  







