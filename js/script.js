function searchMovies(){
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
                            <div class="card mb-4" style="width: 18rem;">
                                <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
                                <div class="card-body">
                                    <h5 class="card-title">${movie.Title}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
                                    <!-- Button trigger modal -->
                                    <a 
                                        href="#" 
                                        class="card-link see-detail" 
                                        data-toggle="modal" 
                                        data-target="#exampleModal"
                                        data-id="${movie.imdbID}"
                                    >See Detail</a>
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
}

$('#search-button').on('click', function(){
    searchMovies();
});

$('#search-input').on('keyup',function(e) {
    // e.which === e.keyCode
    if(e.which === 13) {
        searchMovies();
    }
});

// mengatasi event binding / delegation / bubbling
$('#movie-list').on('click', '.see-detail', function(){
    //mengoper data/ID sesuai .see-detail
    // console.log($(this).data('id'));

    $.ajax({
        url: 'http://omdbapi.com',
        tyoe: 'get',
        dataType: 'json',
        data: {
            'apikey': '200c01ba',
            'i': $(this).data('id')
        },
        success: function(movieDetail){
            if(movieDetail.Response === 'True'){
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="${movieDetail.Poster}" class="img-fluid" alt="${movieDetail.Title}">
                            </div>
                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>${movieDetail.Title}</h3></li>
                                    <li class="list-group-item"><b>Released:</b> ${movieDetail.Released}</li>
                                    <li class="list-group-item"><b>Genre:</b> ${movieDetail.Genre}</li>
                                    <li class="list-group-item"><b>Director:</b> ${movieDetail.Director}</li>
                                    <li class="list-group-item"><b>Actors:</b> ${movieDetail.Actors}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `);
            }else{
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-12 text-center">
                                <h4>Data Movie Detail is Not Found!</h4>
                            </div>
                        </div>
                    </div>
                `);
            }
        }
    });
});
