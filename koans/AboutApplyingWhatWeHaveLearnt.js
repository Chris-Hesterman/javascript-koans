var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];
      const noShrooms = function(value) {
        return value !== "mushrooms";
      }
      const noNuts = products.filter(product => {
        return !product.containsNuts
      });

      productsICanEat = noNuts.filter(product => {
        if (!_.any(product.ingredients, function(ingredient) {
          return ingredient === "mushrooms";
        })) {
          return product;
        }
      });

      return productsICanEat;

      /* solve using filter() & all() / any() (Done!)*/

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    //*** my original unorthodox solution */
    var sum = _.reduce(_.range(1, 1000), function(memo, num) {
      return (num % 3 === 0 || num % 5 === 0) ? memo + num: memo;
      }, 0);

    /* try chaining range() and reduce() */

    // I came back to this after trying to better understand the use of _.chain.  Gave it
    // another shot really trying to understand it fully.  I did find the trick of starting
    // the chain with a single digit then using range to expand it.  I like that this avoids
    // a whole other variable.

    // var sum = _.chain(1)
    //   .range(1000)
    //   .filter(function(num) {
    //     return num % 3 === 0 || num % 5 === 0;
    //   })
    //   .reduce(function(memo, num) {
    //     return memo + num;
    //   }, 0)
    //   .value();

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    /* chain() together map(), flatten() and reduce() */
    var ingredientCount = { "{ingredient name}": 0 };
    let ingredientsArr = _.chain(products)
      .map(function(product) {
        return product.ingredients;
      })
      .flatten()
      .reduce(function(ingredientCount, ingredient) {
        ingredientCount[ingredient] = (ingredientCount[ingredient] || 0) + 1;
        return ingredientCount;
      }, ingredientCount)
      .value();

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  /*
  it("should find the largest prime factor of a composite number", function () {

  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {


  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {

  });

  it("should find the 10001st prime", function () {

  });
  */
});
