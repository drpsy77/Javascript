
/* Rubik's cube in a Navigator */

/*
;Le cube est orienté de la manière suivante :
;         2
;      1  0  3  5
;         4
*/

const couleur = [ "W" , "R" , "G" , "O" , "B" , "Y"  ]

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

    reverseL(i){
        this.l[i].reverse()
        this.makeCols()
    }
    reverseC(i){
        this.c[i].reverse()
        this.makeLines()
    }
    turnRight(){
        this.transpose()
        for(var i = 0 ; i < dimn;i++){
            this.reverseL(i)
        }
    }
    turnLeft(){
        this.transpose()
        this.exchangeLL( 0, dimn-1)
    }
    
    turnTwice(){
        var i=0
        var tmp = this.l[0][0]
        this.l[0][0] = this.l[2][2]
        this.l[2][2] = tmp
        i=2
        tmp = this.l[0][2]
        this.l[0][2] = this.l[2][0]
        this.l[2][0] = tmp
        tmp = this.l[1][0]
        this.l[1][0] = this.l[1][2]
        this.l[1][2] = tmp
        tmp = this.l[0][1]
        this.l[0][1] = this.l[2][1]
        this.l[2][1] = tmp
        this.makeCols()
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
            this.faces[i] = new Face(couleur[i])
        }
        this.affiche()
    }

    reinit(){
        for(var i=0;i<6;i++){
            this.faces[i] = new Face(couleur[i])
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
        this.faces[1].reverseC(2)
        let tmp = this.faces[1].c[2].slice()
        this.faces[1].c[2] = this.faces[4].l[0]
        this.faces[1].makeLines()
        this.faces[3].reverseC(0)
        this.faces[4].l[0] = this.faces[3].c[0]
        this.faces[0].makeCols()
        this.faces[3].c[0] =  this.faces[2].l[2]
        this.faces[3].makeLines()
        this.faces[2].l[2] = tmp         
        this.faces[2].makeCols()
        this.affiche()
    }

    l(){ 
        this.r() 
        this.r() 
        this.r()
        
/*        this.faces/1/turnRight
        reverse this.faces/2/c/3
        tmp:  copy this.faces/2/c/3
        this.faces/2/c/3: this.faces/5/l/1 this.faces/2/makeLines
        reverse this.faces/4/c/1
        this.faces/5/l/1: this.faces/4/c/1 this.faces/5/makeCols
        this.faces/4/c/1: this.faces/3/l/3 this.faces/4/makeLines
        this.faces/3/l/3: tmp         this.faces/3/makeCols */
    }

    m (){}

    y (){
        this.faces[2].log("DEBUT DE y()")
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
        let out = "" //"<font face=\"Courrier\"><textarea STYLE=\"border-style: none;\" cols=80 rows=12>"
        
        out = out +  "           " + this.faces[2].l[0] + "\n"
        out = out +  "        2  " + this.faces[2].l[1] + "\n"
        out = out +  "           " + this.faces[2].l[2] + "\n"
        out=out+"     1       0       3       5\n"
        for(var i=0;i<dimn;i++){ 
            out = out +  "   " + this.faces[1].l[i] + "   " + this.faces[0].l[i] + "   " + this.faces[3].l[i] + "   " + this.faces[5].l[i] + "\n"
        }
        out=out+"\n"
        
        out = out +   "           "  + this.faces[4].l[0] + "\n"
        out = out +   "        4  "  + this.faces[4].l[1] + "\n"
        out = out +   "           "  + this.faces[4].l[2] + "\n"
//        out = out + "</textarea></font>"
        console.log(out)
        /*document.open()
        document.write("<p>"+out+"</p>")
        document.close()
        */ 
    }
  
}

monCube = new Cube()

/*
with(monCube){
    r()
    z()
    r()
    y()
    r()
    z()
    r()
}
*/

/***-------------------------***
 *     Partie Graphique        *
 ***-------------------------***/

const fact= [  [[0, 0, 0],[0, 1, 0],[0, 1, 1],[0, 0, 1]],
               [[0, 0, 0],[1, 0, 0],[1, 0, 1],[0, 0, 1]],
               [[0, 0, 0],[1, 0, 0],[1, 1, 0],[0, 1, 0]]
]   

// cube: [ 2 1 3 6 4 5]

/*-----------------------------*
 *        COULEURS             *
 *-----------------------------*/

const red    = 0xff0000
const green  = 0x00ff00
const blue   = 0x0000ff
const yellow = 0xffff00
const cyan   = 0x00ffff
const purple = 0xff00ff
const black  = 0x000000
const white  = 0xffffff
const orange = 0xffaa00

const couleurTab = { 
    "R" : new Color( red ).getStyle(),
    "W" : new Color( white ).getStyle(), 
    "B" : new Color( blue ).getStyle(),
    "Y" : new Color( yellow ).getStyle(),
    "G" : new Color( green ).getStyle(), 
    "O" : new Color( orange ).getStyle(),
    "N" : new Color( black ).getStyle()
}


