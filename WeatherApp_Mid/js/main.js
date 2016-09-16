(function ($) {
    'use strict';




    // Event listener for retrieving a weather forecast
    $('.frm.weather').on('submit', function (e) {
        var location = $(e.target).find('[name=location]').val(),
            query = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + location + '") and u="c"&format=json&env=store/datatables.org/alltableswithkeys';

            if (location.length === 0) {
              console.log('error');
             
              // append the p to the form elementand styles to teh red color
              $('.frm.weather').append('<p class="error">Error</p>').css('color','red');

              if($('.frm.weather').find('p.error').size() > 1 == true){
                  $('.frm.weather').find('p.error').remove();
                  $('.frm.weather').append('<p class="error">Error</p>').css('color','red');
                }

            }else{
                if($('.frm.weather').find('p.error').size() <= 1){
                  $('.frm.weather').css('color', 'black').find('p.error').remove();
                }
              
                $.getJSON('https://query.yahooapis.com/v1/public/yql?q=' + query, function (data) {
                    // Refine the data
                    data = data.query.results.channel;
                    console.log(data);

                    // Display the weather data... best to use a function
                    (function($){
                      $('.location').text(data.location.city +', '+ data.location.region +', '+ data.location.country +'.');
                      $('.date').text(data.lastBuildDate),
                      $('.sunrise').text(data.astronomy.sunrise),
                      $('.sunset').text(data.astronomy.sunset),
                      $('.temp').text(data.item.condition.temp).append('&deg;C');
                      $('.conditions').text(data.item.condition.text);
                      var something = data.item.forecast;

                      
                      $('.forecast').html('<h2>Forecast</h2>');
                      var foreLength = something.length;
                      for(var i = 0;  i < foreLength; i++){
                        $('.forecast').append('<p class="foreday"><b>Day: '+ something[i].day + '</b></p><p class="foredate">Date: '+ something[i].date +'</p><p class="forecond">Condition: '+ something[i].text + '</p><br>');
                        
                     }
                      

                     


                  }(jQuery));




                  

                });
      

        $('.frm.weather').find('[name=location]').val("");

}

        e.preventDefault();
    });
}(jQuery));
