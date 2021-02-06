const c = (i) => document.getElementById(i);

const input = c("search_input");
const btn = c("search_btn");
const foodContainer = c("food_container");
const foodRecipe = c("food_recipe");

function getMealData(mealName) {
  const baseUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealName}`;
  fetch(baseUrl)
    .then((res) => res.json())
    .then((data) => displayMealData(data.meals))
    .catch((err) => console.log(err));
}

getMealData("rice");

function displayMealData(mealLists) {
  console.log(mealLists);
  if (mealLists === null) {
    foodContainer.innerHTML = `<h1>Search item Not Found</h1>`;
  } else {
    const newMealLists = mealLists.slice(0, 8);

    newMealLists.forEach((meal) => {
      const { strMeal, strMealThumb, idMeal } = meal;
      let div = document.createElement("div");

      div.innerHTML = `
        <img src="${strMealThumb}" class="img_meal" alt="meal image">
        <h6 class="mt-2">${strMeal}</h6>
        `;

      div.classList.add("food", "col-6", "col-sm-4", "col-md-3", "c_pointer");

      foodContainer.appendChild(div);

      // recipe details function call
      getDetails(div, idMeal);
    });
  }
}

// search btn
btn.addEventListener("click", () => {
  getMealData(input.value);
  foodContainer.innerHTML = "";
  foodRecipe.innerHTML = "";
  input.value = "";
});

// recipe details function
function getDetails(generatedDiv, mealId) {
  generatedDiv.addEventListener("click", () => {
    const baseUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${
      mealId + 3
    }`;
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
    const { strMeal, strMealThumb } = recipes;
    const div = document.createElement("div");

    // lop object property
    const ul = document.createElement("ul");
    Object.keys(recipes);
    for (let i = 1; i < 21; i++) {
      let ingredients;
      let measure;
      if (
        recipes[`strIngredient${i}`] == "" ||
        recipes[`strMeasure${i}`] == " "
      ) {
        continue;
      } else {
        ingredients = recipes[`strIngredient${i}`];
        measure = recipes[`strMeasure${i}`];
      }

      const li = document.createElement("li");

      li.innerText = `${ingredients} ${measure}`;
      ul.appendChild(li);
    }

    div.innerHTML = `
    <img
            src="${strMealThumb}"
            class="img_meal_recipe"
            alt="food image"
          />
          <h2 class="mt-3">${strMeal}</h2>
          <h4 class="mt-4">Ingredients</h4>
          ${ul.innerHTML}
    `;

    div.classList.add("mt-5");

    foodRecipe.append(div);
  }

  console.log(recipe[0]);
}

/**
 * 
 * const { strMeal, strMealThumb } = recipe;
  const div = document.createElement("div");

  // lop object property
  const ul = document.createElement("ul");
  Object.keys(recipe);
  for (let i = 1; i < 21; i++) {
    let ingredients;
    let measure;
    if (recipe[`strIngredient${i}`] == "" || recipe[`strMeasure${i}`] == " ") {
      continue;
    } else {
      ingredients = recipe[`strIngredient${i}`];
      measure = recipe[`strMeasure${i}`];
    }

    const li = document.createElement("li");

    li.innerText = `${ingredients} ${measure}`;
    ul.appendChild(li);
  }

  div.innerHTML = `
    <img
            src="${strMealThumb}"
            class="img_meal_recipe"
            alt="food image"
          />
          <h2 class="mt-3">${strMeal}</h2>
          <h4 class="mt-4">Ingredients</h4>
          ${ul.innerHTML}
    `;

  div.classList.add("mt-5");

  foodRecipe.append(div);
 */
