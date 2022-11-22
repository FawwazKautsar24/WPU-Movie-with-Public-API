// 200c01ba
$('#search-button').on('click', function(){
    $('#movie-list').html('');

    $.ajax({
        url: 'http://omdbapi.com',
        tyoe: 'get',
        dataType: 'json',
        data: {
            'apikey': '200c01ba',
            's': $('#search-input').val()
        },
        success: function(result){
            if(result.Response === 'True'){
                let movies = result.Search;
                
                $.each(movies, function(i, movie){
                    $('#movie-list').append(`
                        <div class="col-md-4">
                            <div class="card" style="width: 18rem;">
                                <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
                                <div class="card-body">
                                <h5 class="card-title">${movie.Title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
                                <a href="#" class="card-link">See Detail</a>
                                </div>
                            </div>
                        </div>
                    `);

                    $('search-input').html('');
                });
            }else{
                $('#movie-list').html(`
                    <div class='col'>
                        <h1 class='text-center'>${result.Error}</h1>
                    </div>
                `);
            }
        }
    });
});