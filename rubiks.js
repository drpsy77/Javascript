
/* Rubik's cube in a Navigator */

//import * as THREE from '../../Threejs/three.module.js';
/*
let camera, scene, renderer;
let geometry, material, mesh;

init();

function init() {

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
	camera.position.z = 1;

	scene = new THREE.Scene();

	geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	material = new THREE.MeshNormalMaterial();

	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setAnimationLoop( animation );
	document.body.appendChild( renderer.domElement );

}

function animation( time ) {

	mesh.rotation.x = time / 2000;
	mesh.rotation.y = time / 1000;

	renderer.render( scene, camera );

}

/*
;Le cube est orienté de la manière suivante :
;         3
;      2  1  4  6
;         5
*/

const color = [ "W" , "R" , "G" , "O" , "B" , "Y"  ]

const dimn = 3


class Face {
    constructor(col){
        this.col = col
        this.l = [[,,],[,,],[,,]]
        this.c = [[,,],[,,],[,,]]
        
        for(var i = 0 ; i < dimn ; i++ ){
            for( var j = 0 ; j < dimn ; j++ ){
                this.l[i][j] = col
                this.c[i][j] = col
            }
        }
        this.log("Création face "+col)
    }
        
    transpose() {
        for( var i = 0 ; i < dimn;i++ ){
            this.c[i] = this.l[i].slice()
        } 
        this.makeLines()
        this.log("Transpose")
    }
        

    makeCols(){
        for(var i = 0 ; i < dimn ; i++ ){
            for(var j = 0 ; j < dimn ; j++ ){
                this.c[i][j] = this.l[j][i]
            }
        }

    }

    makeLines() {
        for(var i = 0 ; i < dimn ; i++ ){
            for(var j = 0 ; j < dimn ; j++ ){
                this.l[i][j] = this.c[j][i]
            }
        }

    }

       
    exchangeLC ( a , b ){
            let g =  this.c[a].slice()
            this.c[a] = this.l[b]
            this.l[b] = g 
            this.log("Echange LC "+a+" "+b)
    }

    exchangeLL  ( a , b ){
        let g = this.l[a].slice()
        this.l[a] = this.l[b]
        this.l[b] = g
        this.makeCols()
        this.log("Echange LL "+a+" "+b)
    }
    exchangeCC ( a , b ){
        let g =  this.c[a].slice()
        this.c[a] =this.c[b]
        this.c[b] = g
        this.makeLines()
        this.log("Echange CC "+a+" "+b)
    }
 
    log (ev){
        console.log("Objet: "+this.col+" |evenement: "+ev)
        for(var i=0;i<dimn;i++){
            console.log("   L/"+i+" : "+this.l[i])
        }
        for(var i=0;i<dimn;i++){
            console.log("   C/"+i+" : "+this.c[i])
        }
    }


    reverseL(){
        for(var i = 0 ; i < dimn;i++){
            this.l[i].reverse()
        }
        this.makeCols()
    }
    reverseC(){
        for(var i = 0 ; i < dimn;i++){
            this.c[i].reverse()
        }
        this.makeLines()
    }
    turnRight(){
        this.transpose()
        this.reverseL()
    }
    turnLeft(){
        this.transpose()
        this.exchangeLL( 0, dimn-1)
    }
    
    turnTwice(){
        this.reverseC()
        this.reverseL()
    }
    changeColor(c){
        for(var i = 0 ; i < dimn;i++){
            for(var j = 0 ; j < dimn;j++){
                this.l[i][j] = c 
                this.c[i][j] = c
            }
        }
    }
    
}



class Cube{
    constructor(){
        this.faces = []
        for(var i=0;i<6;i++){
            this.faces[i] = new Face(color[i])
        }
        this.affiche()
    }



/*
;Le cube est orienté de la manière suivante :
;         3
;      2  1  4  6
;         5
; r et l pour tourner la première Face à droite ou à gauche
; m pour tourner le milieu
*/


    r(){
        this.faces[0].turnRight()
        this.faces[1].c[2].reverse()
        let tmp = this.faces[1].c[2].slice()
        this.faces[1].c[2] = this.faces[4].l[0]
        this.faces[1].makeLines()
        this.faces[3].c[0].reverse()
        this.faces[4].l[0] = this.faces[3].c[0]
        this.faces[0].makeCols()
        this.faces[3].c[0] =  this.faces[2].l[2]
        this.faces[3].makeLines()
        this.faces[2].l[2] = tmp         
        this.faces[2].makeCols()
        this.affiche()
    }


    l(){ 
        this.rrot() 
        this.rrot() 
        this.rrot()
        
/*        this.faces/1/turnRight
        reverse this.faces/2/c/3
        tmp:  copy this.faces/2/c/3
        this.faces/2/c/3: this.faces/5/l/1 this.faces/2/makeLines
        reverse this.faces/4/c/1
        this.faces/5/l/1: this.faces/4/c/1 this.faces/5/makeCols
        this.faces/4/c/1: this.faces/3/l/3 this.faces/4/makeLines
        this.faces/3/l/3: tmp         this.faces/3/makeCols */
    }

