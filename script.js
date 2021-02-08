const input = document.getElementById("search_input");
const btn = document.getElementById("search_btn");
const foodContainer = document.getElementById("food_container");
const foodRecipe = document.getElementById("food_recipe");

function getMealData(mealName) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    .then((res) => res.json())
    .then((data) => displayMealData(data.meals))
    .catch((err) => console.log(err));
}

function displayMealData(mealLists) {
  console.log(mealLists);
  if (mealLists === null) {
    foodContainer.innerHTML = `<h1>Search item Not Found</h1>`;
  } else {
    mealLists.forEach((meal) => {
      const { strMeal, strMealThumb, idMeal } = meal;
      const div = document.createElement("div");

      div.innerHTML = `
      <a href="#food_recipe">
      <img src="${strMealThumb}" class="img_meal img-fluid" alt="meal image">
      <h4 class="mt-2">${strMeal}</h4>
      </a>
        `;

      div.classList.add("food", "col-6", "col-sm-4", "col-md-3", "col-lg-2");

      foodContainer.appendChild(div);

      // meal details function call
      getMealDetails(div, idMeal);
    });
  }
}

// search btn
btn.addEventListener("click", () => {
  if(input.value.length !== 0 && input.value !== " "){
    getMealData(input.value);
    foodContainer.innerHTML = "";
  }else{
    foodContainer.innerHTML = `<h1>Please Write Something</h1>`
  }
  foodRecipe.innerHTML = "";
  input.value = "";
  document.getElementById("food_items").style.visibility = "visible";
});

// recipe details function
function getMealDetails(generatedDiv, mealId) {
  generatedDiv.addEventListener("click", () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then((res) => res.json())
      .then((data) => showRecipeDetails(data.meals))
      .catch((err) => console.log(err));
    foodRecipe.innerHTML = "";
  });
}

function showRecipeDetails(mealsData) {
  if (mealsData === null) {
    foodRecipe.innerHTML = `<h1 class="mt-5 text-capitalize">Something went wrong. data not found</h1>`;
  } else {
    const recipes = mealsData[0];
    const { strMeal, strMealThumb, strInstructions } = recipes;
    const div = document.createElement("div");
    const ul = document.createElement("ul");
    // concat recipes data
    const ingredients = getRecipes(recipes, "ingredient");
    const measures = getRecipes(recipes, "measure");
    ingredients.forEach((e, i) => {
      const li = document.createElement("li");
      li.innerHTML = `<span class="fa-li"><i class="fas fa-check-square"></i></span> ${measures[i]} ${e}`;
      ul.appendChild(li);
    });

    div.innerHTML = `
    <img src="${strMealThumb}"class="img_meal_recipe" alt="food image"/>
          <h1 class="mt-3">${strMeal}</h1>
          <h4 class="mt-4">Ingredients</h4>
        <ul class="fa-ul"> ${ul.innerHTML}</ul>
        <div style="max-width: 600px; white-space: pre-line;">
         <h3>Instructions</h3>
         ${strInstructions}
         </div>
          
    `;
    div.classList.add("mt-5");
    foodRecipe.append(div);
  }
}

// get filtered recipes
function getRecipes(obj, filterString) {
  const filteredRecipes = Object.keys(obj)
    .filter((d) => d.toLowerCase().indexOf(filterString.toLowerCase()) !== -1)
    .reduce((p, c) => {
      if (obj[c] !== null && obj[c] !== "" && obj[c] !== " ") {
        p.push(obj[c]);
      }
      return p;
    }, []);
  return filteredRecipes;
}
