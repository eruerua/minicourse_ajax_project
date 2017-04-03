
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var street = $('#street').val();
    console.log(street);
    var city = $('#city').val();
    console.log(city);
    var address = street + city;
    var bgImagSource = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + address + ' ';
    console.log(bgImagSource);
    $body.append('<img class="bgimg" src="' + bgImagSource + '">');

    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
      'api-key': "5ada73e8ef20489a80e7d8fa27cd5750",
      'q': city
    });

    $.getJSON(url, function(data) {
        $nytHeaderElem.text('New York Times Articles About ' + city);
        var articles = data.response.docs;
        articles.forEach(function(article) {
            $nytElem.append('<li class="article">' + '<a href="' + article.web_url + '">' + article.headline.main + '</a>' + '<p>' + article.snippet + '</p>' + '</li>');
        });
    }).error(function() {
        $nytHeaderElem.text('New York Times Articles do not work');
        });

    var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + city + '&format=json&callback=wikiCallback';

    var wikiRequeatTimeout = setTimeout(function() {
        $wikiElem.text("failed to get wikipedia resources");}, 8000);
    $.ajax( {
    url: wikiUrl,
    dataType: 'jsonp',
    success: function(data) {
       // do something with data
        var wikilist = data[1];
        wikilist.forEach(function(article) {
            $wikiElem.append('<li class="article">' + '<a href="http://en.wikipedia.org/wiki/' + article + '">' + article + '</a>' + '</li>');
        });
        clearTimeout(wikiRequeatTimeout);
    }
} );
    return false;
};

$('#form-container').submit(loadData);
