const fs = require('fs');
const path = require('path');

module.exports = function(file) {

    const functions = {

        path: path.join(__dirname, '..', 'data', file + '.json'),

        readJson: function(){
            let products = fs.readFileSync(this.path, 'utf-8');
            products = JSON.parse(products);
            return products;
        },

        writeJson: function(products){
            products = JSON.stringify(products, null, " ");
            return fs.writeFileSync(this.path, products);                     
        },

        save: function(newProduct){
            let products = this.readJson();
            products = [...products, newProduct];

            return this.writeJson(products);
        },

        findById: function(){

        },

        filterBySomething: function(){


        },

        findBySomething: function(){

        },

        edit: function(){

        }
    }

    return functions;

}