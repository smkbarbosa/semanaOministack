const User = require('../models/Users');
/* 
Métodos disponíveis dentro de um controle
index, show, store, update, destroy
--> Padrão MVC
*/

module.exports= {
    async store(req, res) {
        //desestruturação
        const { email } = req.body;
        
        let user = await User.findOne({ email })

        if (!user) {
            user = await User.create({ email })
        }
        // const user = await User.create({ email })
        return res.json(user);
    }
};