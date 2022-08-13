import data from './data/data.json' assert {type: 'json'};


var params = window.location.pathname.split('/').slice(1);
var inputCourse = params[0]; // change to 2 for local
var inputId = params[1]; // change to 3 for local

var number;
var course;


if(typeof inputCourse === 'undefined' || inputCourse === ''){
    course = "java";
} 
else{
     course = inputCourse;
}
document.getElementById("course_selector").value = course;

if(typeof inputId === 'undefined' || inputId === '')number = 0;
else {
    if(course == "java"){
        const index = data.java.findIndex(object => {
            return object.id === inputId;
        });
        number = (data.java[index].name)-1;
    }else if(course == "api"){
        const index = data.api.findIndex(object => {
            return object.id === inputId;
        });
        number = (data.api[index].name)-1;
    }else if(course == "android"){
        const index = data.android.findIndex(object => {
            return object.id === inputId;
        });
        number = (data.android[index].name)-1;
    }
}

showinfo(number);

function next(){
    var length; 
    if(course == "java") length = data.java.length;
    else if(course == "api")  length = data.api.length;
    else if(course == "android") length = data.android.length;

    if(number < length ){
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

    var length; 
    if(course == "java") length = data.java.length;
    else if(course == "api")  length = data.api.length;
    else if(course == "android") length = data.android.length;

    if(inputNumber > 0 && inputNumber <= length){
        number = inputNumber - 1;
        showinfo(number);
    }
}

function courseSelectorChanged(){
    course = document.getElementById("course_selector").value;
    number = 0;
    showinfo(number)
}

function showinfo(number){

    if(course == "java"){
        var id = data.java[number].id;
        var name = data.java[number].name;
        var video = getAparatVideo(number);
        var title = "جلسه " + data.java[number].name + " : " + data.java[number].title;
        if (data.java[number].amendment != "no") title = title + " (" + data.java[number].amendment + ")"
    }else if(course == "api"){
        var id = data.api[number].id;
        var name = data.api[number].name;
        var video = getAparatVideo(number);
        var title = "جلسه " + data.api[number].name + " : " + data.api[number].title;
        if (data.api[number].amendment != "no") title = title + " (" + data.api[number].amendment + ")"
    }else if(course == "android"){
        var id = data.android[number].id;
        var name = data.android[number].name;
        var video = getAparatVideo(number);
        var title = "جلسه " + data.android[number].name + " : " + data.android[number].title;
        if (data.android[number].amendment != "no") title = title + " (" + data.android[number].amendment + ")"
    }
    document.getElementById("meeting_number").value  = name;
    document.getElementById("center").innerHTML =  video;
    document.getElementById("name_text").innerHTML = title; 

    window.history.replaceState('', '', 'http://localhost/sadeqam/sadeqam/' + course + "/" + id);
}

function getAparatVideo(number){

    var iFrameTag = "<iframe id = \"iframe\" src=\"#@#\" title=\"video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>"
    var aparatEmbedLink  = "https://www.aparat.com/video/video/embed/videohash/#@#/vt/frame";

    if(course == "java") aparatEmbedLink = aparatEmbedLink.replace("#@#", data.java[number].aparat);
    else if(course == "api") aparatEmbedLink = aparatEmbedLink.replace("#@#", data.api[number].aparat);
    else if(course == "android") aparatEmbedLink = aparatEmbedLink.replace("#@#", data.android[number].aparat);

    iFrameTag = iFrameTag.replace("#@#", aparatEmbedLink);

    return iFrameTag;
}


function getYoutubeVideo(number){

    var iFrameTag = "<iframe id = \"iframe\" src=\"#@#\" title=\"video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>"
    var youtubeEmbedLink = "https://www.youtube.com/embed/#@#";

    if(course == "java") youtubeEmbedLink = youtubeEmbedLink.replace("#@#",data.java[number].youtube);
    else if(course == "api") youtubeEmbedLink = youtubeEmbedLink.replace("#@#",data.api[number].youtube);
    else if(course == "android") youtubeEmbedLink = youtubeEmbedLink.replace("#@#",data.android[number].youtube);

    iFrameTag = iFrameTag.replace("#@#", youtubeEmbedLink);

    return iFrameTag;
}

document.getElementById("next").addEventListener("click", next);
document.getElementById("previous").addEventListener("click", previous);
document.getElementById("meeting_number").addEventListener("change", meetingNumberChanged);
document.getElementById("course_selector").addEventListener("change", courseSelectorChanged);