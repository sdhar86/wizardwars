This is a simple 30 card game simulating wizard duel between two players. 

<ul>
	<li>Each player starts with 20 lifepoints, your goal is to reduce your opponent's life point to 0. </li>
	<li>There are 6 kinds of cards: 
		<ul>
		  <li>Curses: -5 through -10 lifepoints on opponents (6 cards) </li>
		  <li>Blasts: -1 through -4 lifepoints on opponents that can't be blocked/rebounded/doubled (4 cards)</li>
		  <li>Blocks: Blocks an incoming curse (4 cards) </li>
		  <li>Rebounds: Rebounds the oncoming curse (4 cards) </li>
		  <li>Doublers : Doubles the incoming curse and rebounds (2 cards) </li>
		  <li>Healers: +1 through +5, increases lifepoints.</li>
	  </ul>	
	</li>
	<li>After every 10 turns, both duelists lose -1 lifepoints due to fatigue</li>
	<li>Curses can be blocked, doubled or rebouned</li>
	<li>Blasts cannot be avoided</li>
	<li>Players always have 3 cards on their hands</li>
	<li>On a player's turn, they draw a card from deck and plays a card (to table)</li>
	<li>Opponent can take the hit and play a counter curse, or rebound/block/double</li>
	<li>Players can also pass and take one life point hit</li>
	<li>If you do not have any offensive card at hand, you can pass and take a hit or waste a card (play and draw a new card)</li>
	<li>If there are not enough cards in deck, the table cards are shuffled and moved to deck.</li>
	<li>Players can play healing cards and increase life points at anytime of the game.</li>
	<li>Users have one last chance to heal themselves, when they reach 0 if they have a healer card in hand.e.g:
		<ul>
			<li>Say Player A is at 2, got hit by -3 blast. He can play +4 (which he has in his hand)  and bring his lifepoint back to (2-3) + 4 = +3. He survices the attack  </li>
			<li>Player A is at +2 and gets hit by rebounded -10 curse. He cannot use +4 to revive himself since (2-10)+4 < 0. He does not survive the attack. </li>
		</ul>
	</li>
</ul>

