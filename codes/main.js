import data from './data/data.json' assert {type: 'json'};

var number = 0;
showinfo(number);

function next(){
    if(number < data.java.length ){
        showinfo(++number);
    }    
}

function previous(){
    if(number > 0 ){
        showinfo(--number);
    }
}

function meetingNumberChanged(){
    var inputNumber = document.getElementById("meeting_number").value;
    if(inputNumber > 0 && inputNumber <= data.java.length){
        number = inputNumber - 1;
        showinfo(number);
    }
}

function showinfo(number){

    document.getElementById("meeting_number").value  = data.java[number].name;
    document.getElementById("center").innerHTML =  getAparatVideo(number);
    document.getElementById("name_text").innerHTML = "جلسه " + data.java[number].name + " : " + data.java[number].title; 

    if(data.java[number].amendment != "no"){
        document.getElementById("name_text").innerHTML = document.getElementById("name_text").innerHTML + " (" + data.java[number].amendment + ")";
    }
}

function getAparatVideo(number){

    var iFrameTag = "<iframe id = \"iframe\" src=\"#@#\" title=\"video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>"
    var aparatEmbedLink  = "https://www.aparat.com/video/video/embed/videohash/#@#/vt/frame";

    aparatEmbedLink = aparatEmbedLink.replace("#@#", data.java[number].aparat);
    iFrameTag = iFrameTag.replace("#@#", aparatEmbedLink);

    return iFrameTag;
}


function getYoutubeVideo(number){

    var iFrameTag = "<iframe id = \"iframe\" src=\"#@#\" title=\"video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>"
    var youtubeEmbedLink = "https://www.youtube.com/embed/#@#";

    youtubeEmbedLink = youtubeEmbedLink.replace("#@#", data.java[number].youtube);
    iFrameTag = iFrameTag.replace("#@#", youtubeEmbedLink);

    return iFrameTag;
}

document.getElementById("next").addEventListener("click", next);
document.getElementById("previous").addEventListener("click", previous);
document.getElementById("meeting_number").addEventListener("change", meetingNumberChanged)