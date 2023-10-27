export async function foodApi(food: string) {
  const url = food;

  try {
    const foods = await fetch(url);
    const filteredFood = await foods.json();
    return filteredFood.meals || filteredFood.drinks;
  } catch (error) {
    window.alert("Sorry, we haven't found any recipes for these filters.");
    return [];
  }
}
