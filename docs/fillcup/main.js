title = "FILL THE CUP";

description = `
`;

const G = {
	WIDTH: 300,
	HEIGHT: 150,
	CUP_SPEED: 1.0
};

characters = [
	`
	cc
	cc
	`
];

options = {
	viewSize: {x: G.WIDTH, y: G.HEIGHT},
theme: "simple"};

/**
 * @typedef {{
* pos: Vector
* }} Table
*/

/**
* @type { Table [] }
*/
let table;

/**
 * @typedef {{
* pos: Vector
* }} Dispenser
*/

/**
* @type { Dispenser [] }
*/
let dispenser;

/**
 * @typedef {{
* pos: Vector
* }} WaterDrop
*/

/**
* @type { WaterDrop [] }
*/
let waterDrop;

/**
 * @typedef {{
* pos: Vector,
* width: number,
* height: number
* }} Cup
*/

/**
* @type { Cup [] }
*/
let cup;

/**
 * @type { number }
 */
let water;

/**
 * @type { number }
 */
let cupCount;

function update() {
	if (!ticks) {
		table ={
			pos: vec(G.WIDTH/2, G.HEIGHT - G.HEIGHT/8)
		};
		dispenser = {
			pos: vec(G.WIDTH/2, G.HEIGHT - G.HEIGHT/2)
		};
		waterDrop = {
			pos: vec(G.WIDTH/2-1, G.HEIGHT - G.HEIGHT/2-25)
		};
		cup = [];
		cupCount = 0;
		water = 0;
	}

	color("light_black");
	box(dispenser.pos, 50, 100);
	color("black");
	bar(dispenser.pos.x-25, dispenser.pos.y, 100, 5, -1.58, 0.5);
	bar(dispenser.pos.x+25, dispenser.pos.y, 100, 5, -1.58, 0.5);
	bar(dispenser.pos.x, dispenser.pos.y-50, 50, 5, 3.14, 0.5);
	bar(dispenser.pos.x, dispenser.pos.y-25, 50, 5, 3.14, 0.5);
	bar(dispenser.pos.x-5, dispenser.pos.y-20, 10, 3, -1.58, 0.5);
	bar(dispenser.pos.x+5, dispenser.pos.y-20, 10, 3, -1.58, 0.5);
	bar(dispenser.pos.x, dispenser.pos.y-12, 10, 3, 3.14, 0.5);
	

	color("light_black");
	box(table.pos, 300, -40);

	if(cup.length === 0){
		const posX = 0;
		const posY = G.HEIGHT - G.HEIGHT/3 ;
		cup.push({
			pos: vec(posX, posY),
			width: 10,
			height: 20
		}); 

		cupCount++;
	}
	
	color("blue");
	cup.forEach((s) =>{
		if(s.pos.x != G.WIDTH/2){
			s.pos.x += G.CUP_SPEED;
		}
        bar(s.pos.x-10, s.pos.y, s.height, 5, -1.58, 0.5);
		bar(s.pos.x+10, s.pos.y, s.height, 5, -1.58, 0.5);
		bar(s.pos.x, s.pos.y+10, 10, 5, 3.14, 0.5);
		color("red");
		bar(s.pos.x, s.pos.y-10, 12, 1, 3.14, 0.5);
		color("cyan")
		rect(s.pos.x-8, G.HEIGHT/2+32, 15, -water);
		if(water == 18 && !input.isPressed){
			s.pos.x += G.CUP_SPEED;
		}
		if(s.pos.x > G.WIDTH){
			remove(cup, (s)=>{
				return s.pos.x = 0;
			});
			water = 0;
			addScore(1);
			cupCount++;
		}
	})
	

	if(input.isPressed){
		color("cyan")
		waterDrop.pos.y += cupCount;
		char("a", waterDrop.pos);
		const isCollidingWithCup = char("a", waterDrop.pos).isColliding.rect.blue;
		if(isCollidingWithCup){
			waterDrop.pos.y = G.HEIGHT- G.HEIGHT/2-25;
			water++
		}
		if(waterDrop.pos.y > G.HEIGHT){
			waterDrop.pos.y = G.HEIGHT - G.HEIGHT/2-25
		} 
		// water++;
	}
	if(water > 18){
		end();
	}
}
