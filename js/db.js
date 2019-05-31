const collectionName = "recipes";
// real time listener
db.collection(collectionName).onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    console.log(change, change.doc.data(), change.doc.id);
    if (change.type === "added") {
      // add document data to web page
      renderRecipe(change.doc.data(), change.doc.id);
    }
    if (change.type === "removed") {
      // remove document data from web page
    }
  });
});
