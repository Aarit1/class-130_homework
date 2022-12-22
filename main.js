song_1 = "";
song_2 = "";
song_1_status = ""; 
song_2_status = ""; 

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload() {
    song_1 = loadSound("star_walkin'.mp3");
    song_2 = loadSound("first_class.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet is initialized');
}
function draw() {
    image(video, 0, 0, 600, 500);

    stroke("#FF0000");
    fill("#FF0000");
    song_1_status=song_1.isPlaying();
    if(scoreLeftWrist>0.2) {
        circle(leftWristX, leftWristY, 20);
        song_2.stop();
    }
    if(song_1_status="false") {
        song_1.play();
        document.getElementById("song_name").innerHTML = "Star Walkin";
    }
    song_2_status= song_2.isPlaying();
    if(scoreRightWrist>0.2) {
        circle(rightWristX, rightWristY, 20);
        song_1.stop();
    }
    if(song_2_status="false") {
        song_2.play();
        document.getElementById("song_name").innerHTML = "First Class";
    }
}
    
function gotPoses(results) {
    if(results.length > 0)
    {
        console.log(results);
        
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
	    scoreLeftWrist =  results[0].pose.keypoints[9].score;
	    console.log("scoreRightWrist = " + scoreRightWrist + " and scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " and leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("rightWristX = " + rightWristX + " and rightWristY = " + rightWristY);
    }

}