    m  (){}

    y (){
        let tmp =  this.faces[0]
        this.faces[0] =  this.faces[4]
        this.faces[5].turnTwice()
        this.faces[4] = this.faces[5]
        this.faces[2].turnTwice()
        this.faces[5] = this.faces[2]
        this.faces[2] = tmp
        this.faces[1].turnLeft()
        this.faces[3].turnRight()
        this.affiche()
    }


    z (){
        let tmp= this.faces[0]
        this.faces[0] = this.faces[1]
        this.faces[1] = this.faces[5]
        this.faces[5] = this.faces[3]
        this.faces[3] = tmp
        this.faces[2].turnLeft()
        this.faces[4].turnRight()
        this.affiche()
    }

    x (){
        let tmp = this.faces[1]
        document.write("rx")
        tmp.transpose()
        tmp.exchangeLL( 0, 2)
        this.faces[2].transpose()
        this.faces[2].exchangeLL( 0, 2)
        this.faces[1] = this.faces[2]
        this.faces[3].transpose()
        this.faces[3].exchangeLL( 0, 2 )
        this.faces[2] = this.faces[3]
        this.faces[4].transpose()
        this.faces[4].exchangeLL( 0, 2)
        this.faces[3] = this.faces[4]
        this.faces[4] = tmp
        this.faces[0].turnLeft()
        this.faces[5].turnRight()
        this.affiche()
    }

/**/
    affiche(){
        let out = "<font face=\"Courrier\"><textarea STYLE=\"border-style: none;\" cols=80 rows=12>"
        for(var i=0;i<dimn;i++){ 
            out = out +  "           " + this.faces[2].l[i] + "\n"
        }
        out=out+"\n"
        for(var i=0;i<dimn;i++){ 
            out = out +  "   " + this.faces[1].l[i] + "   " + this.faces[0].l[i] + "   " + this.faces[3].l[i] + "   " + this.faces[5].l[i] + "\n"
        }
        out=out+"\n"
        
        for(var i=0;i<dimn;i++){ 
            out = out +   "           "  + this.faces[4].l[i] + "\n"
        }
        out = out + "</textarea></font>"
        document.open()
        document.write("<p>"+out+"</p>")
        document.close()
        }
  
}

monCube = new Cube()
with(monCube){
r()
z()
r()
y()
r()
z()
r()
}

