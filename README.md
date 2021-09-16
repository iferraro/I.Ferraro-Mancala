# Mancala

## Intro
Mancala is a turn-based board game that has existed since before the first century AD. Its name stems from the Arabic word "naqala", which means "to move" or "to transfer". Athough the game's exact origins are unknown, it is believed that Arabic traders brought the game to Africa, from where it has now gained global adoption. There are several variations of the game's rules, some of which are location-specific. A traditional Mancala board contains twelve pits (two rows of six) in the middle, as well as two larger rectangles (called "mancalas") at the end for each of the two players. 48 small implements (stones, beads, shells, etc.) are used as gamepieces. My version, however, is a bit minimal compared to the real-life game. Instead of using individual implements, my version uses numbers to represent the number of items in each square or mancala.
## Screenshots
![Game board at start](https://i.imgur.com/HhfyApD.png)
![During gameplay](https://i.imgur.com/RNbVVY5.png)
## Technologies Used
I produced all of the HTML, CSS, and JavaScript in Visual Studio Code. Testing and debugging were done in Microsoft Edge. 
## Link to Game
[GitHub Pages](https://iferraro.github.io/I.Ferraro-Mancala/)
## Rules
At the start, the player will be able to click on any of the six pits on the bottom row. This is the player's side of the board. Once this happens, the stones that were in the selected pit will be distributed in a counterclockwise direction. Starting from the next pit along the player's path, one stone from the seleceted pit will be dropped in each pit along the player's path until there are none left. If the last stone lands in the player's mancala, on the right, it will turn green, indicating that they can pick up stones from another one of their pits and make a second move. If the player's move ends in any spot on the board besides their own mancala, then it will be the computer's turn.
Neither of the players drop stones in their opponents' mancalas.
If any of the players' last stone dropped is the only one in a pit on their side, and there is at least one in the pit directly opposite, then they will collect that one stone along with however many are in the opposite pit, and put them in their mancala.
The game ends when one of the players' rows is empty. Once this happens, the opponent collects all of the stones in their row and places them in their mancala. Whoever has the most stones wins.
