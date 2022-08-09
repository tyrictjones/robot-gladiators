//function to fight or skip the round
var fightOrSkip = function() {
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
    
        //Recursive function call if response is blank or null
        if (!promptFight) {
            window.alert("You need to provide a valid answer! Please try again.");
            return fightOrSkip();
        }

        promptFight = promptFight.toLowerCase();
        
        // if player picks "skip" confirm and then stop the loop
        if (promptFight === "skip") {
          // confirm player wants to skip
          var confirmSkip = window.confirm("Are you sure you would like to quit?");
    
        // if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
            // subtract money from playerInfo.money for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);

            //return true if the player wants to leave
            return true;
        }
    }

    return false;
};//end of fight or skip function



var fight = function(enemy) {
    //keep track of who goes first
    var isPlayerTurn = true;

    //randomly change turn order
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }

    while (playerInfo.health > 0 && enemy.health > 0) {
        if (isPlayerTurn) {
        // ask player if they'd like to fight or run
        if (fightOrSkip()) {
            //if true, leave fight by breaking loop
            break;
        }
    
        // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
        enemy.health = Math.max(0, enemy.health - damage);
        console.log(
          playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
        );
    
        // check enemy's health
        if (enemy.health <= 0) {
          window.alert(enemy.name + ' has died!');
    
          // award player money for winning
          playerInfo.money = playerInfo.money + 20;
          // leave while() loop since enemy is dead
          break;
        } else {
          window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
        }

        //player gets attacked first
        } else {
    
        // remove players's health by subtracting the amount set in the enemy.attack variable
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        console.log(
          enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
        );
    
        // check player's health
        if (playerInfo.health <= 0) {
          window.alert(playerInfo.name + ' has died!');
          // leave while() loop if player is dead
          break;
        } else {
          window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
        }
      } 

      //switch turn order to the next round
      isPlayerTurn = !isPlayerTurn;
    }// end of while loop
}; // end of fight function



//function to start a new game
var startGame = function () {
//reset player stats
playerInfo.reset();
for(var i = 0; i < enemyInfo.length; i++) {
    if (playerInfo.health > 0) {
        window.alert("Welcome to Robot Gladiators! Round " + (i+1));
        var pickedEnemyObj = enemyInfo[i];
        pickedEnemyObj.health = randomNumber(40,60);
        fight(pickedEnemyObj);
        //if we're not at the last enemy in the array
        if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
            //ask if player wants to use the store before the next round
            var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
            if (storeConfirm) {
            shop();
            }
        }
    } 
    else {
        window.alert("You have lost your robot in battle! Game Over!");
        break;
    }
}
//after the loop ends, the player is either out of health or enemies to fight, so run the endGame function
endGame();
}; // end of startGame function



//function to end the entire game
var endGame = function() {
    //if player is still alive, player wins
    if (playerInfo.health > 0) {
        window.alert("Great job, you have survived the game! You now have a score of " + playerInfo.money + ".");
    }
    else {
    window.alert("You have lost your robot in battle.");
    }
    //ask player if they want to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");
    if (playAgainConfirm) {
        //restart game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
}; // end of endGame function



//shop function
var shop = function() {
    //Ask player what they would like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to (1) REFILL your health, (2) UPGRADE you attack, or (3) LEAVE the store? Please enter one: 1 for REFILL, 2 for UPGRADE, or 3 to LEAVE."
    );
    //use switch to carry out action
    shopOptionPrompt = parseInt(shopOptionPrompt);
    switch(shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;
        
        case 2:
            playerInfo.upgradeAttack();
            break;
        
        case 3:
            window.alert("Leaving the store.");
            break;
        
        default:
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }
};

//function to generate a random value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
};//end of random number function



//function to set player name
var getPlayerName = function() {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name);
    return name;
};//end function to set player name



var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if(this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -=7;
        }
        else {
            window.alert("You do not have enough money!");
        }
    },
    upgradeAttack: function() {
        if(this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You do not have enough money!");
        }
    }

};

var enemyInfo = [
    {  
        name: "Roborto",
        attack: randomNumber(10,14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10,14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10,14)
    }
];



//start the game when the page loads
startGame();