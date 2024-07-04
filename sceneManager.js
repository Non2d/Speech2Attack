let previousScene = null;
let sceneChanged = false;

const GameScene = {
  mainMenu: {
    key: "mainMenu",
    init: initMainMenu, //BeginPlay/Tickとか、Start/Updateとか。
    func: mainMenu,
  },
  inGame: {
    key: "inGame",
    init: initInGame,
    func: inGame,
  },
};

function sceneManager(sceneKey) {
  const scene = GameScene[sceneKey];
  if (!scene) {
    console.error("Undefined Scene.");
    return;
  } else if (sceneKey !== previousScene) {
    scene.init();
  }
  scene.func();

  previousScene = sceneKey;
}

// function sceneManager(scene) {
//   sceneChanged = scene!==previousScene;
//   switch (scene) {
//     case GameScene.mainMenu.key:
//       if(sceneChanged){
//         GameScene.mainMenu.init();
//       }
//       GameScene.mainMenu.func(2);
//       break;
//     case GameScene.inGame.key:
//       if(sceneChanged){
//         GameScene.inGame.init();
//       }
//       GameScene.inGame.func(41);
//       break;
//     default:
//       console.error("Undefined Scene.")
//   }
//   previousScene = scene;
//   console.log(sceneChanged,scene);
// }
