const input = document.getElementById("search_input");
const btn = document.getElementById("search_btn");
const foodContainer = document.getElementById("food_container");
const foodRecipe = document.getElementById("food_recipe");

function getMealData(mealName) {
  const baseUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
  fetch(baseUrl)
    .then((res) => res.json())
    .then((data) => displayMealData(data.meals))
    .catch((err) => console.log(err));
}

function displayMealData(mealLists) {
  console.log(mealLists);
  if (mealLists === null) {
    foodContainer.innerHTML = `<h1>Search item Not Found</h1>`;
  } else {
    // const newMealLists = mealLists.slice(0, 8);
    const newMealLists = mealLists;

    newMealLists.forEach((meal) => {
      const { strMeal, strMealThumb, idMeal } = meal;
      const div = document.createElement("div");

      div.innerHTML = `
      <a href="#food_recipe">
      <img src="${strMealThumb}" class="img_meal" alt="meal image">
      <h6 class="mt-2">${strMeal}</h6>
      </a>
        `;

      div.classList.add("food", "col-6", "col-sm-4", "col-md-3", "c_pointer");

      foodContainer.appendChild(div);

      // meal details function call
      getMealDetails(div, idMeal);
    });
  }
}

// search btn
btn.addEventListener("click", () => {
  getMealData(input.value);
  foodContainer.innerHTML = "";
  foodRecipe.innerHTML = "";
  input.value = "";
  document.getElementById("food_items").style.visibility = "visible";
});

// recipe details function
function getMealDetails(generatedDiv, mealId) {
  generatedDiv.addEventListener("click", () => {
    const baseUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => showRecipeDetails(data.meals))
      .catch((err) => console.log(err));
    foodRecipe.innerHTML = "";
  });
}

function showRecipeDetails(recipe) {
  if (recipe === null) {
    foodRecipe.innerHTML = `<h1 class="mt-5 text-capitalize">Something went wrong. data not found</h1>`;
  } else {
    const recipes = recipe[0];
    const {
      strMeal,
      strMealThumb,
      strInstructions,
      strYoutube,
      strSource,
    } = recipes;
    /**
     * second method
     */
    const div = document.createElement("div");
    const divIngredient = document.createElement("div");
    const divMeasure = document.createElement("div");

    displayRecipes(getRecipe(recipes, "measure"), divMeasure);
    displayRecipes(getRecipe(recipes, "ingredient"), divIngredient);
    getRecipe(recipes, "measure").forEach((e) => {
      console.log(e);
    });

    div.innerHTML = `
    <img src="${strMealThumb}"class="img_meal_recipe" alt="food image"/>
          <h2 class="mt-3">${strMeal}</h2>
          <h4 class="mt-4">Ingredients</h4>
          <div style="display: flex;">
          <div style="width: 300px; font-weight: bold;">${divMeasure.innerHTML}</div> <div> ${divIngredient.innerHTML}</div>
          </div>
          <div style="width:400px; white-space: pre-line;">
          <h3 class="mt-4">Instructions</h3>
          ${strInstructions}
          </div>
          <div style="width:400px; white-space: pre-line;">
          <h3 class="mt-2">Recipe Source</h3>
          <div style="display:flex;">
          <a href=" ${strSource}" target="_blank">Source</a>
          <a class="ps-3" href=" ${strYoutube}" target="_blank">Youtube</a>
          </div>
          </div>
          
    `;
    div.classList.add("mt-5");
    foodRecipe.append(div);
  }
}

// get filtered recipes
function getRecipe(obj, filterString) {
  const filteredRecipes = Object.keys(obj)
    .filter((d) => d.toLowerCase().indexOf(filterString.toLowerCase()) !== -1)
    .reduce((p, c) => {
      if (obj[c] !== "" && obj[c] !== " ") {
        p.push(obj[c]);
      }
      return p;
    }, []);
  return filteredRecipes;
}

// display recipes
function displayRecipes(recipesVar, divVar) {
  recipesVar.forEach((recipe) => {
    const span = document.createElement("span");
    span.innerText = recipe;
    divVar.appendChild(span);
  });
}