let camera, scene, renderer;

let scene2, renderer2;

let material;

let controls;

let drawnCube = [[[,,],[,,],[,,]],[[,,],[,,],[,,]],[[,,],[,,],[,,]],[[,,],[,,],[,,]],[[,,],[,,],[,,]],[[,,],[,,],[,,]]]


matthieu = false

init();
drawcube();
activate3D();
animate();

function init() {

    camera = new PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 1000, 1000, 1000 );

    scene = new Scene();
    scene.background = new Color( 0xf0f0f0 );

    scene2 = new Scene();

    const material = new MeshBasicMaterial( { color: 0x000000, wireframe: true, wireframeLinewidth: 1, side: DoubleSide } );
}
    //

function drawFacette(couleur, pos, ang, texte){
//    console.log("Dessin de: " + couleur + " à "+ pos + " avec un angle de " + ang )
    const element = document.createElement( 'div' );
    element.style.width = '99px';
    element.style.height = '99px';
    element.style.opacity = 1;
    element.style.background = couleur;
    element.style.border = couleurTab["N"];
    
    const symbol = document.createElement( 'div' );
    symbol.className = 'Text';
    symbol.textContent = texte;
    element.appendChild( symbol );

    const object = new CSS3DObject( element );
    object.position.x = ( pos[0] - 1 ) * 100 ;
    object.position.y = ( pos[1] - 1 ) * 100 ;
    object.position.z = ( pos[2] - 1 ) * 100 ;
    object.rotation.x = ang[0];
    object.rotation.y = ang[1];
    object.rotation.z = ang[2];
    object.scale.x = 1;
    object.scale.y = 1;
    scene2.add( object );

    const geometry = new PlaneGeometry( 100, 100 );
    const mesh = new Mesh( geometry, material );
    mesh.position.copy( object.position );
    mesh.rotation.copy( object.rotation );
    mesh.scale.copy( object.scale );
    scene.add( mesh );
    return (scene2.children.length - 1);
}


             
console.log(drawnCube)

function drawcube(){
    ang90 = Math.PI / 2;
    console.log( "PI/2 = " + ang90 )
    let numFace
    for(var i = 0 ; i < dimn;i++){
        for(var j = 0 ; j < dimn;j++){

        //Face R
            numFace = 1
            pos = [2.5, j, (2-i)]
            ang = [0, ang90, ang90 ]
            drawnCube[numFace][i][j]=drawFacette(couleurTab [ monCube.faces[numFace].l[i][j] ], pos, ang, numFace + ":" + i + "." + j  )
        
        //Face W
            numFace = 0
            pos = [(2-j), 2.5, (2-i) ]
            ang = [-ang90, 0 , 2*ang90]
            drawnCube[numFace][i][j]=drawFacette(couleurTab [ monCube.faces[numFace].l[i][j] ], pos, ang, numFace + ":" + i + "." + j )

        //Face G
            numFace = 2
            pos = [(2-j), i, 2.5]
            ang = [ 0, 0, 2*ang90 ]
            drawnCube[numFace][i][j]=drawFacette(couleurTab [ monCube.faces[numFace].l[i][j] ], pos, ang, numFace + ":" + i + "." + j )

        //Face Y
            numFace = 5
            pos = [j , -0.5, (2-i) ]
            ang = [ang90, 0, 0]
            drawnCube[numFace][i][j]=drawFacette(couleurTab [ monCube.faces[numFace].l[i][j] ], pos, ang, numFace + ":" + i + "." + j )

        //Face O
            numFace = 3
            pos = [-0.5, (2-j), (2-i) ]
            ang = [0, -ang90, -ang90 ]
            drawnCube[numFace][i][j]=drawFacette(couleurTab [ monCube.faces[numFace].l[i][j] ], pos, ang, numFace + ":" + i + "." + j )

        //Face B
            numFace = 4
            pos = [(2-j), (2 - i), -0.5]
            ang = [0, 2*ang90, 0 ]
            drawnCube[numFace][i][j]=drawFacette(couleurTab [ monCube.faces[numFace].l[i][j] ], pos, ang, numFace + ":" + i + "." + j )
       
        }
    }
    //
    
}

function activate3D(){
    renderer = new WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    renderer2 = new CSS3DRenderer();
    renderer2.setSize( window.innerWidth, window.innerHeight );
    renderer2.domElement.style.position = 'absolute';
    renderer2.domElement.style.top = 0;
    document.body.appendChild( renderer2.domElement );

    controls = new TrackballControls( camera, renderer2.domElement );

    window.addEventListener( 'resize', onWindowResize );
	window.addEventListener( 'keyup' , onKeyUp );
}


