 $(document).ready(function() {
      
      // get the form(s) and add event listener on "submit"
      $('form').on('submit', handleSubmit);

      function handleSubmit(event) {
        // dont leave the page!
        event.preventDefault();

        var formData = {
          q: $('#q').val(),      // document.getElementById('q').value
          appid: '1f996c17d4604cd5aad6a11c0f25a46f',
          mode: 'json',
          units: 'metric'
        };


        $.ajax({
          url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
          method: 'get',
          data: formData
        })
          .done(gotData)
          .fail(handleError)
          .always(returnArticle)
      }

      function gotData(data) {
        console.log(data.response.docs);
      }

      function handleError(err) {
        console.log('error', err);
      }

      function returnArticle(data){
      	var myArticlesDiv = document.createElement("DIV");

      	for (i = 0; i < data.response.docs.length; i++){
      		var articleTitle = document.createTextNode(
      		'Article Title: ' + data.response.docs[i].headline.main);
      		var author = document.createTextNode( "Author: " + data.response.docs[i].byline.original);
      		var snippet = document.createTextNode("Snippet: '" + data.response.docs[i].snippet);
      		var articleURL = document.createTextNode("URL:" + data.response.docs[i].web_url)
      	  	myArticlesDiv.appendChild(articleTitle);
      	  	myArticlesDiv.appendChild(document.createElement("BR"));
      	  	myArticlesDiv.appendChild(author);
      	  	myArticlesDiv.appendChild(document.createElement("BR"));
      	  	myArticlesDiv.appendChild(snippet);
      	  	myArticlesDiv.appendChild(document.createElement("BR"));
      	  	myArticlesDiv.appendChild(articleURL);
      	  	myArticlesDiv.appendChild(document.createElement("BR"));
      	  	myArticlesDiv.appendChild(document.createElement("BR"));
     	 }
      	
      	document.body.appendChild(myArticlesDiv);
      }


    });
