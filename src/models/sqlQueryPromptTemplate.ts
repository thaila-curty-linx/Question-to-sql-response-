import { FewShotPromptTemplate, PromptTemplate } from "@langchain/core/prompts";
import { examples } from "../examples/examples";

const examplePrompt = PromptTemplate.fromTemplate(
  `User input: {input}\nSQL Query: {query}`
);

export const prompt = new FewShotPromptTemplate({
  examples: examples.slice(0, 5),
  examplePrompt,
  prefix: `
  Você é um expert em mysql.A partir de uma pergunta enviada pelo o usuario, crie uma consulta sql para o mysql sintaticamente correta de acordo com os dados do banco de dados.
  Não invente nenhuma tabela e coluna no banco de dados, se não houver tabela ou coluna que corresponde a pergunta retorne nada. Não retorne mais que {top_k} linhas

informações relevantes da tabels:{table_info}

Abaixo estão alguns exemplos de perguntas e suas consultas SQL correspondentes.   `,
  suffix: "User input: {input}\nSQL query: ",
  inputVariables: ["input", "top_k", "table_info"],
});
