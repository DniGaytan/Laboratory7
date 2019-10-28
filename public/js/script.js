var url = "/blog-posts"

$(document).ready(function(){
  var settings = {
    url : url,
    method : 'GET',
    contentType : "application/json",
    success : function(response){
      console.log(response);
      updateBlogs(response);
      for(var i = 0 ; i < response.length; i++){
        var newDiv = document.createElement("div");
        var titleH4 = document.createElement("h4");
        var contentP = document.createElement("p");
        var authorP = document.createElement("p");
        $(titleH4).text(response[i].title);
        $(contentP).text(response[i].content);
        $(authorP).text(response[i].author);
        $(newDiv).append(titleH4, contentP, authorP);
        $(newDiv).addClass("blog-entry justify-content-center");
        $("#blogs-wrap").append(newDiv);
      }
    },
    error : function(errorResponse){
      console.log(errorResponse.json.statusMessage);
    }
  };

  $.ajax(settings);

})

$("#button-post").on("click", function(event){
  event.preventDefault();
    var newPost = {
      title : $("#blog-title").val(),
      content : $("#blog-content").val(),
      author : $("#blos-author").val(),
    }

    console.log($("#blog-title").val());

    settings = {
      url : url,
      method : 'POST',
      data : JSON.stringify(newPost),
      datatype : 'JSON',
      contentType : "application/json",
      success : function(response){
        var blogs = [];
        blogs.push(response);
        updateBlogs(blogs);
        var newDiv = document.createElement("div");
        var titleH4 = document.createElement("h4");
        var contentP = document.createElement("p");
        var authorP = document.createElement("p");
        $(titleH4).text(response.title);
        $(contentP).text(response.content);
        $(authorP).text(response.author);
        $(newDiv).append(titleH4, contentP, authorP);
        $(newDiv).addClass("blog-entry justify-content-center");
        $("#blogs-wrap").append(newDiv);
      },
      error : function(errorResponse){
        console.log(errorResponse.json.statusMessage);
      }
    }

    $.ajax(settings);
});

$("#button-delete").on("click", function(event){
  var options = $("#delete-select").children();
  console.log(options);

  for(var i = 0 ; i < options.length; i++){
    if(options[i].selected){
      console.log(options[i].className);
      settings = {
        url : url + "/" +options[i].className,
        method : 'DELETE',
        contentType : "application/json",
        success : function(response){
          updateBlogs(response);
          updateMain(response);
        },
        error : function(errorResponse){
          console.log(errorResponse.json.statusMessage);
        }
      }

      $.ajax(settings);
    }
  }
});

function updateBlogs(blogs){
  console.log(blogs[0].title);
  for(var i = 0; i < blogs.length; i++){
    var opt = document.createElement("option");
    $(opt).text(blogs[i].title);
    $(opt).addClass(blogs[i].id);
    $("#delete-select").append(opt);

  }

  for(var i = 0; i < blogs.length; i++){
    var opt = document.createElement("option");
    $(opt).text(blogs[i].title);
    $(opt).addClass(blogs[i].id);
    $("#update-select").append(opt);
  }

};

function updateMain(blogs){
  $("#blogs-wrap").empty();

  for(var i = 0 ; i < blogs.length; i++){
    var newDiv = document.createElement("div");
    var titleH4 = document.createElement("h4");
    var contentP = document.createElement("p");
    var authorP = document.createElement("p");
    $(titleH4).text(blogs[i].title);
    $(contentP).text(blogs[i].content);
    $(authorP).text(blogs[i].author);
    $(newDiv).append(titleH4, contentP, authorP);
    $(newDiv).addClass("blog-entry justify-content-center");
    $("#blogs-wrap").append(newDiv);
  }
}