function updateCube(){
    out = ""
    for(var numFace=0;numFace<6;numFace++){
        for(var i = 0 ; i < dimn;i++){
            for(var j = 0 ; j < dimn;j++){
                
                scene2.children[drawnCube[numFace][i][j]].element.style.background = couleurTab [ monCube.faces[numFace].l[i][j] ]
            }                
        }
    }
    console.log(out)
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer2.setSize( window.innerWidth, window.innerHeight );
}

function onKeyUp ( event ) {
    console.log("Evénement Clavier : " + event.key )
    //event.preventDefault();
    if(matthieu){
		switch ( event.key ) {

            case " ":  monCube.r(); break;
            case "#":  monCube.reinit(); break;
            case "M": case "m":  {matthieu = ! matthieu;}; break;
            case "u":  with(monCube) {y(); y(); y(); r(); y(); } break;
            case "i":  with(monCube) {z(); r(); z(); z(); z(); } break;
            case "t":  monCube.r() ; break;
            case "j":  with(monCube) {y(); r(); y(); y(); l(); y(); z(); z(); z();} break;
            case "O":  with(monCube) {z(); l(); z(); z(); r(); z(); y(); y(); y();} break;
            case "R":  with(monCube) {l(); z(); z(); r(); z(); z(); x(); x(); x();} break;
            case "?":  with(monCube) {y(); l(); y(); y(); y();} break;
            case "P":  with(monCube) {z(); z(); z(); l(); z();} break;
            case "E":  with(monCube) {z(); z(); l(); z(); z();} break;

            case "U":  with(monCube) {y(); y(); y(); l(); y();} break;
            case "I":  with(monCube) {z(); l(); z(); z(); z();} break;
            case "T":  monCube.l();                             break;
            case "J":  with(monCube) {y(); l(); y(); y(); r(); y(); z();} break;
            case "o":  with(monCube) {z(); r(); z(); z(); l(); z(); y();} break;
            case "r":  with(monCube) {r(); z(); z(); l(); z(); z(); x();} break;
            case "M":  with(monCube) {y(); r(); y(); y(); y();}  break;
            case "p":  with(monCube) {z(); z(); z(); r(); z();}  break;
            case "e":  with(monCube) {z(); z(); r(); z(); z();}  break;

            case "q":         break;          
            case "X":  monCube.x(); break;
            case "Y":  monCube.y(); break;
            case "Z":  monCube.z(); break;
            case "x":  with(monCube) {x(); x(); x ();} break;
            case "y":  with(monCube) {y(); y(); y(); } break;
            case "z":  with(monCube) {z(); z(); z(); } break;
        }
    } else 
    {
        switch (event.key) {
            case " ":  monCube.r(); break;
            case "#":  monCube.reinit(); break;
            case "m":  {matthieu = ! matthieu;}; break;
            case "U":  with(monCube) {y(); y(); y(); r(); y(); } break;
            case "I":  with(monCube) {z(); r(); z(); z(); z(); } break;
            case "T":  monCube.r() ;   break;
            case "J":  with(monCube) {y(); r(); y(); y(); l(); y(); z(); z(); z();} break;
            case "O":  with(monCube) {z(); l(); z(); z(); r(); z(); y(); y(); y();} break;
            case "R":  with(monCube) {l(); z(); z(); r(); z(); z(); x(); x(); x();} break;
            case "?":  with(monCube) {y(); l(); y(); y(); y();} break;
            case "P":  with(monCube) {z(); z(); z(); l(); z();} break;
            case "E":  with(monCube) {z(); z(); l(); z(); z();} break;

            case "u":  with(monCube) {y(); y(); y(); l(); y();} break;
            case "i":  with(monCube) {z(); l(); z(); z(); z();} break;
            case "t":  monCube.l();    break;
            case "j":  with(monCube) {y(); l(); y(); y(); r(); y(); z();} break;
            case "o":  with(monCube) {z(); r(); z(); z(); l(); z(); y();} break;
            case "r":  with(monCube) {r(); z(); z(); l(); z(); z(); x();} break;
            case ",":  with(monCube) {y(); r(); y(); y(); y();} break;
            case "p":  with(monCube) {z(); z(); z(); r(); z();} break;
            case "e":  with(monCube) {z(); z(); r(); z(); z();} break;

            case "q":  break;            
            case "X":  monCube.x(); break;
            case "Y":  monCube.y(); break;
            case "Z":  monCube.z(); break;
            case "x":  with(monCube) {x(); x(); x ();}  break;
            case "y":  with(monCube) {y(); y(); y(); }  break;
            case "z":  with(monCube) {z(); z(); z(); }  break;
		}                                                      
    }        
    updateCube()
  //  animate()
}                                                              
        

function animate() {

    requestAnimationFrame( animate );

    controls.update();

    renderer.render( scene, camera );
    renderer2.render( scene2, camera );

}






/*
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