
color = ["A","B","C"]

class FaceO {
    constructor(col){
        this.col = col
        this.l   = color[col]
    }
    display(){
        console.log(this.l)
    }
    
}
    
a = new FaceO(2)

a.display()
