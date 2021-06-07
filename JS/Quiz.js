class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
      
    question.hide();

      background("yellow");
      textSize(40);
      text("Result of Quiz",300,70);
      text("----------------------",280,90);
      Contestant.getPlayerInfo();

      if(allContestants!==null)
      {
        textSize(20);
        text("* Note: Contestants Who Answered Correctly Are HIGHTILED In Green Colour",70,220);

        var display_position = 260;
        for(var plr in allContestants)
        {
          var correctAns="2";
          if(correctAns===allContestants[plr].answer)
          fill("green");
          else
          fill("red");
  
        display_position+=30;
        textSize(25);
        text(allContestants[plr].name+": "+allContestants[plr].answer,120,display_position)
      }
    }
  }

}
