song1 = "";
song2 = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;
song1_status = "";
song2_status = "";
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
function preload() {
    song1 = loadSound("music2.mp3");
    song2 = loadSound("music1.mp3");
}
function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
    if(scoreRightWrist>0.2) {
        circle(rightWristX,rightWristY,20);
        song1.stop();
        if(song2_status==false) {
            song2.play();
            document.getElementById("song").innerHTML = "Playing - Harry Potter Theme Song";
        }
    }
    if(scoreLeftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        song2.stop();
        if(song1_status==false){
            song1.play();
            document.getElementById("song").innerHTML = "Playing - Peter Pan Song";
        }
    }
}
function modelLoaded(){
    console.log('PoseNet is initialized');
}
 function gotPoses(results){
if(results.length>0){
    console.log(results);
    scoreRightWrist = results[0].pose.keypoints[10].score;
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
}
 }
function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}