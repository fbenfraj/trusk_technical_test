const Promise = require("bluebird");
const { myRedis } = require("../services/MyRedis");
const { askQuestion, checkAnswers, logCachedInfos } = require("./questions");
const { myQuestions } = require("../config/questions.config");

const startChatBot = async () => {
  try {
    await logCachedInfos();

    await Promise.mapSeries(myQuestions, async (question) => {
      return await askQuestion(question);
    });

    await logCachedInfos();

    const infosAreValid = await checkAnswers();
    if (!infosAreValid) {
      await myRedis.flush();
      return await startChatBot();
    } else {
      await myRedis.flush();
      process.exit();
    }
  } catch (error) {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log(
        "Impossible de lancer le chatbot dans l'environnement actuel."
      );
    } else {
      // Something else went wrong
      console.log(error);
    }
  }
};

module.exports = {
  startChatBot,
};
