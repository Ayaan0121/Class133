objects=[];
img="";
status="";
random_r= 0;
random_g= 0;
random_b= 0;

function preload() {
    img=loadImage('dog_cat.jpg');
}

function setup() {
    canvas=createCanvas(640,420);
    canvas.center();
//cordinates for canvas use this 'canvas.position(x,y);'
    objectDetector=ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML="Status: Dectecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded!");
    //change status
    status=true;
    objectDetector.detect(img,gotResults);
}

function gotResults(error , results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects=results;
    }
}


function draw() {

  //placing  image in canvas
    image(img,0 , 0 , 640 , 420);
  if (status != "") {
      for ( i = 0; i < objects.length; i++) {
         document.getElementById("status").innerHTML="Status: Objects Detected";      
         random_r= Math.floor(Math.random()* 255 ) + 1;
         random_g= Math.floor(Math.random()* 255 ) + 1;
         random_b= Math.floor(Math.random()* 255 ) + 1;
         fill(random_r, random_g, random_b );
         pc=Math.floor(objects[i].confidence * 100);
         text(objects[i].label + " " + pc + "%" , objects[i].x + 5 ,objects[i].y + 13);
         noFill();
         stroke(random_r, random_g, random_b);
         rect(objects[i].x , objects[i].y ,objects[i].width ,objects[i].height);

      }
  }
    
}

  