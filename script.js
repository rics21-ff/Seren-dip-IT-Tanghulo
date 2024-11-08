// Global variables
var degree = 1800;
var $title = $('#title');
var clicks = 0;
var numberOfStars = 50;

$(document).ready(function() {
    $(".congrats").hide();
    for (var i = 0; i < numberOfStars; i++) {
        $('.congrats').append('<div class="blob fa fa-star ' + i + '"></div>');
    }	

    /*CURTAIN OPEN FUNCTION*/
    $('.open').click(function () {
        if ($('body').hasClass('open-curtains')) {
            $('body').removeClass('open-curtains');
            $('.open').hide();
        } else {
            $('body').addClass('open-curtains');
            $('.open').hide();
        }
    });

    /*WHEEL SPIN FUNCTION*/
    $('#spin').click(function(){
        // Disable multiple spins
        $(this).prop('disabled', true);
        
        // Add 1 every click
        clicks++;
        
        // Generate a more truly random degree
        var randomDegree = Math.floor(Math.random() * 360) + 1; // Random degree between 1-360
        var totalDegree = (clicks * 360 * 5) + randomDegree; // Multiply by 5 for more rotations
        
        // Rotate the wheel
        $('#inner-wheel').css({
            'transform': 'rotate(' + totalDegree + 'deg)',
            '-webkit-transform': 'rotate(' + totalDegree + 'deg)',
            '-moz-transform': 'rotate(' + totalDegree + 'deg)',
            'transition': 'transform 6s cubic-bezier(0.25, 0.1, 0.25, 1)',
            '-webkit-transition': '-webkit-transform 6s cubic-bezier(0.25, 0.1, 0.25, 1)',
            '-moz-transition': '-moz-transform 6s cubic-bezier(0.25, 0.1, 0.25, 1)'
        });
        
        // Reset after spin
        setTimeout(function() {
            $('#spin').prop('disabled', false);
            
            // Determine and show result
            determineResult(totalDegree);
            
            // Show congrats and trigger animations
            $(".congrats").show();
            animateText();
            animateBlobs();
        }, 6000); // Match the transition time
    });
});

// Function to determine wheel result
function determineResult(finalDegree) {
    // Normalize the degree to 0-360 range
    finalDegree = finalDegree % 360;
    
    // Define sector ranges (adjust these based on your wheel's exact layout)
    const sectors = [
        { range: [0, 60], result: "" },
        { range: [60, 120], result: "" },
        { range: [120, 180], result: "" },
        { range: [180, 240], result: "" },
        { range: [240, 300], result: "" },
        { range: [300, 360], result: "" }
    ];
    
    // Find the matching sector
    const result = sectors.find(sector => 
        finalDegree >= sector.range[0] && finalDegree < sector.range[1]
    );
    
    // Display the result
    $('#title').text(result ? result.result : "Spin Again!");
}

// Animation for text
function animateText() {
    TweenMax.to($title, 0.2, {
        scale: 1.5,
        opacity: 1,
        rotation: 0,
        ease: Back.easeOut.config(5),
    });
}
    
// Animation for blobs/stars
function animateBlobs() {
    var xSeed = _.random(350, 380);
    var ySeed = _.random(120, 170);
    
    $.each($('.blob'), function(i) {
        var $blob = $(this);
        var speed = _.random(1, 5);
        var rotation = _.random(5, 100);
        var scale = _.random(0.8, 1.5);
        var x = _.random(-xSeed, xSeed);
        var y = _.random(-ySeed, ySeed);

        TweenMax.to($blob, speed, {
            x: x,
            y: y,
            ease: Power1.easeOut,
            opacity: 0,
            rotation: rotation,
            scale: scale,
            onStartParams: [$blob],
            onStart: function($element) {
                $element.css('display', 'block');
            },
            onCompleteParams: [$blob],
            onComplete: function($element) {
                $element.css('display', 'none');
            }
        });
    });
}