$( document ).ready(function() {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
    
    $('.date-picker').each(function(){
        $(this).datepicker();
    });

    $('.modal').on('shown.bs.modal', function () {
        $('.modal').animate({ scrollTop: 0 }, 'slow');
    });

    $(document).ready(function(){
        // Add minus icon for collapse element which is open by default
        $(".collapse.show").each(function(){
        	$(this).prev(".card-header").find(".fa").addClass("fa-angle-up").removeClass("fa-angle-down");
        });
        
        // Toggle plus minus icon on show hide of collapse element
        $(".collapse").on('show.bs.collapse', function(){
        	$(this).prev(".card-header").find(".fa").removeClass("fa-angle-down").addClass("fa-angle-up");
        }).on('hide.bs.collapse', function(){
        	$(this).prev(".card-header").find(".fa").removeClass("fa-angle-up").addClass("fa-angle-down");
        });
    });
});

accountRegister = function(){
    function createUser(){
        var form = $('#registerStep2Form');
        $.ajax({
            type: form.attr('method'),
            url: form.attr('action'),
            data: form.serialize(),
            statusCode: {
                400: function(){alert('400 error');}
            },
            success: function(response){
                console.log(response);
                const res = JSON.parse(response);
                if ("success" == res.status) {
                    $('#emailSentModal').modal('show');
                } else {
                    alert(res.message);
                }
            },
            error: function(response, textStatus){
               if (textStatus === 'timeout') {
                  alert('timeout!');
               }
            }
        });
    }

    return{
        createUser: createUser 
    }

}();

