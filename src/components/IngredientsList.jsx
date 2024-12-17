import { getRecipeFromMistral } from "../../ai";
import { useState } from "react";
import Recipe from "./Recipe";

export default function IngredientsList(props) {
  const ingredientsListItems = props.ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));
  const [recipe, setRecipe] = useState("");

  async function getRecipe(ingredients) {
    const recipeMarkdown = await getRecipeFromMistral(props.ingredients);
    setRecipe(recipeMarkdown);
  }

  return (
    <section>
      <h2>Ingredients on hand:</h2>
      <ul className="ingredients-list" aria-live="polite">
        {ingredientsListItems}
      </ul>
      {props.ingredients.length > 3 && (
        <div className="get-recipe-container">
          <div>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>
          {/* <button onClick={props.toggleRecipeShown}>Get a recipe</button> */}
          <button onClick={() => getRecipe(props.ingredients)}>
            Get a recipe
          </button>
        </div>
      )}
      <Recipe recipe={recipe}></Recipe>
    </section>
  );
}
