
db.query(`SELECT * FROM player WHERE email='${req.body.email}'`, 
(err, result) => {
  const userId = result[0].id;
  const token = jwt.sign(        
    { userId: userId },
    Token_Secret_Key, 
    { expiresIn: '24h' }
  );
  delete (result[0].password);
  const userInfo = result[0];

  //on essaie de retrouver l'adresse du joueur si elle est renseigné
  db.query(`SELECT * FROM address WHERE inHabitant='${userId}'`, 
  (err, result) => {
    const userAddress = result[0]
    console.log(userAddress)
    console.log(userInfo)


    //on retourne des datas et le message
    return res.status(201).json(data = {
      userInfo: userInfo,
      userAddress: userAddress,
      token: token,
      message: 'connexion au site réussie !'
    });
  })
}
)