/*

print "Début"
#include %rubiks.red

print "Import fichier réussi"

origin: 400x160                

xax: -10x6      yax: 10x6      zax: 0x12

size: 4

col: [
    R red
    G green
    B blue
    W white
    O orange
    Y yellow
]

produit: function [a [block!] b [block!]][
    c: copy [0 0 0]
    repeat i length? a [c/:i: (a/:i * b/:i)]
    return c
]


somme: function [a [block!] b [block!]][
    c: copy [0 0 0]
    repeat i length? a [c/:i: (a/:i + b/:i)]
    return c
]

project: function [ coord [series!] ][
    ret: 0x0
    ret/x: size * ((coord/1 * xax/1) + (coord/2 * yax/1) + (coord/3 * zax/1)) + origin/x
    ret/y: size * ((coord/1 * xax/2) + (coord/2 * yax/2) + (coord/3 * zax/2)) + origin/y
    return ret
]

fact: [  [[0 0 0][0 1 0][0 1 1][0 0 1]]
         [[0 0 0][1 0 0][1 0 1][0 0 1]]
         [[0 0 0][1 0 0][1 1 0][0 1 0]]
]   

;;; cube: [ 2 1 3 6 4 5]

buf: [ line-width 3 pen gray]
drawcube: function [][
    repeat i 3 [
        repeat j 3 [
            pos:   compose [3 (i - 1) (j - 1)]
            append buf compose/deep [ shape [ 
                                        fill-pen  ( select col ( this.faces/2/l/:j/:i )) 
                                        move  ((project (somme (fact/1/1) pos ) ))
                                        line  ((project (somme (fact/1/1) pos ) ))
                                              ((project (somme (fact/1/2) pos ) ))
                                              ((project (somme (fact/1/3) pos ) ))
                                              ((project (somme (fact/1/4) pos ) ))
                                        ]]
                                        
            pos:   compose[(3 - i) 3 (j - 1)]
            
            append buf compose/deep [ shape [ 
                                        fill-pen  ( select col ( this.faces/1/l/:j/:i )) 
                                        move  ((project (somme (fact/2/1) pos ) )) 
                                        line  ((project (somme (fact/2/1) pos ) )) 
                                              ((project (somme (fact/2/2) pos ) )) 
                                              ((project (somme (fact/2/3) pos ) )) 
                                              ((project (somme (fact/2/4) pos ) )) 
                                        ]]
            
            pos:   compose [(3  - i) (j - 1) 0]
            
            append buf compose/deep [ shape [ 
                                        fill-pen  ( select col ( this.faces/3/l/:j/:i )) 
                                        move  ((project (somme (fact/3/1) pos ) ))
                                        line  ((project (somme (fact/3/1) pos ) ))
                                              ((project (somme (fact/3/2) pos ) ))
                                              ((project (somme (fact/3/3) pos ) ))
                                              ((project (somme (fact/3/4) pos ) ))
                                        ]]

            pos:   compose [(i - 1) -6 (j - 1)]
            append buf compose/deep [ shape [ 
                                        fill-pen  ( select col ( this.faces/6/l/:j/:i )) 
                                        move  ((project (somme (fact/2/1) pos ) ))
                                        line  ((project (somme (fact/2/1) pos ) ))
                                              ((project (somme (fact/2/2) pos ) ))
                                              ((project (somme (fact/2/3) pos ) ))
                                              ((project (somme (fact/2/4) pos ) ))
                                        ]]
                                        
            pos:   compose [-6 (3 - i) (j - 1)]            
            append buf compose/deep [ shape [ 
                                        fill-pen  ( select col ( this.faces/4/l/:j/:i )) 
                                        move  ((project (somme (fact/1/1) pos ) ))
                                        line  ((project (somme (fact/1/1) pos ) ))
                                              ((project (somme (fact/1/2) pos ) ))
                                              ((project (somme (fact/1/3) pos ) ))
                                              ((project (somme (fact/1/4) pos ) ))
                                        ]]
            pos:   compose [(3 - i) (3 - j) 8]
            
            append buf compose/deep [ shape [ 
                                        fill-pen  ( select col ( this.faces/5/l/:j/:i )) 
                                        move  ((project (somme (fact/3/1) pos ) ))
                                        line  ((project (somme (fact/3/1) pos ) ))
                                              ((project (somme (fact/3/2) pos ) ))
                                              ((project (somme (fact/3/3) pos ) ))
                                              ((project (somme (fact/3/4) pos ) ))
                                        ]]
        ]  
    ]
]

init-cube

drawcube

matthieu: false

view [
;    start-btn: button "Draw" [do-down]
;    return
    across
    panel [text 200x400 font[size: 13] {
Utiliser les flèches pour faire tourner le cube

[Espace] pour faire pivoter la face en bas à droite vers la droite

"#" pour réinitialiser le cube 

"m" pour appliquer les réglages matthieu ou les annuler
}
        return 
        kbd: check font[size: 13] "Top Regl. Matthieu" [ probe kbd/data either kbd/data [matthieu: true][matthieu: false] set-focus canvas]
    ]
    canvas: base 800x700 white focus
    draw buf
    on-key  [ 
            either matthieu [
            switch event/key [
                right    [z ]
                left     [z z z]
                up       [x  ]
                down     [x x x ]
                #" "     [r]
                #"#"     [init-cube]
                #"m"     [matthieu: not matthieu]
                #"u"     [y y y r  y ]
                #"i"     [ z r z z z]
                #"t"     [ r]
                #"j"     [y r y y l y z z z]
                #"O"     [ z l z z r z y y y ]
                #"R"     [l z z r z z x x x]
                #"?"     [ y l y y y]
                #"P"     [z z z l z ]
                #"E"     [ z z l z z]
                
                #"U"     [y y y l y ]
                #"I"     [ z l z z z]
                #"T"     [ l]
                #"J"     [y l y y r y z ]
                #"o"     [ z r z z l z y  ]
                #"r"     [r z z l z z x ]
                #","     [ y r y y y]
                #"p"     [z z z r z ]
                #"e"     [ z z r z z]
                
                #"q"     [ ]
                #"X"     [x]
                #"Y"     [y]
                #"Z"     [z]
                #"x"     [x x x]
                #"y"     [y y y]
                #"z"     [z z z]
            ]][
               switch event/key [
                right    [z ]
                left     [z z z]
                up       [x  ]
                down     [x x x ]
                #" "     [r]
                #"#"     [init-cube]
                #"m"     [matthieu: not matthieu]
                #"U"     [y y y r  y ]
                #"I"     [ z r z z z]
                #"T"     [ r]
                #"J"     [y r y y l y z z z]
                #"O"     [ z l z z r z y y y ]
                #"R"     [l z z r z z x x x]
                #"?"     [ y l y y y]
                #"P"     [z z z l z ]
                #"E"     [ z z l z z]
                
                #"u"     [y y y l y ]
                #"i"     [ z l z z z]
                #"t"     [ l]
                #"j"     [y l y y r y z ]
                #"o"     [ z r z z l z y  ]
                #"r"     [r z z l z z x ]
                #","     [ y r y y y]
                #"p"     [z z z r z ]
                #"e"     [ z z r z z]
                
                #"q"     [ ]
                #"X"     [x]
                #"Y"     [y]
                #"Z"     [z]
                #"x"     [x x x]
                #"y"     [y y y]
                #"z"     [z z z]
            ]
        ]
        clear buf
        append buf copy [line-width 3 pen gray] 
    ;    affiche-cube
        drawcube
    ]
]
*/