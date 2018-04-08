class Character{
	constructor(x1, y1, w1, h1, x2, y2, w2, h2){
		this.x1 = x1;
		this.y1 = y1;
		this.w1 = w1;
		this.h1 = h1;

		this.x2 = x2;
		this.y2 = y2;
		this.w2 = w2;
		this.h2 = h2;
	}

	render(x, y, size){
		if (size == 0){
			Render.drawImage(images[3],x,y,this.x1,this.y1,this.w1,this.h1,0);
		}
		else if (size == 1){
			Render.drawImage(images[3],x,y,this.x2,this.y2,this.w2,this.h2,0);	
		}
	}

}

var Text = {
	symbols: new Map(),
	init: function(){
		console.log("initialiserer tekst ekslusive variabler");
		this.symbols.set("A",new Character(0,15,5,5, 0,0,7,7));
		this.symbols.set("B",new Character(5,15,4,5, 7,0,6,7));
		this.symbols.set("C",new Character(9,15,4,5, 13,0,6,7));
		this.symbols.set("D",new Character(13,15,4,5, 19,0,6,7));
		this.symbols.set("E",new Character(17,15,3,5, 25,0,5,7));
		this.symbols.set("F",new Character(20,15,3,5, 30,0,5,7));
		this.symbols.set("G",new Character(23,15,4,5, 35,0,6,7));
		this.symbols.set("H",new Character(27,15,3,5, 41,0,5,7));
		this.symbols.set("I",new Character(30,15,3,5, 46,0,5,7));
		this.symbols.set("J",new Character(33,15,3,5, 51,0,5,7));
		this.symbols.set("K",new Character(36,15,3,5, 56,0,5,7));
		this.symbols.set("L",new Character(39,15,3,5, 61,0,5,7));
		this.symbols.set("M",new Character(42,15,5,5, 66,0,7,7));
		this.symbols.set("N",new Character(47,15,5,5, 73,0,7,7));
		this.symbols.set("O",new Character(52,15,4,5, 80,0,6,7));
		this.symbols.set("P",new Character(56,15,3,5, 86,0,5,7));
		this.symbols.set("Q",new Character(59,15,4,5, 91,0,6,7));
		this.symbols.set("R",new Character(63,15,4,5, 97,0,6,7));
		this.symbols.set("S",new Character(67,15,4,5, 103,0,6,7));
		this.symbols.set("T",new Character(71,15,5,5, 109,0,7,7));
		this.symbols.set("U",new Character(76,15,4,5, 116,0,6,7));
		this.symbols.set("V",new Character(80,15,5,5, 0,7,7,7));
		this.symbols.set("W",new Character(85,15,9,5, 7,7,11,7));
		this.symbols.set("X",new Character(94,15,5,5, 18,7,7,7));
		this.symbols.set("Y",new Character(99,15,5,5, 25,7,7,7));
		this.symbols.set("Z",new Character(104,15,5,5, 32,7,7,7));
		this.symbols.set("Æ",new Character(109,15,5,5, 39,7,7,7));
		this.symbols.set("Ø",new Character(114,15,5,5, 46,7,7,7));
		this.symbols.set("Å",new Character(119,15,5,5, 53,7,7,7));
		this.symbols.set("1",new Character(0,20,3,5, 60,7,5,7));
		this.symbols.set("2",new Character(3,20,4,5, 65,7,6,7));
		this.symbols.set("3",new Character(7,20,4,5, 71,7,6,7));
		this.symbols.set("4",new Character(11,20,4,5, 77,7,6,7));
		this.symbols.set("5",new Character(15,20,4,5, 83,7,6,7));
		this.symbols.set("6",new Character(19,20,4,5, 89,7,6,7));
		this.symbols.set("7",new Character(23,20,4,5, 95,7,6,7));
		this.symbols.set("8",new Character(27,20,4,5, 101,7,6,7));
		this.symbols.set("9",new Character(31,20,4,5, 107,7,6,7));
		this.symbols.set("0",new Character(35,20,4,5, 113,7,6,7));
		this.symbols.set(".",new Character(39,20,1,5, 119,7,3,7));
		this.symbols.set(",",new Character(40,20,1,5, 122,7,3,7));
	},

	getLength: function(text){
		let w = 0;
		let size = 0;
		for (let i = 0; i < text.length; i++){
			if (text.charAt(i) == " "){
				w += 4;
			}
			else if (text.charAt(i) == "<"){
				size = 1;
			}
			else if (text.charAt(i) == ">"){
				size = 0;
			}
			else{
				if (size == 0)	
					w += this.symbols.get(text.charAt(i)).w1 + 1;
				else
				w += this.symbols.get(text.charAt(i)).w2 + 1;
			}
		}

		return w;
	}
	
}

