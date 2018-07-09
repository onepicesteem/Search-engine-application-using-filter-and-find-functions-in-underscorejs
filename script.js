$(function(){

    var filter;
    var find;

    $.get("https://jsonplaceholder.typicode.com/posts", function(datas, status){

        //console.log(datas);  //I will print data to console 
    

        $('#btnSearch').click(function(){
            var searchWord=$('#inputSearch').val().toLowerCase();//We lower case the input value and assigned it to the searchWord variable.

           // console.log(searchWord);//I will searchWord data to console
            filter= _.filter(datas,function(data){

                return data.title.includes(searchWord);//we searched within the title
            })
            //console.log(filter);//I will print filter to console
        });

        $('#btnLucky').click(function(){

            var searchWord=$('#inputSearch').val().toLowerCase();//We lower case the input value and assigned it to the searchWord variable.

            console.log(searchWord);//I will searchWord data to console
            find=_.find(datas,function(data){
                return data.title.includes(searchWord);
            })
            console.log(find);//I will print filter to console
        });



        var app = $.sammy(function () {

            this.element_selector = '#content';//area to show pages

            this.get('#/search', function (context) {//routing to search.html page
                
                context.$element().load('search.html',function(){
                    for (let index = 0; index < filter.length; index++) {//because there is more than one data
                        
                        $('ul').append('<div class="panel panel-info"><div class="panel-heading">'+filter[index].title+
                    '</div><div class="panel-body">'+filter[index].body+'</div></div>');
                        
                    }
                });
            });

            this.get('#/lucky', function (context) {//routing to lucky.html page
                context.$element().load('search.html',function(){
                    $('ul').append('<div class="panel panel-info"><div class="panel-heading">'+find.title+
                    '</div><div class="panel-body">'+find.body+'</div></div>');
                    })
            });
    
    
        })
        
        app.run('#/');
    
    });

    

});