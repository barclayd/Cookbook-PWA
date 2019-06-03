const collectionName = 'recipes';
// real time listener
db.collection(collectionName).onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    console.log(change, change.doc.data(), change.doc.id);
    if (change.type === 'added') {
      // add document data to web page
      renderRecipe(change.doc.data(), change.doc.id);
    }
    if (change.type === 'removed') {
      // remove document data from web page
    }
  });
});

// add new recipe

const form = document.querySelector('form');
form.addEventListener('submit', async event => {
  event.preventDefault();
  console.log(form);
  const recipe = {
    title: form.title.value,
    ingredients: form.ingredients.value,
  };

  const data = await db.collection(collectionName).add(recipe);
  if (!data) {
    throw new Error('Failed to add new recipe');
  }
  form.title.value = '';
  form.ingredients.value = '';
});
