export function suggestions(languages) {
  const moves = ["avancer", "reculer", "droite", "gauche", "haut", "bas"];
  const actions = ["demarrer", "arreter", "emmergency"];
  const moveSnippets = moves.map((el) => {
    return {
      label: el,
      kind: languages.CompletionItemKind.Function,
      insertText: el + "(30)",
      insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation:
        "Prend un int en parametre compris entre 20 et 500 et fait " +
        el +
        " le drone de cette valeur",
    };
  });
  const actionSnippets = actions.map((el) => {
    return {
      label: el,
      kind: languages.CompletionItemKind.Function,
      insertText: el + "()",
      insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: el + " le programme",
    };
  });

  return [...moveSnippets, ...actionSnippets];
}
