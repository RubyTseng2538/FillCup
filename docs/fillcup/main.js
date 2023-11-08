title = "FILL THE CUP";

description = `
`;

const G = {
	WIDTH: 300,
	HEIGHT: 150,
	CUP_SPEED: 1.0
};

characters = [];

options = {viewSize: {x: G.WIDTH, y: G.HEIGHT}};

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
* pos: Vector,
* size: number
* }} Cup
*/

/**
* @type { Cup [] }
*/
let cup;

/**
 * @type { number }
 */
let cupCount;

function update() {
	if (!ticks) {
		table ={
			pos: vec(G.WIDTH/2, G.HEIGHT - G.HEIGHT/8)
		};
		cup = [];
		cupCount = 0;
	}

	color("light_black");
	box(table.pos, 300, -40);

	if(cup.length === 0){
		const posX = 0;
		const posY = G.HEIGHT - G.HEIGHT/3 ;
		cup.push({
			pos: vec(posX, posY),
			size: rnd(5, 10)
		}); 

		cupCount++;
	}

	color("black");
	cup.forEach((s) =>{
		if(s.pos.x != G.WIDTH/2){
			s.pos.x += G.CUP_SPEED;
		}
		color("black");
        bar(s.pos.x-10, s.pos.y+5-s.size, s.size*3, 5, -1.58, 0.5);
		bar(s.pos.x+10, s.pos.y+5-s.size, s.size*3, 5, -1.58, 0.5);
		bar(s.pos.x, s.pos.y+s.size+1, 10, 5, 3.14, 0.5);
	})
}
